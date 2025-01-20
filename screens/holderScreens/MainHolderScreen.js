import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import { globalHeight } from "../../constants/globalWidth";
import LeftContainerContent from "./LeftContainerContent";
import MiddleContainer from "./MiddleContainer";
import RightContainer from "./RightContainer";
import { useRoute } from "@react-navigation/native";

import * as authActions from "../../store/auth/authActions";

const MainHolderScreen = (props) => {
  const { theme } = useTheme();

  const { pageTitle, activeClientsNumber, totalClientsNumber } = props;

  const { user, token } = useSelector((state) => state.auth);

  const routeName = useRoute().name;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={[styles.leftCotnainer, { backgroundColor: theme.card }]}>
        <LeftContainerContent navigation={props.navigation} user={user} />
      </View>
      <View
        style={[
          styles.middleContainer,
          { backgroundColor: theme.card, flex: routeName !== "home" ? 9 : 7 },
        ]}
      >
        <View
          style={{
            height: globalHeight("10%"),
          }}
        >
          <MiddleContainer
            navigation={props.navigation}
            user={user}
            pageTitle={pageTitle}
          />
        </View>
        <View style={{ height: globalHeight("90%"), zIndex: -100 }}>
          {props.children}
        </View>
      </View>
      {routeName === "home" && (
        <View
          style={[
            styles.rightContainer,
            { backgroundColor: theme.card, flex: 2 },
          ]}
        >
          <RightContainer
            user={user}
            navigation={props.navigation}
            activeClientsNumber={activeClientsNumber}
            totalClientsNumber={totalClientsNumber}
            activeClientsPercentage={activeClientsNumber / totalClientsNumber}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftCotnainer: {
    backgroundColor: Colors.text,
    flex: 1.3,
    height: globalHeight("100%"),
    borderColor: Colors.button,
    borderWidth: 1.5,
  },
  middleContainer: {
    backgroundColor: Colors.text,
    height: globalHeight("10%"),
    borderColor: Colors.button,
    borderWidth: 1.5,
  },
  rightContainer: {
    backgroundColor: Colors.text,
    borderColor: Colors.button,
    borderWidth: 1.5,
  },
});

export const MainHolderScreenOptions = (navData) => {
  return {
    headerTitle: "MainHolderScreen",
  };
};

export default MainHolderScreen;
