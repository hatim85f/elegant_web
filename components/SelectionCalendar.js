import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";

import { useTheme } from "../context/ThemeContext";
import Colors from "../constants/Colors";
import { globalWidth } from "../constants/globalWidth";

const SelectionCalendar = (props) => {
  const { globalColors } = useTheme();

  const [selected, setSelected] = useState("");

  const { getSelectedDate } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: globalColors.background,
          shadowColor: globalColors.text,
        },
      ]}
    >
      <Text style={[styles.header, { color: globalColors.text }]}>
        Schedule a follow up date
      </Text>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          getSelectedDate(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: globalColors.text,
          },
        }}
        current={moment(new Date()).format("YYYY-MM-DD")}
        style={[styles.calendar, { backgroundColor: "#000" }]}
        theme={{
          calendarBackground: "black",
          textSectionTitleColor: "white",
          selectedDayBackgroundColor: Colors.button,
          selectedDayTextColor: globalColors.background,
          todayTextColor: Colors.button,
          backgroundColor: globalColors.extraCard,
          dayTextColor: "white",
          textDisabledColor: Colors.blue,
          textDayFontFamily: "poppins",
          textMonthFontFamily: "poppins",
          textDayHeaderFontFamily: "poppins",
          textDayFontSize: globalWidth("1.1%"),
          textMonthFontSize: globalWidth("1.5%"),
          textDayHeaderFontSize: globalWidth("0.9%"),
          arrowColor: Colors.blue,
          disabledArrowColor: Colors.button,
          monthTextColor: "#FFFFFF",
          selectedDotColor: globalColors.custom,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: globalWidth("1%"),
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: globalWidth("1.4%"),
    fontFamily: "poppins",
    marginBottom: globalWidth("1%"),
    textAlign: "center",
  },
  calendar: {
    width: "95%",
    alignSelf: "center",
  },
});

export const SelectionCalendarOptions = (navData) => {
  return {
    headerTitle: "SelectionCalendar",
  };
};

export default SelectionCalendar;
