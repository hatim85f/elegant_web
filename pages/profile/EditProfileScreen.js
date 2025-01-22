import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as authActions from "../../store/auth/authActions";

import Card from "../../components/Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import useImageUpload from "../../hooks/useImageUploads";

const EditProfileScreen = (props) => {
  const { globalColors } = useTheme();

  const { user, token } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [department, setDepartment] = useState(user?.department);
  const [officeLocation, setOfficeLocation] = useState(user?.officeLocation);
  const [avatar, setAvatar] = useState(user?.profile?.avatar);
  const [phone, setPhone] = useState(user?.profile?.phone);
  const [facebookAccount, setFacebookAccount] = useState(
    user?.social?.facebook
  );
  const [xAccount, setXAccount] = useState(user?.social?.x);
  const [linkedinAccount, setLinkedinAccount] = useState(
    user?.social?.linkedin
  );
  const [instagramAccount, setInstagramAccount] = useState(
    user?.social?.instagram
  );

  const [profileIsLoading, setProfileIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  const { pickAndUploadImage, imageUrl, progress } = useImageUpload(
    `${firstName?.trim()}-image.jpg`,
    `${firstName?.trim()}-image/images`
  );

  const changeProfileImage = async () => {
    const url = await pickAndUploadImage();
    if (url) {
      setAvatar(url);
    }
  };

  const saveChanges = () => {
    setProfileIsLoading(true);

    localStorage.removeItem("userDetails");
    dispatch(
      authActions.editUser(
        avatar,
        firstName,
        lastName,
        phone,
        email,
        department,
        officeLocation,
        facebookAccount,
        xAccount,
        linkedinAccount,
        instagramAccount
      )
    ).then(() => {
      setProfileIsLoading(false);

      props.navigation.navigate("profile");
    });
  };

  if (!token) {
    return (
      <View
        style={[styles.container, { backgroundColor: globalColors.background }]}
      >
        <ActivityIndicator size="large" color={globalColors.text} />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen navigation={props.navigation} pageTitle="Account">
        <View style={styles.mainRow}>
          <View style={styles.rowItem}>
            <Text style={[styles.header, { color: globalColors.text }]}>
              Personal Infromation
            </Text>
            <Card
              style={[styles.card, { backgroundColor: globalColors.extraCard }]}
            >
              <Avatar
                rounded
                size={globalWidth("7%")}
                source={{
                  uri: avatar,
                }}
                avatarStyle={styles.avatarStyle}
              />
              <Button
                buttonStyle={styles.uploadBtn}
                title={
                  user.avatar ? "Change Profile Image" : "Upload Profile Image"
                }
                titleStyle={styles.uploadBtnTitle}
                onPress={() => changeProfileImage()}
              />
              <View style={styles.smallRow}>
                <Input
                  placeholder="First Name"
                  containerStyle={[
                    styles.inputContainer,
                    { backgroundColor: globalColors.card, width: "45%" },
                  ]}
                  style={styles.input}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  rightIcon={{
                    type: "font-awesome",
                    name: "user",
                    color: globalColors.custom,
                  }}
                />
                <Input
                  placeholder="Last Name"
                  containerStyle={[
                    styles.inputContainer,
                    { backgroundColor: globalColors.card, width: "45%" },
                  ]}
                  style={styles.input}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  rightIcon={{
                    type: "font-awesome",
                    name: "user",
                    color: globalColors.custom,
                  }}
                />
              </View>
              <Input
                placeholder="Email"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: globalColors.custom,
                }}
                keyboardType="email-address"
              />
              <Input
                placeholder="Phone Number e.g. +971 55 555 5555"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card, width: "95%" },
                ]}
                style={styles.input}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "phone",
                  color: globalColors.custom,
                }}
                keyboardType="phone-pad"
                maxLength={13}
              />
            </Card>
            <Text style={[styles.header, { color: globalColors.text }]}>
              Business Infromation
            </Text>
            <Card
              style={[styles.card, { backgroundColor: globalColors.extraCard }]}
            >
              <Input
                placeholder="Department"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={department}
                onChangeText={(text) => setDepartment(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "building",
                  color: globalColors.custom,
                }}
              />
              <Input
                placeholder="Office Location"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={officeLocation}
                onChangeText={(text) => setOfficeLocation(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "map-marker",
                  color: globalColors.custom,
                }}
              />
            </Card>
          </View>
          <View style={styles.rowItem}>
            <Text style={[styles.header, { color: globalColors.text }]}>
              Social Media Links
            </Text>
            <Card
              style={[styles.card, { backgroundColor: globalColors.extraCard }]}
            >
              <Input
                placeholder="Facebook"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={facebookAccount}
                onChangeText={(text) => setFacebookAccount(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "facebook",
                  color: globalColors.custom,
                }}
              />
              <Input
                placeholder="X"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={xAccount}
                onChangeText={(text) => setXAccount(text)}
                rightIcon={() => (
                  <FontAwesome6
                    name="square-x-twitter"
                    size={24}
                    color={globalColors.custom}
                  />
                )}
              />
              <Input
                placeholder="LinkedIn"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={linkedinAccount}
                onChangeText={(text) => setLinkedinAccount(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "linkedin",
                  color: globalColors.custom,
                }}
              />
              <Input
                placeholder="Instagram"
                containerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.card },
                ]}
                style={styles.input}
                value={instagramAccount}
                onChangeText={(text) => setInstagramAccount(text)}
                rightIcon={{
                  type: "font-awesome",
                  name: "instagram",
                  color: globalColors.custom,
                }}
              />
            </Card>
            <Button
              title="Save Changes"
              buttonStyle={[
                styles.uploadBtn,
                { alignSelf: "center", marginTop: globalHeight("2.5%") },
              ]}
              titleStyle={styles.uploadBtnTitle}
              onPress={saveChanges}
              loading={profileIsLoading}
              loadingStyle={{ color: globalColors.text }}
              disabled={phone === "" || avatar === ""}
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
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    marginLeft: globalWidth("1%"),
    marginTop: globalHeight("1.5%"),
    marginBottom: globalHeight("2%"),
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: globalWidth("0.5%"),
    padding: globalWidth("0.25%"),
  },
  rowItem: {
    width: "48%",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: globalHeight("1%"),
    paddingBottom: globalHeight("2%"),
  },
  avatarStyle: {
    height: globalHeight("15%"),
    width: globalHeight("15%"),
  },
  uploadBtn: {
    backgroundColor: Colors.button,
    width: globalWidth("15%"),
    borderRadius: 5,
    marginTop: globalHeight("1%"),
  },
  uploadBtnTitle: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  smallRow: {
    width: "100%",
    // padding: globalWidth("1%"),
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("1%"),
  },
  inputContainer: {
    borderRadius: 8,
    marginTop: globalHeight("1%"),
    width: "95%",
  },
  input: {
    color: "black",
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
});

export const EditProfileScreenOptions = (navData) => {
  return {
    headerTitle: "EditProfileScreen",
  };
};

export default EditProfileScreen;
