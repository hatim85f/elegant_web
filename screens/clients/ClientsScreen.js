import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";

import MainHolderScreen from "../holderScreens/MainHolderScreen";

import { globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";

import ActiveClients from "./ActiveClients";
import InActiveClients from "./InActiveClients";

import * as authActions from "../../store/auth/authActions";
import Loader from "../../components/Loader";

const ClientsScreen = (props) => {
  const { globalColors } = useTheme();

  const [showingContainer, setShowingContainer] = useState("active");

  const { token, user } = useSelector((state) => state.auth);

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

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen pageTitle="Clients" navigation={props.navigation}>
        <View style={[styles.upperContainer, { backgroundColor: "#000" }]}>
          <View style={styles.smallRow}>
            <Pressable onPress={() => setShowingContainer("active")}>
              <Text
                style={[
                  styles.header,
                  {
                    color:
                      showingContainer === "active" ? Colors.button : "#fff",
                  },
                ]}
              >
                Active Clients
              </Text>
            </Pressable>
            <Pressable onPress={() => setShowingContainer("inactive")}>
              <Text
                style={[
                  styles.header,
                  {
                    color:
                      showingContainer === "inactive" ? Colors.button : "#fff",
                  },
                ]}
              >
                Inactive Clients
              </Text>
            </Pressable>
          </View>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Add Client"
            icon={{ name: "add", color: "#fff" }}
            onPress={() => props.navigation.navigate("add_new_client")}
          />
        </View>
        {showingContainer === "active" ? (
          <ActiveClients navigation={props.navigation} />
        ) : (
          <InActiveClients navigation={props.navigation} />
        )}
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: globalWidth("5%"),
    padding: 12,
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: globalWidth("20%"),
  },
  button: {
    backgroundColor: Colors.button,
    borderRadius: 5,
    width: globalWidth("10%"),
  },
});

export const ClientsScreenOptions = (navData) => {
  return {
    headerTitle: "ClientsScreen",
  };
};

export default ClientsScreen;
