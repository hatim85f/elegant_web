import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Button, Image, Switch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "@react-navigation/native";

import { useTheme } from "../../context/ThemeContext";

import * as authActions from "../../store/auth/authActions";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";

import {
  FontAwesome5,
  Octicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import { Pressable, ScrollView } from "react-native-gesture-handler";

const LeftContainerContent = (props) => {
  const { globalColors, toggleTheme, theme, saveDefaultDarkTheme } = useTheme();

  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const routeName = useRoute().name;

  const userAvatar = user?.profile?.avatar
    ? { uri: user?.profile?.avatar }
    : require("../../assets/images/avatar.jpg");

  const logOut = () => {
    saveDefaultDarkTheme();
    window.location.href = "/start";
    dispatch(authActions.logOut());
  };

  const itemsList = [
    {
      item: "Home",
      icon: (
        <FontAwesome5 name="home" size={globalWidth("1.4%")} color="black" />
      ),
      route: "home",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    {
      item: "Profile",
      icon: (
        <Octicons name="feed-person" size={globalWidth("1.4%")} color="black" />
      ),
      route: "profile",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    {
      item: "Organization",
      icon: (
        <FontAwesome name="building" size={globalWidth("1.4%")} color="black" />
      ),
      route: "organization",
      showFor: ["owner", "admin", "manager"],
    },
    {
      item: "Team",
      icon: <AntDesign name="team" size={globalWidth("1.4%")} color="black" />,
      route: "team",
      showFor: ["owner", "admin", "manager"],
    },
    {
      item: "Client List",
      icon: (
        <MaterialCommunityIcons
          name="account-group"
          size={globalWidth("1.4%")}
          color="black"
        />
      ),
      route: "clients",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    {
      item: "Add New Client",
      icon: (
        <AntDesign name="adduser" size={globalWidth("1.4%")} color="black" />
      ),
      route: "add_new_client",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    // {
    //   item: "Deliveries",
    //   icon: (
    //     <MaterialCommunityIcons
    //       name="truck"
    //       size={globalWidth("1.4%")}
    //       color="black"
    //     />
    //   ),
    //   route: "deliveries",
    //   showFor: ["owner", "admin", "manager", "employee"],
    // },
    // {
    //   item: "Reminders",
    //   icon: (
    //     <MaterialIcons
    //       name="access-alarms"
    //       size={globalWidth("1.4%")}
    //       color="black"
    //     />
    //   ),
    //   route: "reminders",
    //   showFor: ["owner", "admin", "manager", "employee"],
    // },
    // {
    //   item: "Reports",
    //   icon: (
    //     <MaterialCommunityIcons
    //       name="file-document"
    //       size={globalWidth("1.4%")}
    //       color="black"
    //     />
    //   ),
    //   route: "reports",
    //   showFor: ["owner", "admin", "manager"],
    // },
    {
      item: "Leads",
      icon: <Ionicons name="filter" size={globalWidth("1.4%")} color="black" />,
      route: "leads",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    {
      item: "T & C",
      icon: (
        <FontAwesome name="legal" size={globalWidth("1.4%")} color="black" />
      ),
      route: "terms_and_conditions",
      showFor: ["owner", "admin", "manager", "employee"],
    },
    {
      item: "Privacy Policy",
      icon: (
        <MaterialIcons
          name="privacy-tip"
          size={globalWidth("1.4%")}
          color="black"
        />
      ),
      route: "privacy_policy",
      showFor: ["owner", "admin", "manager", "employee"],
    },
  ];

  if (!token) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.upperContainer}>
          <View style={styles.userContainer}>
            <Image source={userAvatar} rounded style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user.firstName.charAt(0)}. {user.lastName}{" "}
              </Text>
              <Text style={styles.role}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            {itemsList.map((item, index) => {
              const isActive =
                routeName === item.route.split("/")[0] ||
                (routeName === "edit_profile" && item.route === "profile") ||
                (routeName === "team_member" && item.route === "team") ||
                (routeName === "client_details" && item.route === "clients") ||
                (routeName === "edit_organization" &&
                  item.route === "organization");
              return (
                <Pressable
                  onPress={() => props.navigation.navigate(item.route)}
                  style={[
                    styles.listItemContainer,
                    {
                      borderWidth: isActive ? 2 : 0,
                      display: item.showFor.includes(user.role)
                        ? "flex"
                        : "none",
                    },
                  ]}
                  key={index}
                >
                  {item.icon}
                  <Text style={styles.itemName}>{item.item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View
          style={[styles.listContainer, { marginTop: -globalHeight("2%") }]}
        >
          <Pressable
            style={styles.imageContainer}
            onPress={() => Linking.openURL("https://www.codexpandit.com")}
          >
            <Image
              source={require("../../assets/images/powered_light.png")}
              style={styles.powered}
            />
          </Pressable>
          <View style={styles.line} />
          <View
            style={[
              styles.listItemContainer,
              { marginTop: -globalHeight("2%") },
            ]}
          >
            <Switch
              value={theme.primary === "#121212"}
              onValueChange={toggleTheme}
              color={theme.background}
              thumbColor={Colors.button}
              trackColor={{ false: "#000", true: "#fff" }}
            />
            <Text style={styles.itemName}>
              {" "}
              {theme.primary === "#121212" ? "Dark Mode" : "Light Mode"}{" "}
            </Text>
          </View>
          <Pressable
            onPress={() => {}}
            style={[
              styles.listItemContainer,
              { marginTop: -globalHeight("2%") },
            ]}
          >
            <Ionicons name="settings-sharp" size={24} color="black" />
            <Text style={styles.itemName}>Settings</Text>
          </Pressable>
          <Pressable
            onPress={logOut}
            style={[
              styles.listItemContainer,
              { marginTop: -globalHeight("2%") },
            ]}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={styles.itemName}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {},
  avatar: {
    width: globalWidth("3%"),
    height: globalWidth("3%"),
    borderRadius: globalWidth("1.75%"),
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: globalWidth("0.5%"),
    marginTop: globalWidth("1%"),
    borderColor: Colors.button,
    borderWidth: 2,
    width: "90%",
    alignSelf: "center",
    borderRadius: globalWidth("1.5%"),
    height: globalHeight("7.8%"),
    boxSize: "border-box",
  },
  userName: {
    fontSize: globalWidth("0.9%"),
    color: "#000",
    fontFamily: "poppins",
    fontWeight: "600",
    marginLeft: globalWidth("1%"),
  },
  role: {
    fontSize: globalWidth("1.0%"),
    color: "#000",
    fontFamily: "poppins",
    marginLeft: globalWidth("1%"),
  },
  listContainer: {
    marginTop: globalWidth("3%"),
    width: "90%",
    alignSelf: "center",
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: globalWidth("1%"),
    borderRadius: globalWidth("1.5%"),
    borderColor: Colors.button,
  },
  itemName: {
    fontSize: globalWidth("0.9%"),
    color: "#000",
    fontFamily: "poppins",
    marginLeft: globalWidth("1%"),
  },
  imageContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: globalHeight("4%"),
  },
  powered: {
    width: globalWidth("10%"),
    height: globalWidth("2.5%"),
    alignSelf: "center",
  },
  line: {
    width: "80%",
    alignSelf: "center",
    height: 2.5,
    backgroundColor: Colors.blue,
    marginTop: globalWidth("0.5%"),
    marginBottom: globalWidth("1%"),
  },
});

export const LeftContainerContentOptions = (navData) => {
  return {
    headerTitle: "LeftContainerContent",
  };
};

export default LeftContainerContent;
