import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "../Card";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/auth/authActions";

import { useTheme } from "../../context/ThemeContext";

const ErrorModal = () => {
  const { error, errorMessage, showError } = useSelector((state) => state.auth);

  const { theme } = useTheme();

  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  return (
    <Modal visible={showError} animationType="slide" style={styles.modalStyle}>
      <View style={styles.modalStyle}>
        <Card style={[styles.card, { backgroundColor: theme.background }]}>
          <View
            style={[
              styles.header,
              {
                color: theme.text,
                backgroundColor: theme.background,
                padding: 10,
              },
            ]}
          >
            <Text style={[styles.errorTitle, { color: theme.text }]}>
              {" "}
              {error}{" "}
            </Text>
          </View>
          <View
            style={[styles.messageContainer, { backgroundColor: theme.card }]}
          >
            <Text style={[styles.message, { color: "#000" }]}>
              {errorMessage}
            </Text>
          </View>
          <View
            style={[
              styles.header,
              {
                alignItems: "flex-end",
                height: hp("5%"),
                backgroundColor: theme.background,
              },
            ]}
          >
            <Button
              title="Ok"
              buttonStyle={[styles.button]}
              titleStyle={[styles.title, { color: theme.text }]}
              onPress={clearError}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(200, 211, 213, 0.8)",
  },
  card: {
    height: hp("40%"),
    width: hp("80%"),
    overflow: "hidden",
  },
  header: {
    backgroundColor: Colors.primary,
    height: hp("7%"),
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  errorTitle: {
    fontSize: wp("1.5%"),
    color: "white",
    fontFamily: "headers",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(135, 0, 243, 0.18)",
  },
  message: {
    fontSize: wp("1.5%"),
    color: Colors.font,
    fontFamily: "headers",
    textAlign: "center",
  },
  button: {
    height: hp("5%"),
    width: wp("8%"),
    backgroundColor: "transaprent",
  },
  title: {
    color: "#000",
    fontFamily: "headers",
    fontSize: wp("1%"),
  },
});

export default ErrorModal;
