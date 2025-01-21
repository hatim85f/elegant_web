import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../context/ThemeContext";
import MainHolderScreen from "./holderScreens/MainHolderScreen";
import Card from "../components/Card";
import moment from "moment";

import Loader from "../components/Loader";

import Colors from "../constants/Colors";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import HomeCard from "./holderScreens/HomeCard";
import numberWithComa from "../helpers/numberWithComa";
import Calendar from "../components/Calendar";

import * as authActions from "../store/auth/authActions";
import * as dashboardActions from "../store/dashboard/dashboardActions";

const HomeScreen = (props) => {
  const { theme } = useTheme();

  const { token, user } = useSelector((state) => state.auth);
  const { latestClient, activeClientsNumber, totalClientsNumber } = useSelector(
    (state) => state.dashboard
  );

  const quotationValue = numberWithComa(0);
  const quotationCurrency = "AED";
  const quotationDate = moment(new Date()).format("MM/DD/YYYY");
  const quotationComment = "";
  const quotationCreatedBy = "";
  const quotationStatus = "";

  const reminderList = [];

  const date = new Date();

  const changeNextDeliveryData = () => {};

  const changeItemDone = (index) => {};

  const dispatch = useDispatch();

  // ======================================================SETTING STATES======================================================

  const [isLoading, setIsLoading] = useState(false);

  // ======================================================GET USER BACK ======================================================

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);
      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token, dispatch]);

  // ======================================================GET DASHBOARD DATA======================================================

  useEffect(() => {
    setIsLoading(true);
    dispatch(dashboardActions.getDashboard()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (!token) {
    return <View />;
  }

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <MainHolderScreen navigation={props.navigation} pageTitle="Dashboard">
          <Loader
            loadingMessage="Loading Dashboard Data"
            loadingColor={theme.text}
          />
        </MainHolderScreen>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MainHolderScreen
        navigation={props.navigation}
        pageTitle="Dashboard"
        activeClientsNumber={activeClientsNumber}
        totalClientsNumber={totalClientsNumber}
      >
        <View style={styles.cardsContainer}>
          <View style={styles.cardRow}>
            <HomeCard
              header="Recently Added"
              subHeader={latestClient?.clientName}
              addedBy={latestClient?.clientCreatedBy}
              date={moment(latestClient?.clientCreatedAt).format("MM/DD/YYYY")}
              percentageBar={
                latestClient?.clientStatus === "inactive" ? 0.25 : 1
              }
              imageURL={require("../assets/images/card1.jpg")}
            />
            <HomeCard
              header="Next Delivery"
              // subHeader="Next delivery should be"
              subHeader="Feature Coming Soon"
              // date={nextDeliveryDate}
              // address={nextDeliveryAddress}
              onChnageDelivery={changeNextDeliveryData}
              imageURL={require("../assets/images/card2.png")}
              // showOnChange={true}
            />
          </View>
          <View style={styles.cardRow}>
            <HomeCard
              imageURL={require("../assets/images/card3.png")}
              header="Recent Quotation"
              quotation={true}
              quotationDetails={{
                quotationValue,
                quotationComment,
                quotationCreatedBy,
                quotationDate,
                quotationCurrency,
                quotationStatus,
              }}
            />
            <HomeCard
              header="Today's Reminder"
              reminderList={reminderList.slice(0, 4)}
              imageURL={require("../assets/images/card4.png")}
              todayDate={new Date()}
              changeItemDone={(index) => changeItemDone(index)}
            />
          </View>
        </View>
        <Calendar />
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  card: {
    width: "48%",
    height: 200,
    marginVertical: 10,
    flexDirection: "row",
    paddingHorizontal: globalWidth("0.5%"),
    alignItems: "center",
  },
  cardImage: {
    width: globalWidth("10%"),
    height: globalHeight("19%"),
    borderRadius: 10,
  },
  cardLeftContainer: {
    width: "35%",
    height: "100%",
    justifyContent: "center",
  },
  cardRightContainer: {
    width: "65%",
    height: "100%",
  },
  cardHeader: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
    fontWeight: "600",
  },
  cardText: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    fontWeight: "400",
  },
  date: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    fontWeight: "400",
    marginTop: globalHeight("2.5%"),
  },
  percent: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    marginBottom: globalHeight("1%"),
    textAlign: "center",
  },
  lowerContainer: {
    marginTop: globalHeight("2.5%"),
  },
});

export default HomeScreen;
