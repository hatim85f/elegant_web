import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { useTheme } from "../context/ThemeContext";
import { globalHeight, globalWidth } from "../constants/globalWidth";

import {
  FontAwesome6,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Calendar = (props) => {
  const { theme } = useTheme();

  const numberOfDays = 21;

  const [currentDate, setCurrentDate] = useState(
    moment().format("DD MMMM YYYY")
  );
  const [startDate, setStartDate] = useState(
    moment(new Date()).subtract(10, "days")
  );
  const [daysArray, setDaysArray] = useState([]);
  const increaseCurrentDay = () => {
    const newDay = moment(currentDate).add(1, "day");
    setCurrentDate(moment(newDay).format("DD MMMM YYYY"));
  };
  const decreaseCurrentDay = () => {
    const newDay = moment(currentDate).subtract(1, "day");
    setCurrentDate(moment(newDay).format("DD MMMM YYYY"));
  };

  const deliveries = [];

  useEffect(() => {
    // Adjust startDate when currentDate exceeds daysArray range
    if (daysArray.length > 0) {
      const firstDay = moment(daysArray[0]);
      const lastDay = moment(daysArray[daysArray.length - 1]);

      if (moment(currentDate).isAfter(lastDay)) {
        setStartDate((prev) => moment(prev).add(21, "days"));
      }

      if (moment(currentDate).isBefore(firstDay)) {
        setStartDate((prev) => moment(prev).subtract(21, "days"));
      }
    }
  }, [currentDate, daysArray]);

  useEffect(() => {
    // Generate daysArray based on startDate
    const generateDays = () => {
      const days = [];
      for (let i = 0; i < numberOfDays; i++) {
        days.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
      }
      setDaysArray(days);
    };

    generateDays();
  }, [startDate]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: theme.text }]}>
          Your Delivery Schedule
        </Text>
        <View style={styles.calendarTitles}>
          <MaterialCommunityIcons
            name="calendar-today"
            size={globalWidth("1.2%")}
            color={theme.text}
          />
          <Text style={[styles.date, { color: theme.text }]}>
            {moment(currentDate).format("ddd")}{" "}
            {moment(currentDate).format("DD- MMM YY")}
          </Text>
          <Pressable onPress={increaseCurrentDay}>
            <Entypo
              name="chevron-up"
              size={globalWidth("1.2%")}
              color={theme.text}
            />
          </Pressable>
          <Pressable onPress={decreaseCurrentDay}>
            <Entypo
              name="chevron-down"
              size={globalWidth("1.2%")}
              color={theme.text}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.calendarContainer}>
        <View
          style={[
            styles.weekRow,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          {daysArray.slice(0, 7).map((day) => {
            return (
              <View
                style={[
                  styles.dayContainer,
                  {
                    borderColor:
                      moment(day).format("DD MMMM YYYY") === currentDate &&
                      Colors.button,
                    borderWidth:
                      moment(day).format("DD MMMM YYYY") === currentDate
                        ? 2
                        : 1,
                    borderRadius:
                      moment(day).format("DD MMMM YYYY") === currentDate && 10,
                  },
                ]}
              >
                <Text style={[styles.dayText, { color: "#000" }]}>
                  {moment(day).format("DD-MMM")}
                </Text>
                {deliveries
                  .filter((d) => moment(d.date).isSame(day, "day"))
                  .map((delivery) => {
                    return (
                      <View key={delivery.date} style={{ marginTop: 5 }}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {delivery.client || "Unknown Client"}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            );
          })}
          {daysArray.slice(7, 14).map((day) => {
            return (
              <View
                style={[
                  styles.dayContainer,
                  {
                    borderColor:
                      moment(day).format("DD MMMM YYYY") === currentDate &&
                      Colors.button,
                    borderWidth:
                      moment(day).format("DD MMMM YYYY") === currentDate
                        ? 2
                        : 1,
                    borderRadius:
                      moment(day).format("DD MMMM YYYY") === currentDate && 10,
                  },
                ]}
              >
                <Text style={[styles.dayText, { color: "#000" }]}>
                  {moment(day).format("DD-MMM")}
                </Text>
                {deliveries
                  .filter((d) => moment(d.date).isSame(day, "day"))
                  .map((delivery) => {
                    return (
                      <View key={delivery.date} style={{ marginTop: 5 }}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {delivery.client || "Unknown Client"}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            );
          })}
          {daysArray.slice(14, 21).map((day) => {
            return (
              <View
                style={[
                  styles.dayContainer,
                  {
                    borderColor:
                      moment(day).format("DD MMMM YYYY") === currentDate &&
                      Colors.button,
                    borderWidth:
                      moment(day).format("DD MMMM YYYY") === currentDate
                        ? 2
                        : 1,
                    borderRadius:
                      moment(day).format("DD MMMM YYYY") === currentDate && 10,
                  },
                ]}
              >
                <Text style={[styles.dayText, { color: "#000" }]}>
                  {moment(day).format("DD-MMM")}
                </Text>
                {deliveries
                  .filter((d) => moment(d.date).isSame(day, "day"))
                  .map((delivery) => {
                    return (
                      <View key={delivery.date} style={{ marginTop: 5 }}>
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {delivery.client ||
                            "There is a delivery today, please go check the details"}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    fontWeight: "600",
  },
  date: {
    fontSize: globalWidth("1%"),
    fontFamily: "poppins",
    fontWeight: "400",
    marginLeft: 5,
  },
  calendarTitles: {
    flexDirection: "row",
    alignItems: "center",
    width: globalWidth("14%"),
    justifyContent: "space-between",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
    flexWrap: "wrap",
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
  dayContainer: {
    width: "14.27%",
    height: globalHeight("11%"),
    borderColor: "black",
    borderWidth: 1,
  },
  dayText: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.8%"),
    fontWeight: "400",
    textAlign: "left",
    marginLeft: globalWidth("0.5%"),
  },
});

export const CalendarOptions = (navData) => {
  return {
    headerTitle: "Calendar",
  };
};

export default Calendar;
