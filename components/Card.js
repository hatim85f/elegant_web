import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

import { useTheme } from "../context/ThemeContext";

const Card = (props) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#6a6b6c",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.button,
  },
});

export default Card;
