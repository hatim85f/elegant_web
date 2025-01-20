import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, CheckBox, Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import moment from "moment";

import * as Progress from "react-native-progress";
import Colors from "../../constants/Colors";

import Entypo from "@expo/vector-icons/Entypo";

const HomeCard = (props) => {
  const {
    date,
    header,
    subHeader,
    addedBy,
    percentageBar,
    imageURL,
    address,
    onChange,
    showOnChange,
    quotation,
    quotationDetails,
    reminderList,
    todayDate,
  } = props;

  return (
    <Card style={styles.card}>
      <View style={styles.cardLeftContainer}>
        <Image source={imageURL} style={styles.cardImage} />
      </View>
      <View style={styles.cardRightContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cardHeader}> {header} </Text>
          {showOnChange && (
            <Button
              title="Change"
              titleStyle={{
                color: "white",
                fontSize: globalWidth("0.8%"),
                fontFamily: "poppins",
              }}
              buttonStyle={styles.btn}
              onPress={onChange}
            />
          )}
        </View>
        <Text style={styles.cardText}> {subHeader} </Text>
        {quotation && (
          <View style={styles.quotationData}>
            <Text style={styles.title}>
              {" "}
              Total Value :{" "}
              <Text style={styles.cardText}>
                {" "}
                {quotationDetails.quotationValue}{" "}
                {quotationDetails.quotationCurrency}{" "}
              </Text>{" "}
            </Text>
            <Text style={styles.title}>
              {" "}
              Status :{" "}
              <Text style={styles.cardText}>
                {" "}
                {quotationDetails.quotationStatus}{" "}
              </Text>{" "}
            </Text>
            <Text style={styles.title}>
              {" "}
              Comment :{" "}
              <Text style={styles.cardText}>
                {" "}
                {quotationDetails.quotationComment}{" "}
              </Text>{" "}
            </Text>
            <Text style={styles.title}>
              {" "}
              Created By :{" "}
              <Text style={styles.cardText}>
                {" "}
                {quotationDetails.quotationCreatedBy}{" "}
              </Text>{" "}
            </Text>
            <Text style={styles.title}>
              {" "}
              Quotation Date :{" "}
              <Text style={styles.cardText}>
                {" "}
                {moment(quotationDetails.quotationDate)
                  .format("MMM. Do YYYY")
                  .replace(/(\d)(st|nd|rd|th)/g, "$1$2")}{" "}
              </Text>{" "}
            </Text>
          </View>
        )}

        {date && (
          <Text style={styles.date}>
            {moment(date)
              .format("MMM. Do YYYY")
              .replace(/(\d)(st|nd|rd|th)/g, "$1$2")}
          </Text>
        )}
        {addedBy && (
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: "600" }}>Added By : </Text> {addedBy}
          </Text>
        )}
        {address && (
          <View>
            <Text style={{ fontWeight: "600" }}>Address : </Text>
            <Text style={styles.cardText}>{address}</Text>
          </View>
        )}
        {percentageBar && (
          <View style={styles.lowerContainer}>
            <Progress.Bar
              progress={percentageBar}
              width={globalWidth("19.5%")}
              color={Colors.button}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
              <Text style={styles.percent}>Profile</Text>
              <Text style={styles.percent}>
                {" "}
                {percentageBar * 100}% Completed{" "}
              </Text>
            </View>
          </View>
        )}
        {reminderList?.map((item, index) => {
          return (
            <View style={styles.smallRow} key={index}>
              <View
                style={{
                  width: globalWidth("10%"),
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="dot-single" size={24} color="black" />
                <Text
                  style={[
                    styles.cardText,
                    {
                      textDecorationLine: item.done && "line-through",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  width: globalWidth("0.25%"),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  checked={item.done}
                  onPress={() => changeItemDone(index)}
                  checkedColor={Colors.button}
                  uncheckedColor="black"
                  size={globalWidth("1.3%")}
                  style={{ borderColor: "black", borderWidth: 1 }}
                />
              </View>
            </View>
          );
        })}
        {todayDate && (
          <Text style={[styles.date, { marginTop: -globalHeight("0.5%") }]}>
            {moment(todayDate)
              .format("ddd MMM. Do YYYY")
              .replace(/(\d)(st|nd|rd|th)/g, "$1$2")}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: globalHeight("22%"),
    marginVertical: 10,
    flexDirection: "row",
    paddingHorizontal: globalWidth("0.5%"),
    alignItems: "center",
    padding: globalWidth("1%"),
  },
  cardImage: {
    width: globalWidth("10%"),
    height: globalHeight("19%"),
    borderRadius: 10,
  },
  cardLeftContainer: {
    width: "35%",
    height: "100%",
    justifyContent: "center",
  },
  cardRightContainer: {
    width: "65%",
    height: "100%",
  },
  cardHeader: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
    fontWeight: "600",
  },
  cardText: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    fontWeight: "400",
  },
  date: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    fontWeight: "400",
    marginTop: globalHeight("2.5%"),
  },
  percent: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    marginBottom: globalHeight("1%"),
    textAlign: "center",
  },
  lowerContainer: {
    marginTop: globalHeight("2.5%"),
  },
  btn: {
    backgroundColor: Colors.button,
    borderRadius: 12,
    width: globalWidth("6%"),
  },
  title: {
    fontFamily: "poppins",
    fontWeight: "600",
    fontSize: globalWidth("0.8%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -globalHeight("3%"),
  },
});

export default HomeCard;
