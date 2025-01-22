import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as authActions from "../../store/auth/authActions";
import * as organizationActions from "../../store/organizations/organizationsActions";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import Loader from "../../components/Loader";

import { FontAwesome, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const OrganizationScreen = (props) => {
  const { globalColors } = useTheme();

  const { token, user } = useSelector((state) => state.auth);
  const { userOrganization } = useSelector((state) => state.organizations);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(organizationActions.getUserOrganization()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: globalColors.background,
          flex: 1,
        }}
      >
        <MainHolderScreen
          pageTitle="Organization"
          navigation={props.navigation}
        >
          <Loader
            loadingMessage="Loading..."
            loadingColor={globalColors.text}
          />
        </MainHolderScreen>
      </View>
    );
  }

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber?.replace(
      /(\+?\d{3})(\d{3})(\d{3})(\d{3})/,
      "$1 $2 $3 $4"
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen pageTitle="Organization" navigation={props.navigation}>
        <View
          style={[
            styles.upperContainer,
            {
              backgroundColor: globalColors.extraCard,
            },
          ]}
        >
          <Button
            title="Edit Details"
            onPress={() => props.navigation.navigate("edit_organization")}
            buttonStyle={styles.button}
            titleStyle={styles.title}
          />
        </View>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.subHeader, { color: globalColors.text }]}>
            Please make sure that all data are correct and up to date, Except
            Branch Manager all data will be shown to your clients
          </Text>
          <View style={styles.headerTitle}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: userOrganization?.logo,
              }}
            />
            <Text style={[styles.header, { color: globalColors.text }]}>
              {userOrganization?.name}
            </Text>
          </View>
          <View
            style={[
              styles.dataContainer,
              { borderBottomColor: globalColors.text },
            ]}
          >
            <FontAwesome
              name="industry"
              size={globalWidth("1.2%")}
              color={globalColors.text}
            />
            <Text style={[styles.dataText, { color: globalColors.text }]}>
              {userOrganization?.industry}
            </Text>
          </View>
          <View
            style={[
              styles.dataContainer,
              { borderBottomColor: globalColors.text },
            ]}
          >
            <Entypo
              name="globe"
              size={globalWidth("1.2%")}
              color={globalColors.text}
            />
            <Text style={[styles.dataText, { color: globalColors.text }]}>
              {" "}
              {userOrganization?.website}{" "}
            </Text>
          </View>
          <View
            style={[
              styles.dataContainer,
              { borderBottomColor: globalColors.text },
            ]}
          >
            <Entypo
              name="location-pin"
              size={globalWidth("1.2%")}
              color={globalColors.text}
            />
            <Text style={[styles.dataText, { color: globalColors.text }]}>
              {userOrganization?.address}
            </Text>
          </View>
          <View
            style={[
              styles.dataContainer,
              { borderBottomColor: globalColors.text },
            ]}
          >
            <Entypo
              name="flow-branch"
              size={globalWidth("1.2%")}
              color={globalColors.text}
            />
            <Text style={[styles.dataText, { color: globalColors.text }]}>
              Branches
            </Text>
          </View>
          <View style={styles.rowContainer}>
            {userOrganization?.branches?.map((branch, index) => {
              return (
                <View
                  style={[
                    styles.branchContainer,
                    {
                      backgroundColor: globalColors.card,
                      borderColor: globalColors.custom,
                    },
                  ]}
                >
                  <Text style={[styles.branchText, { fontWeight: "bold" }]}>
                    {index + 1}) {branch.branchName}
                  </Text>
                  <Text style={styles.branchData}>
                    <Text style={{ fontWeight: "bold" }}>Address :</Text>
                    {branch.branchLocation}
                  </Text>
                  {user.role === "owner" && branch.branchManager && (
                    <Text style={styles.branchData}>
                      <Text style={{ fontWeight: "bold" }}>
                        Branch Manager :
                      </Text>
                      {branch.branchManager}
                    </Text>
                  )}
                  <Text style={styles.branchData}>
                    <Text style={{ fontWeight: "bold" }}>Contact :</Text>
                    {formatPhoneNumber(branch.branchContact)}
                  </Text>
                  <Text style={styles.branchData}>
                    <Text style={{ fontWeight: "bold" }}>Email :</Text>
                    {branch.branchEmail}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    width: "100%",
    height: globalHeight("7%"),
    padding: 10,
  },
  button: {
    width: "18%",
    backgroundColor: Colors.button,
    alignSelf: "flex-end",
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
    width: globalWidth("20%"),
    paddingLeft: 10,
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.7%"),
  },
  dataContainer: {
    flexDirection: "row",
    paddingHorizontal: globalWidth("1.5%"),
    borderBottomWidth: 1.5,
    paddingBottom: globalHeight("1.2%"),
    width: globalWidth("20%"),
    marginLeft: globalWidth("1.2%"),
    marginTop: globalHeight("1.2%"),
  },
  dataText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.1%"),
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: globalHeight("2.5%"),
  },
  branchContainer: {
    width: globalWidth("25%"),
    marginHorizontal: globalWidth("1.2%"),
    borderRadius: 8,
    padding: 10,
    borderWidth: 1.5,
    marginTop: globalHeight("1.2%"),
  },
  branchText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.1%"),
  },
  branchData: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    marginTop: globalHeight("1.2%"),
  },
  subHeader: {
    textAlign: "center",
    fontFamily: "poppins",
    fontSize: globalWidth("1.1%"),
    width: globalWidth("40%"),
    alignSelf: "center",
    marginTop: globalHeight("1.2%"),
  },
});

export default OrganizationScreen;
