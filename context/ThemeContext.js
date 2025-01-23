import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme } from "../themes/darkTheme";
import { lightTheme } from "../themes/lightTheme";
import Colors from "../constants/Colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme); // Default to darkTheme
  const [globalColors, setGlobalColors] = useState({}); // Global color variables

  // Update global colors whenever the theme changes
  useEffect(() => {
    setGlobalColors({
      primary: theme.primary,
      secondary: theme.secondary,
      background: theme.background,
      text: theme.text,
      card: theme.card,
      custom: theme === darkTheme ? Colors.button : "#000",
      extraCard: theme === darkTheme ? "#000" : theme.card,
      calendarBG: theme === darkTheme ? "#000" : theme.card,
    });
  }, [theme]);

  const removeSavedTheme = async () => {
    try {
      await AsyncStorage.removeItem("appTheme");
      console.log("Saved theme removed successfully");
    } catch (error) {
      console.error("Error removing saved theme:", error);
    }
  };

  const saveDefaultDarkTheme = async () => {
    try {
      await AsyncStorage.setItem("appTheme", "dark"); // Save the theme name as "dark"
      console.log("Default dark theme saved successfully");
    } catch (error) {
      console.error("Error saving default dark theme:", error);
    }
  };

  // Load theme from AsyncStorage on app start
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) {
        setTheme(savedTheme === "dark" ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === darkTheme ? lightTheme : darkTheme;
      setTheme(newTheme); // Update theme state
      const themeName = newTheme === darkTheme ? "dark" : "light";
      await AsyncStorage.setItem("appTheme", themeName); // Save theme preference
      console.log("Theme toggled to:", themeName); // Debug log
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, globalColors, toggleTheme, saveDefaultDarkTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
