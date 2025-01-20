import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import Loader from "../../components/Loader";

import * as clientsActions from "../../store/clients/clientsActions";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import {
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Foundation,
} from "@expo/vector-icons";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const ActiveClients = (props) => {
  const { globalColors } = useTheme();

  const { activeClients } = useSelector((state) => state.clients);
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [clientsList, setClientsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(clientsActions.getClients()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const headerList = [
    "Client",
    "Email",
    "Phone",
    "Handled By",
    "Created By",
    "Created At",
    "Actions",
  ];

  useEffect(() => {
    const clientsList = activeClients.map((client) => {
      return {
        _id: client._id,
        clientName: client.clientName,
        clientEmail: client.clientEmail,
        clientPhone: client.clientPhone,
        clientHandledBy: client.handledBy,
        clientCreatedAt: client.clientCreatedAt,
        clientCreatedBy: client.clientCreatedBy,
        clientFeedback: client.clientFeedback,
        clientBranch: client.branchName,
      };
    });

    setClientsList(clientsList);
  }, [activeClients]);

  if (isLoading) {
    return (
      <Loader
        loadingMessage="Loading Clients Data"
        loadingColor={globalColors.text}
        containerColor={globalColors.background}
      />
    );
  }

  if (activeClients.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={[styles.header, { color: globalColors.text }]}>
          No Active Clients Found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.mainRow}>
          {headerList.map((item, index) => {
            return (
              <View
                style={[
                  styles.headerContainer,
                  {
                    width:
                      index === 1
                        ? globalWidth("15%")
                        : index === 6
                        ? globalWidth("6%")
                        : globalWidth("10%"),
                  },
                ]}
                key={index}
              >
                <Text style={[styles.header, { color: globalColors.text }]}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>

        {clientsList.map((item, index) => {
          const hasUnseenFeedback =
            item.clientFeedback &&
            item.clientFeedback.some(
              (feedback) =>
                feedback.feedbackSeen === false &&
                feedback.feedbackUserId !== user._id
            );
          return (
            <View
              style={[styles.mainRow, { borderBottomColor: "#000" }]}
              key={index}
            >
              <View
                style={[styles.headerContainer, { alignItems: "flex-start" }]}
              >
                <Text
                  style={[
                    styles.header,
                    {
                      color: globalColors.text,
                      fontWeight: "normal",
                    },
                  ]}
                >
                  {item.clientName}
                </Text>
              </View>
              <View
                style={[styles.headerContainer, { width: globalWidth("15%") }]}
              >
                <Text
                  style={[
                    styles.header,
                    { color: globalColors.text, fontWeight: "normal" },
                  ]}
                >
                  {item.clientEmail}
                </Text>
              </View>
              <View style={styles.headerContainer}>
                <Text
                  style={[
                    styles.header,
                    { color: globalColors.text, fontWeight: "normal" },
                  ]}
                >
                  {item.clientPhone}
                </Text>
              </View>
              <View style={styles.headerContainer}>
                <Text
                  style={[
                    styles.header,
                    { color: globalColors.text, fontWeight: "normal" },
                  ]}
                >
                  {item.clientHandledBy}
                </Text>
              </View>
              <View style={styles.headerContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  {item.clientCreatedBy}
                </Text>
              </View>
              <View style={styles.headerContainer}>
                <Text
                  style={[
                    styles.header,
                    { color: globalColors.text, fontWeight: "normal" },
                  ]}
                >
                  {moment(item.clientCreatedAt).format("MM/DD/YYYY")}
                </Text>
              </View>

              <View
                style={[
                  styles.headerContainer,
                  styles.smallRow,
                  {
                    width: globalWidth("7%"),
                    paddingRight: globalWidth("0.5%"),
                  },
                ]}
              >
                {hasUnseenFeedback && (
                  <MaterialCommunityIcons
                    name="chat-alert"
                    size={globalWidth("1.5%")}
                    color={globalColors.text}
                  />
                )}
                <Pressable onPress={() => {}}>
                  <MaterialCommunityIcons
                    name="delete-alert"
                    size={globalWidth("1.5%")}
                    color={globalColors.text}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    props.navigation.navigate("add_new_client", {
                      clientId: item._id,
                    })
                  }
                >
                  <FontAwesome5
                    name="user-edit"
                    size={globalWidth("1.5%")}
                    color={globalColors.text}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    props.navigation.navigate("client_details", {
                      clientId: item._id,
                    })
                  }
                >
                  <Foundation
                    name="info"
                    size={globalWidth("1.5%")}
                    color={globalColors.text}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerContainer: {
    width: globalWidth("9%"),
    justifyContent: "center",
    alignItems: "center",
    height: globalHeight("6%"),
  },
  header: {
    fontSize: globalWidth("0.9%"),
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: globalWidth("6%"),
    alignItems: "center",
  },
});

export const ActiveClientsOptions = (navData) => {
  return {
    headerTitle: "ActiveClients",
  };
};

export default ActiveClients;
