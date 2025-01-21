import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as Progress from "react-native-progress";
import * as dashboardActions from "../../store/dashboard/dashboardActions";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";

const RightContainer = (props) => {
  const { activeClientsNumber, totalClientsNumber, activeClientsPercentage } =
    props;

  const totalClients = totalClientsNumber;
  const totalFollowUps = 30;
  const totalAppointments = 50;

  const totalSales = 8000;
  const totalTarget = 10000;

  const activeClients = 65;

  const salesPerPerson = 0.34;

  const lastMessageTitle = "New Client Request Received";
  const lastMessageSubtitle = "Please check the client details and respond";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardActions.getDashboard());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Activities</Text>
      <View style={styles.outerCard}>
        <View style={styles.innerCard}>
          <Image
            source={require("../../assets/images/right_column.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.dataContainer}>
          <ul>
            <li>Total Clients: {totalClients}</li>
            <li>Active Clients: {activeClientsNumber}</li>
          </ul>
        </View>
        <Text style={styles.text}>
          {" "}
          Total Active Clients : {(activeClientsNumber / totalClients) * 100}%
        </Text>
        <Progress.Bar
          progress={activeClientsNumber / totalClients}
          width={globalWidth("16%")}
          color={Colors.button}
          unfilledColor={Colors.blue}
          style={{ alignSelf: "center" }}
        />
      </View>
      <View style={styles.middleCard}>
        <Text style={styles.header}>Sales Performance</Text>
        <View style={styles.itemCard}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="line-chart"
              size={globalWidth("1.2%")}
              color="black"
            />
          </View>
          <View style={styles.itemsData}>
            <Text style={styles.itemHeader}>Monnthly Sales</Text>
            <Text style={styles.itemText}>Quarter Sales Report </Text>
          </View>
        </View>
        <View style={styles.itemCard}>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="bar-chart"
              size={globalWidth("1.2%")}
              color="black"
            />
          </View>
          <View style={styles.itemsData}>
            <Text style={styles.itemHeader}>Active Clients</Text>
            <Text style={styles.itemText}>Quarter Report </Text>
          </View>
        </View>
        <View style={styles.itemCard}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="piechart"
              size={globalWidth("1.2%")}
              color="black"
            />
          </View>
          <View style={styles.itemsData}>
            <Text style={styles.itemHeader}>Sales Per Person</Text>
            <Text style={styles.itemText}>Monthly Report </Text>
          </View>
        </View>
      </View>
      <View style={styles.middleCard}>
        <Text style={styles.header}>Inbox</Text>
        <View style={styles.inboxContainer}>
          <View style={styles.leftInbox}>
            <Text style={styles.inboxHeader}>{lastMessageTitle} </Text>
            <Text style={styles.inboxText}>{lastMessageSubtitle} </Text>
          </View>
          <View style={styles.rightInbox}>
            <Pressable style={styles.arrowBtn} onPress={() => {}}>
              <AntDesign
                name="arrowright"
                size={globalWidth("1.2%")}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: globalHeight("01%"),
    paddingHorizontal: globalHeight("2%"),
    justifyContent: "space-between",
    height: globalHeight("98.5%"),
  },
  header: {
    fontSize: globalWidth("1%"),
    fontWeight: "600",
    fontFamily: "poppins",
  },
  outerCard: {
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: Colors.button,
    marginTop: -globalHeight("2.5%"),
    paddingTop: globalHeight("1%"),
    height: globalHeight("38%"),
  },
  innerCard: {
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: Colors.button,
    height: globalHeight("20%"),
    width: "92%",
    alignSelf: "center",
    overflow: "hidden",
  },
  image: {
    height: globalHeight("25%"),
    width: globalWidth("18%"),
    borderRadius: 4,
  },
  text: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.7%"),
    textAlign: "left",
    // marginTop: globalHeight("1%"),
    marginLeft: globalWidth("1%"),
  },
  dataContainer: {
    justifyContent: "center",
    fontFamily: "poppins",
  },
  middleCard: {
    marginTop: globalHeight("2%"),
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-bwtween",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: Colors.button,
    borderRadius: 12,
    marginTop: globalHeight("1%"),
    paddingVertical: globalHeight("1%"),
  },
  iconContainer: {
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: globalWidth("1%"),
    height: "100%",
    width: "15%",
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
  },
  itemHeader: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.85%"),
    fontWeight: "600",
  },
  itemText: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.8%"),
  },
  inboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2.5,
    borderColor: Colors.button,
    borderRadius: 12,
    marginTop: globalHeight("0.25%"),
    padding: globalHeight("1%"),
  },
  leftInbox: {
    width: "75%",
  },
  rightInbox: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  inboxHeader: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.85%"),
    fontWeight: "600",
    textAlign: "left",
    marginVertical: globalHeight("0.5%"),
  },
  inboxText: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.8%"),
    marginVertical: globalHeight("0.25%"),
  },
  arrowBtn: {
    backgroundColor: Colors.blue,
    padding: globalHeight("1%"),
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
  },
  itemsData: {
    width: "60%",
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export const RightContainerOptions = (navData) => {
  return {
    headerTitle: "RightContainer",
  };
};

export default RightContainer;
