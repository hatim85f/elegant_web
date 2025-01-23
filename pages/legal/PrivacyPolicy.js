import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import { useTheme } from "../../context/ThemeContext";
import { globalWidth } from "../../constants/globalWidth";
import { ScrollView } from "react-native-gesture-handler";

const PrivacyPolicy = (props) => {
  const { globalColors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen
        pageTitle="Privacy Policy"
        navigation={props.navigation}
      >
        <View style={styles.mainContainer}>
          <Text
            style={[
              styles.header,
              {
                color: globalColors.text,
                textAlign: "center",
                fontSize: globalWidth("1.7%"),
                marginBottom: globalWidth("2.5%"),
              },
            ]}
          >
            Privacy Policy
          </Text>
          <View
            style={{
              flex: 1,
              borderTopColor: globalColors.text,
              borderTopWidth: 1,
              paddingTop: globalWidth("2.5%"),
            }}
          >
            <ScrollView
              scrollEnabled
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  1) Introduction
                </Text>
                <Text
                  style={[
                    styles.listItemContent,
                    { color: globalColors.text, textAlign: "justify" },
                  ]}
                >
                  {"       "}Welcome to Elegant Flow App. This Privacy Policy
                  outlines how we collect, use, and protect your information
                  when you use our app. By using the app, you consent to the
                  terms of this policy.
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  2) Information We Collect
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      <Text>
                        <Text style={{ fontWeight: "bold" }}>
                          Personal Data:
                        </Text>{" "}
                        Includes name, email address, phone number, and other
                        details provided during registration.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <Text style={{ fontWeight: "bold" }}>Usage Data:</Text>{" "}
                        Includes app activity, pages viewed, and other analytics
                        data collected automatically.
                      </Text>
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  3) How We Use Your Information
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>To provide and improve our services.</li>
                    <li>To personalize the user experience.</li>
                    <li>
                      To communicate with you regarding updates, promotions, or
                      support.
                    </li>
                    <li>
                      To analyze usage and trends for app performance
                      optimization.
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  4) Sharing Your Information
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      We do not sell your personal information to third parties.
                    </li>
                    <li>
                      Information may be shared with trusted partners for
                      app-related services, subject to confidentiality
                      agreements.
                    </li>
                    <li>
                      We may disclose information to comply with legal
                      obligations or protect our rights and users.
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  5) Security of Your Information
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  {"       "}We implement appropriate technical and
                  organizational measures to protect your information from
                  unauthorized access, loss, or misuse. However, no method of
                  transmission over the internet is entirely secure.
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  6) Cookies and Tracking Technologies
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      We use cookies to enhance the user experience and collect
                      usage data.
                    </li>
                    <li>
                      You can adjust your device or browser settings to manage
                      or block cookies.
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  7) Changes to Privacy Policy
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  {"       "}We reserve the right to update this policy. Changes
                  will be effective immediately upon posting. Continued use of
                  the app constitutes agreement to the updated policy.
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  8) Contact Us
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  {"       "}For questions or concerns about this Privacy
                  Policy, please contact us at:
                </Text>
                <Text
                  style={[
                    styles.listItemContent,
                    { color: globalColors.text, marginTop: globalWidth("1%") },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                  info@codexpandit.com
                </Text>
                <Text
                  style={[
                    styles.listItemContent,
                    { color: globalColors.text, marginTop: globalWidth("1%") },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>Address:</Text> Sharjah,
                  United Arab Emirates
                </Text>
              </View>
            </ScrollView>
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
  mainContainer: {
    padding: globalWidth("2.5%"),
    flex: 1,
  },
  termsContainer: {
    marginBottom: globalWidth("2.5%"),
  },
  header: {
    fontSize: globalWidth("1.3%"),
    fontFamily: "poppins",
    fontWeight: "bold",
  },
  listItemContent: {
    fontSize: globalWidth("0.9%"),
    fontFamily: "poppins",
    width: "80%",
    textAlign: "justify",
  },
});

export const PrivacyPolicyOptions = (navData) => {
  return {
    headerTitle: "PrivacyPolicy",
  };
};

export default PrivacyPolicy;
