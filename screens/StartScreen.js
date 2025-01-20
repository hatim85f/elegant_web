import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Button, Image, SocialIcon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../context/ThemeContext";

import { globalHeight, globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { isPhone, isTablet, isWeb } from "../constants/device";

import * as authActions from "../store/auth/authActions";

const StartScreen = (props) => {
  const { theme } = useTheme();

  const { token } = useSelector((state) => state.auth);

  const iconSize = isWeb()
    ? globalWidth("2.2%")
    : isPhone()
    ? globalWidth("8%")
    : globalWidth("4%");

  const dispatch = useDispatch();

  const getUserData = async () => {
    const userDetails = localStorage.getItem("userDetails");

    const userData = JSON.parse(userDetails);

    if (userData.user) {
      dispatch(authActions.getUserIn(userData.user, userData.token));

      props.navigation.navigate("home");
    }
  };

  useEffect(() => {
    getUserData();
  }, [token, dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.mainRow}>
        {isWeb() && (
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/welcome_page.png")}
              style={styles.image}
            />
          </View>
        )}
        <View style={[styles.imageContainer, { justifyContent: "center" }]}>
          <Image
            source={require("../assets/images/image1.png")}
            style={styles.logoImage}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.header, { color: theme.text }]}>
              Effortless CRM for seamless management
            </Text>
            <p style={styles.subHeader}>
              Eleganty Flow is a modern CRM system designed to streamline your
              business operations. From managing client relationships to
              tracking sales and enhancing team collaboration, our system offers
              the perfect blend of simplicity and power.
            </p>

            <p style={styles.subHeader}>
              Experience a solution that adapts to your needs, delivering
              efficiency and elegance in every interaction.
            </p>
          </View>
          <View style={styles.buttonsRow}>
            <Pressable onPress={() => {}}>
              <Image
                source={require("../assets/images/google_play.png")}
                style={styles.logoApp}
              />
            </Pressable>
            <Pressable onPress={() => {}}>
              <Image
                source={require("../assets/images/app_store.png")}
                style={styles.logoApp}
              />
            </Pressable>
          </View>
          <Button
            buttonStyle={styles.btn}
            titleStyle={styles.title}
            title="Get Started"
            onPress={() => {
              isWeb()
                ? props.navigation.navigate("login")
                : props.navigation.navigate("redirect");
            }}
          />
          <Pressable
            onPress={() => Linking.openURL("https://www.codexpandit.com")}
            style={styles.poweredBtn}
          >
            {theme.primary === "#121212" ? (
              <Image
                source={require("../assets/images/powered_dark.png")}
                style={styles.powered}
              />
            ) : (
              <Image
                source={require("../assets/images/powered_light.png")}
                style={styles.powered}
              />
            )}
          </Pressable>
          <View style={styles.socialRow}>
            <Pressable onPress={() => {}}>
              <FontAwesome5
                name="facebook"
                size={iconSize}
                color={theme.primary === "#121212" ? "#fff" : "#000"}
              />
            </Pressable>
            <Pressable onPress={() => {}}>
              <FontAwesome6
                name="x-twitter"
                size={iconSize}
                color={theme.primary === "#121212" ? "#fff" : "#000"}
              />
            </Pressable>
            <Pressable onPress={() => {}}>
              <FontAwesome5
                name="instagram"
                size={iconSize}
                color={theme.primary === "#121212" ? "#fff" : "#000"}
              />
            </Pressable>
            <Pressable onPress={() => {}}>
              <FontAwesome5
                name="linkedin"
                size={iconSize}
                color={theme.primary === "#121212" ? "#fff" : "#000"}
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
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  mainRow: {
    flexDirection: isWeb() ? "row" : "column",
    justifyContent: "center",
    paddingTop: isWeb() ? 0 : globalHeight("15%"),
  },
  image: {
    width: globalWidth("35%"),
    height: globalHeight("100%"),
  },
  logoImage: {
    width: isWeb() ? globalWidth("20%") : globalWidth("60%"),
    height: isPhone()
      ? globalHeight("15%")
      : isTablet()
      ? globalHeight("25%")
      : globalHeight("25%"),
  },
  textContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  header: {
    fontFamily: "poppins",
    fontWeight: "600",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("5%"),
    marginTop: globalHeight("2%"),
    textAlign: "center",
  },
  subHeader: {
    color: Colors.text,
    fontFamily: "poppins",
    fontSize: isWeb()
      ? globalWidth("0.8%")
      : isPhone()
      ? globalWidth("4%")
      : globalWidth("2.5%"),
  },
  logoApp: {
    width: isWeb()
      ? globalWidth("8.5%")
      : isTablet()
      ? globalWidth("20%")
      : globalWidth("35%"),
    height: isWeb()
      ? globalHeight("5%")
      : isTablet()
      ? globalHeight("4.5%")
      : globalHeight("5%"),
    borderRadius: 10,
  },
  buttonsRow: {
    width: "45%",
    height: globalHeight("12%"),
    flexDirection: isPhone() ? "column" : "row",
    justifyContent: "space-between",
    marginTop: globalHeight("3%"),
    alignItems: "center",
  },
  btn: {
    marginTop: globalHeight("5%"),
    width: isWeb()
      ? globalWidth("15%")
      : isTablet()
      ? globalWidth("45%")
      : globalWidth("50%"),
    borderRadius: 8,
    backgroundColor: Colors.button,
    height: isPhone()
      ? globalHeight("4%")
      : isTablet()
      ? globalHeight("7%")
      : globalHeight("4%"),
  },
  title: {
    fontFamily: "poppins",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2.4%")
      : globalWidth("5%"),
  },
  poweredBtn: {
    marginTop: globalHeight("3%"),
    width: isWeb()
      ? globalWidth("20%")
      : isTablet()
      ? globalWidth("80%")
      : globalWidth("60%"),
    justifyContent: "center",
    alignItems: "center",
  },
  powered: {
    width: isWeb()
      ? globalWidth("16%")
      : isTablet()
      ? globalWidth("40%")
      : globalWidth("50%"),
    height: globalHeight("8%"),
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: isWeb() ? "30%" : isTablet() ? "25%" : "60%",
    marginTop: globalHeight("3.5%"),
  },
});

export const StartScreenOptions = (navData) => {
  return {
    headerTitle: "StartScreen",
  };
};

export default StartScreen;
