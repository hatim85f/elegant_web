import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import MainHolderScreen from "../holderScreens/MainHolderScreen";

import { useTheme } from "../../context/ThemeContext";

import { FontAwesome } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

const TermsAndConditions = (props) => {
  const { globalColors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen pageTitle="T & C" navigation={props.navigation}>
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
            Terms and Conditions
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
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  {"       "}Welcome to Elegant Flow App ("App", "we", "our",
                  "us"). These Terms and Conditions ("Terms") govern your use of
                  our services, features, and content available through the app.
                  By downloading, accessing, or using the app, you agree to
                  comply with and be bound by these Terms. If you do not agree
                  to these Terms, you must not use the app.
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  2) Eligibility
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  {"       "}To use the app, you must:
                  <ul>
                    <li>
                      <Text
                        style={[
                          styles.listItemContent,
                          { color: globalColors.text },
                        ]}
                      >
                        Be at least 18 years old or have the consent of a parent
                        or guardian.
                      </Text>
                    </li>
                    <li>
                      <Text
                        style={[
                          styles.listItemContent,
                          { color: globalColors.text },
                        ]}
                      >
                        Ensure that all information provided during registration
                        is accurate and up-to-date.
                      </Text>
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  3) Account Registration and Security
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      <Text
                        style={[
                          styles.listItemContent,
                          { color: globalColors.text },
                        ]}
                      >
                        You are responsible for maintaining the confidentiality
                        of your account credentials.
                      </Text>
                    </li>
                    <li>
                      <Text
                        style={[
                          styles.listItemContent,
                          { color: globalColors.text },
                        ]}
                      >
                        You agree to notify us immediately of any unauthorized
                        use of your account.
                      </Text>
                    </li>
                    <li>
                      <Text
                        style={[
                          styles.listItemContent,
                          { color: globalColors.text },
                        ]}
                      >
                        We reserve the right to suspend or terminate accounts at
                        our discretion.
                      </Text>
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  4) Use of the App
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      The app is provided for personal, non-commercial use.
                    </li>
                    <li>
                      You agree not to misuse the app by engaging in activities
                      such as:
                      <ul>
                        <li>
                          <Text
                            style={[
                              styles.listItemContent,
                              { color: globalColors.text },
                            ]}
                          >
                            Reverse-engineering or unauthorized modification of
                            the app.
                          </Text>
                        </li>
                        <li>
                          <Text
                            style={[
                              styles.listItemContent,
                              { color: globalColors.text },
                            ]}
                          >
                            Accessing or tampering with servers, databases, or
                            any other connected services.
                          </Text>
                        </li>
                        <li>
                          <Text
                            style={[
                              styles.listItemContent,
                              { color: globalColors.text },
                            ]}
                          >
                            Using automated tools or bots to access or
                            manipulate the app.
                          </Text>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  5) Subscription and Payments
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      Certain features of the app may require a subscription or
                      one-time payments.
                    </li>
                    <li>
                      Payment terms, fees, and renewal policies will be clearly
                      outlined at the point of purchase.
                    </li>
                    <li>
                      Subscriptions renew automatically unless canceled before
                      the renewal date.
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  6) User-Generated Content
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      Users may upload, share, or submit content. By doing so,
                      you:
                      <ul>
                        <li>
                          Grant us a non-exclusive, royalty-free, worldwide
                          license to use, display, and modify your content as
                          needed to provide services.
                        </li>
                        <li>
                          Confirm that your content does not infringe on any
                          third-party rights or violate applicable laws.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  7) Intellectual Property
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      All content, features, and designs within the app are
                      owned by or licensed to Elegant Flow App and are protected
                      by copyright and intellectual property laws.
                    </li>
                    <li>
                      You may not copy, reproduce, or distribute any part of the
                      app without prior written consent.
                    </li>
                  </ul>
                </Text>
              </View>
              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  8) Privacy Policy
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      Our use of your personal information is governed by our
                      Privacy Policy.
                    </li>
                    <li>
                      By using the app, you agree to the terms of our privacy
                      practices and the collection, use, and sharing of data as
                      described in the policy.
                    </li>
                  </ul>
                </Text>
              </View>

              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  9) Limitation of Liability
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      The app is provided on an "as-is" and "as-available"
                      basis, without warranties of any kind, express or implied.
                    </li>
                    <li>
                      To the fullest extent permitted by law, we disclaim
                      liability for any direct, indirect, incidental, or
                      consequential damages resulting from your use of the app.
                    </li>
                    <li>
                      This limitation of liability applies to all damages,
                      including loss of data, business interruption, or any
                      other types of loss.
                    </li>
                  </ul>
                </Text>
              </View>

              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  10) Governing Law
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      These Terms and Conditions shall be governed by and
                      construed in accordance with the laws of the United Arab
                      Emirates.
                    </li>
                  </ul>
                </Text>
              </View>

              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  11) Changes to Terms
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      We reserve the right to modify these Terms and Conditions
                      at any time.
                    </li>
                    <li>
                      Changes will be effective immediately upon posting.
                      Continued use of the app constitutes your agreement to the
                      updated terms.
                    </li>
                  </ul>
                </Text>
              </View>

              <View style={styles.termsContainer}>
                <Text style={[styles.header, { color: globalColors.text }]}>
                  12) Contact Us
                </Text>
                <Text
                  style={[styles.listItemContent, { color: globalColors.text }]}
                >
                  <ul>
                    <li>
                      For questions or concerns regarding these Terms and
                      Conditions, please contact us at:
                    </li>
                    <li>
                      <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                      info@codexpandit.com
                    </li>
                    <li>
                      <Text style={{ fontWeight: "bold" }}>Address:</Text>{" "}
                      Sharjah, United Arab Emirates
                    </li>
                  </ul>
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

export const TermsAndConditionsOptions = (navData) => {
  return {
    headerTitle: "TermsAndConditions",
  };
};

export default TermsAndConditions;
