import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import NotificationsList from "./NotificationsList";
import { ScrollView } from "react-native-gesture-handler";
import NotificationData from "./NotificationData";

import * as notificationsActions from "../../store/notifications/notificationActions";

const NotificationsScreen = (props) => {
  const { globalColors } = useTheme();

  const { notifications, notificationsNumber, unredNotifications } =
    useSelector((state) => state.notifications);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const dispatch = useDispatch();

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen pageTitle="Notifications" navigation={props.navigation}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainRow}>
            <View style={styles.leftContainer}>
              <Text style={[styles.header, { color: globalColors.text }]}>
                Notifications Center
              </Text>

              <NotificationsList
                notifications={notifications}
                getSelectedNotification={setSelectedNotification}
              />
            </View>
            <View style={styles.rightContainer}>
              {selectedNotification && (
                <NotificationData notification={selectedNotification} />
              )}
            </View>
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
  mainRow: {
    flexDirection: "row",
  },
  leftContainer: {
    width: "70%",
    padding: globalHeight("2%"),
  },
  rightContainer: {
    width: "28%",
    paddingTop: globalHeight("8.5%"),
  },
  header: {
    fontSize: globalWidth("2.5%"),
    fontFamily: "poppins",
    fontWeight: "bold",
  },
});

export const NotificationsScreenOptions = (navData) => {
  return {
    headerTitle: "NotificationsScreen",
  };
};

export default NotificationsScreen;
