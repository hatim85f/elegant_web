import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { isTablet } from "../constants/device";
import { globalHeight, globalWidth } from "../constants/globalWidth";

const Loader = (props) => {
  const { loadingMessage, loadingColor, containerColor } = props;

  return (
    <View style={[styles.container, { backgroundColor: containerColor }]}>
      <ActivityIndicator size="large" color={loadingColor} />
      {loadingMessage.length > 0 && (
        <Text style={[styles.header, { color: loadingColor }]}>
          {loadingMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
    marginTop: globalHeight("2%"),
  },
});

export const LoaderOptions = (navData) => {
  return {
    headerTitle: "Loader",
  };
};

export default Loader;
