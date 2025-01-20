import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";

import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider, useSelector, useDispatch } from "react-redux";

import { enableScreens } from "react-native-screens";
import mainStore from "./store";
import { NavigationContext } from "@react-navigation/native";
import ErrorModal from "./components/error/ErrorModal";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants/firebaseConfig";

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  enableScreens();

  initializeApp(firebaseConfig);

  useEffect(() => {
    const fetchFonts = async () => {
      await Font.loadAsync({
        poppins: require("./assets/fonts/poppins.ttf"),
      });
      setAppIsReady(true); // Set appIsReady to true after the font has loaded
    };

    fetchFonts();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={mainStore}>
          <ThemeProvider>
            <AppNavigator />
            <ErrorModal />
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
