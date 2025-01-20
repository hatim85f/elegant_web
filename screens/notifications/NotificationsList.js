import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import moment from "moment";

import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import * as notificationsActions from "../../store/notifications/notificationActions";

const NotificationsList = (props) => {
  const { globalColors } = useTheme();

  const { notifications, getSelectedNotification } = props;

  const dispatch = useDispatch();

  const editNotification = (notification) => {
    dispatch(notificationsActions.editNotification(notification._id));

    getSelectedNotification(notification);
  };

  const markAllAsRead = () => {
    notifications.map((a) => {
      dispatch(notificationsActions.editNotification(a._id));
    });
  };

  return (
    <View style={[styles.container]}>
      <Button
        title="Mark All as Read"
        onPress={markAllAsRead}
        buttonStyle={{
          backgroundColor: globalColors.button,
          borderRadius: 10,
          marginVertical: globalHeight("1%"),
        }}
        titleStyle={{
          fontSize: globalWidth("1.2%"),
          fontFamily: "poppins",
        }}
      />
      {notifications.map((item, index) => {
        return (
          <Pressable
            onPress={() => editNotification(item)}
            style={[
              styles.itemContainer,
              {
                backgroundColor:
                  item.status === "unread" && globalColors.primary === "#121212"
                    ? "#888"
                    : item.status === "unread" &&
                      globalColors.primary === "#FFFFFF"
                    ? "#888"
                    : globalColors.card,
              },
            ]}
            key={index}
          >
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                size={globalWidth("5%")}
                source={{ uri: item.fromAvatar }}
              />
            </View>
            <View style={styles.itemData}>
              <Text style={styles.title}> {item.title} </Text>
              <Text style={styles.subject}> {item.subject} </Text>
              <Text style={styles.date}>Type : {item.type} </Text>
              <Text style={styles.date}>From : {item.from} </Text>
            </View>
            <View style={styles.lastItemData}>
              <Entypo
                name="bell"
                size={globalWidth("1.7%")}
                color={item.status === "unread" ? "black" : Colors.button}
              />
              <Text style={styles.subject}> {item.body} </Text>
              <Text style={styles.date}>
                {moment(item.date).format("MM/DD/YYYY hh:mm A")}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  itemContainer: {
    padding: globalWidth("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderRadius: 10,
    marginVertical: globalHeight("0.25%"),
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
  },
  itemData: {
    width: "35%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  lastItemData: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  subject: {
    fontSize: globalWidth("1%"),
    fontFamily: "poppins",
  },
  date: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    fontStyle: "italic",
  },
  header: {},
});

export const NotificationsListOptions = (navData) => {
  return {
    headerTitle: "NotificationsList",
  };
};

export default NotificationsList;
