import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

import * as clientsActions from "../../store/clients/clientsActions";
import moment from "moment";

const FeedbackUpdates = (props) => {
  const { globalColors } = useTheme();

  const { clientDetails } = useSelector((state) => state.clients);
  const { user } = useSelector((state) => state.auth);

  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { clientId } = props;

  const { clientFeedback } = clientDetails;

  const dispatch = useDispatch();

  const gettingNewUpdates = useCallback(() => {
    dispatch(clientsActions.getSpecificClient(clientId));
  }, [feedbackText, dispatch]);

  const submitFeedback = () => {
    setIsLoading(true);
    dispatch(clientsActions.updateClientFeedback(clientId, feedbackText)).then(
      () => {
        setIsLoading(false);
        setFeedbackText("");
        gettingNewUpdates();
      }
    );
  };

  useEffect(() => {
    if (clientFeedback && clientFeedback.length > 0) {
      setIsLoading(false);
      dispatch(clientsActions.updateFeedbackSeen(clientId)).then(() => {
        setIsLoading(false);
      });
    }
  }, [clientFeedback]);

  return (
    <View
      style={[styles.container, { borderLeftColor: globalColors.extraCard }]}
    >
      <View
        style={[
          styles.outerContainer,
          { backgroundColor: globalColors.background },
        ]}
      >
        <Text style={[styles.header, { color: globalColors.text }]}>
          Feedback Updates
        </Text>
        <View style={styles.middleContainer}>
          <ScrollView
            scrollEnabled
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              maxHeight: globalHeight("75%"),
              minHeight: globalHeight("75%"),
            }}
          >
            {clientFeedback?.length > 0 &&
              clientFeedback.map((feedback, index) => {
                return (
                  <View style={[styles.mainFeedbackContainer]} key={index}>
                    <View
                      style={[
                        styles.feedbackContainer,
                        {
                          alignSelf:
                            user._id === feedback.feedbackUserId
                              ? "flex-end"
                              : "flex-start",
                        },
                      ]}
                    >
                      {user._id !== feedback.feedbackUserId && (
                        <Avatar
                          rounded
                          size={globalWidth("3.5%")}
                          source={{ uri: feedback.feedbackByAvatar }}
                        />
                      )}
                      <View
                        style={[
                          styles.feedbackTextContainer,
                          {
                            backgroundColor:
                              user._id === feedback.feedbackUserId
                                ? Colors.blue
                                : globalColors.card,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.feedbackText,
                            {
                              color:
                                user._id === feedback.feedbackUserId
                                  ? "white"
                                  : "black",
                            },
                          ]}
                        >
                          {feedback.feedback}
                        </Text>
                        {user._id === feedback.feedbackUserId && (
                          <Ionicons
                            name="checkmark-done-outline"
                            size={24}
                            color={feedback.feedbackSeen ? "green" : "black"}
                            style={{
                              alignSelf:
                                user._id !== feedback.feedbackUserId
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                          />
                        )}
                      </View>
                      {user._id === feedback.feedbackUserId && (
                        <Avatar
                          rounded
                          size={globalWidth("3.5%")}
                          source={{ uri: feedback.feedbackByAvatar }}
                        />
                      )}
                    </View>
                    {user._id !== feedback.feedbackUserId && (
                      <Text
                        style={[
                          styles.feedbackText,
                          {
                            color: globalColors.text,
                            textAlign: "left",
                            marginLeft: globalWidth("3%"),
                          },
                        ]}
                      >
                        {moment(feedback.createdAt).format(
                          "DD/MM/YYYY hh:mm A"
                        )}
                      </Text>
                    )}
                    {user._id === feedback.feedbackUserId && (
                      <Text
                        style={[
                          styles.feedbackText,
                          {
                            color: globalColors.text,
                            textAlign: "right",
                            marginRight: globalWidth("3%"),
                          },
                        ]}
                      >
                        {moment(feedback.createdAt).format(
                          "DD/MM/YYYY hh:mm A"
                        )}
                      </Text>
                    )}
                  </View>
                );
              })}
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <Input
            placeholder="Type your message..."
            placeholderTextColor={Colors.blue}
            value={feedbackText}
            onChangeText={(text) => setFeedbackText(text)}
            inputStyle={{ color: globalColors.text, fontFamily: "poppins" }}
            containerStyle={{ width: "75%" }}
            onSubmitEditing={submitFeedback}
          />
          <Button
            buttonStyle={[
              styles.textBtn,
              { backgroundColor: globalColors.custom },
            ]}
            titleStyle={styles.textBtnTitle}
            title="Send"
            loading={isLoading}
            onPress={submitFeedback}
            loadingStyle={{ color: globalColors.text }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 4,
    alignItems: "center",
    height: globalWidth("100%"),
  },
  outerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: globalWidth("0.5%"),
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    textAlign: "left",
    marginTop: globalWidth("2%"),
    marginLeft: globalWidth("1%"),
  },
  middleContainer: {
    maxHeight: "80%",
    width: "95%",
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 25,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    width: globalWidth("5%"),
  },
  feedbackText: {
    color: "#fff",
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
  mainFeedbackContainer: {
    // alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: globalHeight("1.5%"),
  },
  feedbackTextContainer: {
    borderRadius: 5,
    padding: 10,
    marginRight: -10,
    marginLeft: -10,
    marginTop: 5,
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 15,
    paddingLeft: 15,
    maxWidth: globalWidth("20%"),
    zIndex: -1,
  },
});

export const FeedbackUpdatesOptions = (navData) => {
  return {
    headerTitle: "FeedbackUpdates",
  };
};

export default FeedbackUpdates;
