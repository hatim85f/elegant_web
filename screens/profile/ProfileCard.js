import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Button, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import {
  FontAwesome5,
  FontAwesome6,
  Octicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const ProfileCard = (props) => {
  const { userAvatar, firstName, lastName, role, title, lines, giveMargin } =
    props;

  const { theme } = useTheme();

  return (
    <View style={{ marginTop: giveMargin ? globalHeight("2%") : 0 }}>
      <Text style={[styles.titleHeader, { color: theme.text }]}> {title} </Text>
      <View
        style={[
          styles.card,
          {
            backgroundColor: title === "Social Links" ? "#000" : theme.card,
          },
        ]}
      >
        {userAvatar && (
          <View style={styles.nameRow}>
            <Image source={userAvatar} size={80} style={styles.avatar} />

            <View style={styles.nameCol}>
              <Text style={styles.name}>
                {firstName} {lastName}{" "}
              </Text>
              <Text style={styles.role}>{role}</Text>
            </View>
          </View>
        )}
        <View
          style={{
            marginTop: userAvatar ? globalHeight("2.5%") : globalHeight("1%"),
            width: "100%",
          }}
        >
          {title !== "Social Links" &&
            lines &&
            lines.length > 0 &&
            lines.map((item, index) => {
              return (
                <View style={styles.dataContainer} key={index}>
                  {item.details && (
                    <>
                      <Text style={styles.titleText}> {item.title} </Text>
                      <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}> {item.details} </Text>
                      </View>
                    </>
                  )}
                </View>
              );
            })}
        </View>
        {title === "Social Links" && (
          <View style={styles.socialRow}>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  lines.filter((item) => item.title === "Facebook")[0].details
                )
              }
            >
              <FontAwesome6
                name="facebook"
                size={globalWidth("2.5%")}
                color={Colors.button}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  lines.filter((item) => item.title === "Instagram")[0].details
                )
              }
            >
              <FontAwesome6
                name="instagram"
                size={globalWidth("2.5%")}
                color={Colors.button}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  lines.filter((item) => item.title === "LinkedIn")[0].details
                )
              }
            >
              <FontAwesome6
                name="linkedin"
                size={globalWidth("2.5%")}
                color={Colors.button}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  lines.filter((item) => item.title === "Twitter (X)")[0]
                    .details
                )
              }
            >
              <FontAwesome6
                name="x-twitter"
                size={globalWidth("2.5%")}
                color={Colors.button}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    display: "flex",
    paddingHorizontal: globalWidth("1.5%"),
    paddingVertical: globalHeight("2%"),
  },
  titleHeader: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
    fontWeight: "600",
    marginBottom: globalHeight("1%"),
  },
  avatar: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: 5,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  nameCol: {
    marginLeft: globalWidth("1%"),
  },
  name: {
    fontSize: globalWidth("1.2%"),
    color: "#000",
    fontFamily: "poppins",
    fontWeight: "600",
  },
  role: {
    fontSize: globalWidth("1.0%"),
    color: "#000",
    fontFamily: "poppins",
  },
  pressBtn: {
    position: "absolute",
    left: globalWidth("4%"),
    top: globalHeight("7%"),
  },
  titleText: {
    fontSize: globalWidth("0.8%"),
    color: "#000",
    fontFamily: "poppins",
    fontWeight: "600",
  },
  detailsContainer: {
    display: "flex",
    backgroundColor: "#000",
    marginBottom: globalHeight("0.5%"),
    borderRadius: 5,
    height: globalHeight("4%"),
    justifyContent: "center",
  },
  detailsText: {
    fontSize: globalWidth("0.9%"),
    color: Colors.blue,
    fontFamily: "poppins",
    fontWeight: "400",
    paddingHorizontal: globalWidth("1%"),
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: globalHeight("2%"),
  },
});

export default ProfileCard;
