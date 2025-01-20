import { useState, useEffect, useContext } from "react";
import { Alert, Text } from "react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

import { NavigationContainer } from "@react-navigation/native";

import { NavigationContext } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FullAppNavigator } from "./FullAppNavigator";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const AppNavigator = (props) => {
  const [initialState, setInitialState] = useState();
  const navigationContext = useContext(NavigationContext);

  const prefix =
    Constants.appOwnership === "expo"
      ? Linking.createURL("/")
      : "elegant_flow://";

  const config = {
    screens: {
      auth: {
        screens: {
          start: "start",
          login: "login",
          redirect: "redirect",
          register: "register",
        },
      },
      home: "home",
      profile: {
        screens: {
          profile: "profile",
          edit_profile: "profile/edit_profile",
        },
      },
      team: {
        screens: {
          team: "team",
          team_member: "team/team_member",
        },
      },
      clients: {
        screens: {
          clients: "clients",
          client_details: "clients/client_details",
        },
      },
      addNewClient: "addNewClient",
      organization: "organization",
      leads: "leads",
    },
  };

  const linking = {
    prefixes: [prefix],
    config,
  };

  useEffect(() => {
    const restoreState = async () => {
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      if (state !== undefined) {
        setInitialState(state);
      }
    };

    restoreState();
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      context={navigationContext}
      initialState={initialState}
      onStateChange={setInitialState}
    >
      <FullAppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
