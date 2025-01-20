import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { Entypo } from "@expo/vector-icons";
import moment from "moment";

const NotificationData = (props) => {
  const { globalColors } = useTheme();

  const { notification } = props;

  return (
    <View style={[styles.container, { backgroundColor: globalColors.card }]}>
      <Entypo
        name="bell"
        size={globalWidth("1.7%")}
        color="black"
        style={{ alignSelf: "flex-end" }}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar
          rounded
          size={globalWidth("7.5%")}
          source={{ uri: notification.fromAvatar }}
        />
      </View>
      <Text style={styles.header}> {notification.title} </Text>
      <Text style={styles.subject}> {notification.subject} </Text>
      <View style={styles.bodyContainer}>
        <Text style={styles.subject}> {notification.body} </Text>
      </View>
      <Text style={styles.date}>
        {" "}
        {moment(notification.date).format("DD/MM/YY hh:mm A")}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: globalHeight("2%"),
    borderRadius: globalHeight("1%"),
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.8%"),
    textAlign: "center",
    marginTop: globalHeight("2%"),
  },
  subject: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    marginTop: globalHeight("1%"),
  },
  bodyContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: globalHeight("2%"),
  },
  date: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    marginTop: globalHeight("2.5%"),
    textAlign: "right",
    fontStyle: "italic",
  },
});

export const NotificationDataOptions = (navData) => {
  return {
    headerTitle: "NotificationData",
  };
};

export default NotificationData;
