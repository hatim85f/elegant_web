import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import LeftContainerContent from "../holderScreens/LeftContainerContent";
import MainHolderScreen from "../holderScreens/MainHolderScreen";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import ProfileCard from "./ProfileCard";

import * as authActions from "../../store/auth/authActions";
import Colors from "../../constants/Colors";

const ProfileScreen = (props) => {
  const { theme } = useTheme();

  const { user, token } = useSelector((state) => state.auth);

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

  const userAvatar = user?.profile?.avatar
    ? { uri: user.profile?.avatar }
    : require("../../assets/images/avatar.jpg");

  if (!token) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <MainHolderScreen navigation={props.navigation} pageTitle="Profile">
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Profile"
            onPress={() => props.navigation.navigate("edit_profile")}
            buttonStyle={styles.editProfileButton}
            titleStyle={styles.editBtnTitle}
          />
        </View>
        <View style={styles.cardsContainer}>
          <View style={{ width: "46%", height: "100%" }}>
            <ProfileCard
              userAvatar={userAvatar}
              firstName={user.firstName}
              lastName={user.lastName}
              role={user.role}
              lines={[
                {
                  item: "firstName",
                  title: "Display Name",
                  details: `${user.firstName} ${user.lastName}`,
                },
                { item: "email", title: "Email Address", details: user.email },
                {
                  item: "phone",
                  title: "Phone Number",
                  details: user.profile?.phone,
                },
              ]}
            />
            <ProfileCard
              giveMargin={true}
              title="Work Location"
              lines={[
                {
                  item: "officeLocation",
                  title: "Office Location",
                  details: user.officeLocation || "Not Assigned",
                },
                {
                  item: "department",
                  title: "Department",
                  details: user.department || "Not Specified",
                },
                {
                  item: "jobTitle",
                  title: "Job Title",
                  details:
                    user.role.charAt(0).toUpperCase() + user.role.slice(1) ||
                    "Not Specified",
                },
              ]}
            />
          </View>
          <View style={{ width: "46%", height: "100%" }}>
            <ProfileCard
              giveMargin={true}
              title="Emergency Contact"
              lines={[
                {
                  item: "emergencyContact.name",
                  title: "Emergency Contact Name",
                  details: user.emergencyContact?.name || "Not Provided",
                },
                {
                  item: "emergencyContact.relationship",
                  title: "Relationship",
                  details:
                    user.emergencyContact?.relationship || "Not Provided",
                },
                {
                  item: "emergencyContact.phone",
                  title: "Contact Number",
                  details: user.emergencyContact?.phone || "Not Provided",
                },
              ]}
            />
            <ProfileCard
              giveMargin={true}
              title="Social Links"
              lines={[
                {
                  item: "facebook",
                  title: "Facebook",
                  details: user.social?.facebook || "Not Linked",
                },
                {
                  item: "x",
                  title: "Twitter (X)",
                  details: user.social?.x || "Not Linked",
                },
                {
                  item: "linkedin",
                  title: "LinkedIn",
                  details: user.social?.linkedin || "Not Linked",
                },
                {
                  item: "instagram",
                  title: "Instagram",
                  details: user.social?.instagram || "Not Linked",
                },
              ]}
            />
          </View>
        </View>
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // marginTop: globalHeight("5%"),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  editProfileButton: {
    backgroundColor: Colors.button,
    width: globalWidth("15%"),
    borderRadius: 5,
    margin: globalWidth("0.25%"),
  },
});

export default ProfileScreen;
