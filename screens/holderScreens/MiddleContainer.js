import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";

import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

import * as authActions from "../../store/auth/authActions";
import * as notificationsActions from "../../store/notifications/notificationActions";

import { AntDesign } from "@expo/vector-icons";
import AddingClients from "./AddingClients";

const MiddleContainer = (props) => {
  const { theme } = useTheme();

  const { pageTitle } = props;

  const { user, token } = useSelector((state) => state.auth);
  const { notifications, notificationsNumber, unredNotifications } =
    useSelector((state) => state.notifications);

  const performSearch = (text) => {
    console.log(text);
  };

  const closeAddClinet = () => {
    Animated.timing(clientCardHeight, {
      toValue: -globalHeight("250%"),
      duration: 800,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  };

  const openAddClient = () => {
    Animated.timing(clientCardHeight, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  };

  const clientCardHeight = useRef(
    new Animated.Value(-globalHeight("250%"))
  ).current;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(notificationsActions.getNotifications());
  }, [dispatch]);

  if (!token) {
    return <View />;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={[styles.container]}>
        <View>
          <Text style={styles.header}>{pageTitle}</Text>
        </View>
        <Input
          placeholder="Search Clients"
          onChangeText={performSearch}
          rightIcon={{
            type: "font-awesome",
            name: "search",
            color: Colors.blue,
          }}
          inputContainerStyle={[
            styles.inputContainer,
            {
              backgroundColor: theme.background,
            },
          ]}
          inputStyle={[styles.input, { color: Colors.blue }]}
        />
      </View>
      <View style={styles.smallRow}>
        <Pressable
          onPress={() => props.navigation.navigate("notifications")}
          style={styles.pressBtn}
        >
          <Ionicons
            name="notifications"
            size={globalWidth("1.2")}
            color="black"
          />
          <View style={styles.badge}>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              {unredNotifications}
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}} style={styles.pressBtn}>
          <FontAwesome name="dollar" size={globalWidth("1.2")} color="black" />
        </Pressable>
        {user.role !== "employee" && (
          <Pressable onPress={openAddClient} style={styles.pressBtn}>
            <MaterialIcons
              name="people-alt"
              size={globalWidth("1.2")}
              color="black"
            />
          </Pressable>
        )}
      </View>
      <Animated.View
        style={[
          styles.addClientContainer,
          {
            transform: [{ translateY: clientCardHeight }],
            backgroundColor: theme.primary,
          },
        ]}
      >
        <AddingClients toggleAddClient={closeAddClinet} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
  },
  header: {
    fontSize: globalWidth("2.2%"),
    fontFamily: "poppins",
    fontWeight: "600",
    marginLeft: globalWidth("1%"),
  },
  inputContainer: {
    width: "70%",
    marginLeft: globalWidth("2.5%"),
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: globalWidth("0.5%"),
    marginTop: globalWidth("1%"),
  },
  input: {
    color: "black",
    fontFamily: "poppins",
    width: "55%",
  },
  smallRow: {
    width: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addClientContainer: {
    backgroundColor: "red",
    width: globalWidth("45%"),
    height: globalWidth("35%"),
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1000,
    right: globalWidth("14%"),
    top: globalWidth("12%"),
    borderWidth: 2.5,
    borderColor: Colors.button,
    padding: globalWidth("1%"),
  },
  badge: {
    position: "absolute",
    top: -5, // Adjust to position badge
    right: -5, // Adjust to position badge
    backgroundColor: Colors.button,
    borderRadius: globalWidth("0.6%"),
    width: globalWidth("1.2%"), // Badge size
    height: globalWidth("1.2%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiddleContainer;
