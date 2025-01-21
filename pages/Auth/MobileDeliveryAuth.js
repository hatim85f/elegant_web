import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { isTablet } from "../../constants/device";
import { globalWidth } from "../../constants/globalWidth";
import { Pressable } from "react-native-gesture-handler";

const MobileDeliveryAuth = (props) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require("../../assets/icon.png")} style={styles.icon} />
      <Text style={[styles.header, { color: theme.text }]}>
        Welcome to our Perfect CRM system
      </Text>
      <Text style={[styles.subHeader, { color: theme.text }]}>
        For you to get the best experience
      </Text>
      <Text style={[styles.subHeader, { color: theme.text }]}>
        Kindly download our app
      </Text>
      <Pressable onPress={() => {}} style={styles.press}>
        <Image
          source={require("../../assets/images/google_play.png")}
          style={styles.image}
        />
      </Pressable>
      <Pressable onPress={() => {}} style={styles.press}>
        <Image
          source={require("../../assets/images/app_store.png")}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

const headerFontSize = isTablet() ? globalWidth("3.5%") : globalWidth("4%");
const subHeaderFontSize = isTablet()
  ? globalWidth("2.2%")
  : globalWidth("3.2%");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: isTablet() ? 300 : 150,
    height: isTablet() ? 300 : 150,
  },
  header: {
    fontSize: headerFontSize,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: subHeaderFontSize,
    textAlign: "center",
  },
  image: {
    width: isTablet() ? 200 : 100,
    height: isTablet() ? 50 : 25,
    marginVertical: 10,
  },
});

export const MobileDeliveryAuthOptions = (navData) => {
  return {
    headerTitle: "MobileDeliveryAuth",
  };
};

export default MobileDeliveryAuth;
