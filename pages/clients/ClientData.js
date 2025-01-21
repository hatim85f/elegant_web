import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as clientsActions from "../../store/clients/clientsActions";
import Loader from "../../components/Loader";
import FeedbackUpdates from "./FeedbackUpdates";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import {
  MaterialCommunityIcons,
  Octicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import numberWithComa from "../../helpers/numberWithComa";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
const ClientData = (props) => {
  const { globalColors } = useTheme();

  const { clientDetails } = useSelector((state) => state.clients);

  const { latestProjectDetails } = clientDetails;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.header, { color: globalColors.text }]}>
          Details
        </Text>
        <View
          style={[styles.cardContainer, { backgroundColor: globalColors.card }]}
        >
          <View style={[styles.smallRow, { width: "25%" }]}>
            <View>
              <Text style={styles.cardHeader}>Client For</Text>
              <Text style={styles.cardText}>{clientDetails?.handledBy}</Text>
            </View>
            <Avatar
              source={{ uri: clientDetails?.handledByAvatar }}
              rounded
              size="large"
            />
          </View>
          <View style={styles.itemsRow}>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Client Email</Text>
                <MaterialCommunityIcons
                  name="email-open-multiple"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>{clientDetails?.clientEmail}</Text>
            </View>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Client Type</Text>
                <MaterialCommunityIcons
                  name="account-details"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>{clientDetails?.clientType}</Text>
            </View>
          </View>
          <View style={styles.itemsRow}>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Client Phone</Text>
                <MaterialCommunityIcons
                  name="phone"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>{clientDetails?.clientPhone}</Text>
            </View>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Branch</Text>
                <Entypo
                  name="flow-branch"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>{clientDetails?.branchName}</Text>
            </View>
          </View>
          <View style={styles.itemsRow}>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Address</Text>
                <MaterialCommunityIcons
                  name="home-map-marker"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>
                {clientDetails?.clientAddress}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <View
                style={[styles.smallRow, { marginTop: globalHeight("2%") }]}
              >
                <Text style={styles.cardHeader}>Industry</Text>
                <MaterialCommunityIcons
                  name="briefcase"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>
                {clientDetails?.clientIndustry}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <View
                style={[
                  styles.smallRow,
                  { marginTop: globalHeight("2%"), width: "65%" },
                ]}
              >
                <Text style={styles.cardHeader}>Contact Method</Text>
                <MaterialCommunityIcons
                  name="message"
                  size={globalWidth("1.5%")}
                  color="black"
                />
              </View>
              <Text style={styles.cardText}>
                {clientDetails?.preferredContactMethod}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.header,
            { color: globalColors.text, marginTop: globalHeight("2%") },
          ]}
        >
          Latest Projects
        </Text>
        <View
          style={[styles.cardContainer, { backgroundColor: globalColors.card }]}
        >
          {latestProjectDetails && (
            <View style={styles.projectContainer}>
              <View style={styles.itemContainer}>
                <View style={[styles.smallRow, { width: "40%" }]}>
                  <Text style={styles.cardHeader}>Proejct Name</Text>
                  <Octicons
                    name="project"
                    size={globalWidth("1.5%")}
                    color="black"
                  />
                </View>
                <Text style={styles.cardText}>
                  {latestProjectDetails.projectName}
                </Text>
              </View>
              <View style={styles.listRow}>
                <View style={styles.itemContainer}>
                  <View style={[styles.smallRow, { width: "40%" }]}>
                    <Text style={styles.cardHeader}> Project Budget </Text>
                    <FontAwesome
                      name="money"
                      size={globalWidth("1.5%")}
                      color="black"
                    />
                  </View>
                  <Text style={styles.cardText}>
                    {" "}
                    {numberWithComa(latestProjectDetails.projectBudget)}{" "}
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <View style={[styles.smallRow, { width: "40%" }]}>
                    <Text style={styles.cardHeader}> Project Deadline </Text>
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={globalWidth("1.5%")}
                      color="black"
                    />
                  </View>
                  <Text style={styles.cardText}>
                    {" "}
                    {moment(latestProjectDetails.projectDeadline).format(
                      "MM/DD/YYYY"
                    )}{" "}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <Button
            title={latestProjectDetails ? "View Project" : "No Project"}
            titleStyle={styles.title}
            buttonStyle={[
              styles.button,
              { backgroundColor: globalColors.custom },
            ]}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
    padding: globalWidth("1.5%"),
    borderRadius: 8,
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.4%"),
  },
  cardContainer: {
    borderRadius: 5,
    padding: globalWidth("0.25%"),
    paddingVertical: globalWidth("0.5%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
  },
  cardHeader: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
  },
  cardText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
  itemContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "60%",
    paddingLeft: globalWidth("1%"),
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: globalHeight("3%"),
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  projectContainer: {
    borderWidth: 2.5,
    padding: globalWidth("1%"),
    borderRadius: 5,
  },
  button: {
    width: "30%",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: globalHeight("2%"),
  },
  title: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
});

export const ClientDataOptions = (navData) => {
  return {
    headerTitle: "ClientData",
  };
};

export default ClientData;
