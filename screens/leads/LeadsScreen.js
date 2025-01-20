import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import * as organizationActions from "../../store/organizations/organizationsActions";
import * as authActions from "../../store/auth/authActions";

import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";

import { Pressable, ScrollView } from "react-native-gesture-handler";

import AddNewLead from "./AddNewLead";
import ViewLeads from "./ViewLeads";

const LeadsScreen = (props) => {
  const { globalColors } = useTheme();

  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //   =============================================GETTING USER BACK=============================================

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  //   ================================================SETTING STATES======================================================

  const [isLoading, setIsLoading] = useState(false);
  const [displayType, setDisplayType] = useState("view");

  //   ==================================================RENDERING===============================================================

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen pageTitle="Leads" navigation={props.navigation}>
        {isLoading ? (
          <Loader
            loadingMessage="Loading Leads Information"
            loadingColor={globalColors.text}
          />
        ) : (
          <ScrollView
            scrollEnabled
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.buttonsRow,
                {
                  backgroundColor: globalColors.extraCard,
                },
              ]}
            >
              <Pressable onPress={() => setDisplayType("add")}>
                <Text
                  style={[
                    styles.header,
                    {
                      color:
                        displayType === "add"
                          ? Colors.button
                          : globalColors.text,
                    },
                  ]}
                >
                  {" "}
                  + Add New
                </Text>
              </Pressable>
              <Pressable onPress={() => setDisplayType("view")}>
                <Text
                  style={[
                    styles.header,
                    {
                      color:
                        displayType === "view"
                          ? Colors.button
                          : globalColors.text,
                    },
                  ]}
                >
                  {" "}
                  View Leads
                </Text>
              </Pressable>
            </View>
            {displayType === "add" ? (
              <AddNewLead
                navigation={props.navigation}
                changeView={() => setDisplayType("view")}
              />
            ) : (
              <ViewLeads navigation={props.navigation} />
            )}
          </ScrollView>
        )}
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: globalHeight("6%"),
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    marginHorizontal: globalWidth("2%"),
    paddingVertical: globalHeight("1%"),
  },
  button: {
    width: globalWidth("15%"),
    marginLeft: globalWidth("2%"),
    borderRadius: 5,
    borderColor: "#fff",
  },
  buttonTitle: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
});

export default LeadsScreen;
