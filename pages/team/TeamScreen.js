import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import LeftContainerContent from "../holderScreens/LeftContainerContent";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as authActions from "../../store/auth/authActions";
import Card from "../../components/Card";

import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";
import AddMember from "./AddMember";

import * as teamsActions from "../../store/team/teamActions";
import Loader from "../../components/Loader";

const TeamScreen = (props) => {
  const { theme, globalColors } = useTheme();

  const { token, user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(teamsActions.getTeam()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const menuScale = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(
    new Animated.Value(-globalHeight("100%"))
  ).current;

  const showMenu = (member) => {
    setSelectedMember(member);

    Animated.timing(menuScale, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
      easing: Easing.elastic(1.5),
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(menuScale, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setSelectedMember(null);
  };

  const showCard = () => {
    Animated.timing(containerHeight, {
      toValue: 0,
      duration: 650,
      useNativeDriver: true,
      easing: Easing.elastic(1.5),
    }).start();
  };
  const hideCard = () => {
    Animated.timing(containerHeight, {
      toValue: -globalHeight("100%"),
      duration: 650,
      useNativeDriver: true,
      easing: Easing.elastic(1.5),
    }).start();
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <Loader
        loadingMessage="Loading team members"
        loadingColor={globalColors.text}
        containerColor={globalColors.background}
      />
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen navigation={props.navigation} pageTitle="Team">
        <View
          style={[
            styles.topContainer,
            { backgroundColor: globalColors.extraCard },
          ]}
        >
          <Button
            title="Add Team Member"
            buttonStyle={styles.topBtn}
            titleStyle={{ color: globalColors.text }}
            onPress={showCard}
          />
        </View>
        <View style={styles.containerRow}>
          {team.length > 0 ? (
            team.map((member, index) => {
              return (
                <Card
                  key={index}
                  style={[
                    styles.memberContainer,
                    { backgroundColor: globalColors.card },
                  ]}
                >
                  {member && (
                    <Avatar
                      source={{ uri: member.avatar }}
                      rounded
                      avatarStyle={styles.avatar}
                      size={globalWidth("5%")}
                    />
                  )}
                  {member && (
                    <Text style={[styles.text]}>
                      {member.firstName} {member.lastName}
                    </Text>
                  )}
                  {member && (
                    <Text style={[styles.dataText]}>{member.role}</Text>
                  )}
                  {member && (
                    <Text style={[styles.dataText]}>
                      {member.officeLocation}
                    </Text>
                  )}
                  <Button
                    buttonStyle={[
                      styles.lowerBtn,
                      { backgroundColor: globalColors.custom },
                    ]}
                    title="View Member"
                    titleStyle={{ color: "#fff" }}
                    onPress={() => {
                      setCurrentIndex(currentIndex == index ? null : index);

                      showMenu(member);
                    }}
                  />
                  {currentIndex === index && (
                    <Animated.View
                      style={[
                        styles.listContainer,
                        {
                          backgroundColor: globalColors.extraCard,
                          transform: [
                            {
                              scale: menuScale,
                            },
                          ],
                        },
                      ]}
                    >
                      <Pressable onPress={hideMenu} style={styles.pressableBtn}>
                        <AntDesign
                          name="closecircle"
                          size={globalWidth("1.7%")}
                          color={globalColors.custom}
                        />
                      </Pressable>
                      <Pressable
                        style={[
                          styles.listRow,
                          {
                            backgroundColor: globalColors.card,
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate("team_member", {
                            memberId: member._id,
                          })
                        }
                      >
                        <FontAwesome5
                          name="people-arrows"
                          size={globalWidth("1.2%")}
                          color="#000"
                        />
                        <Text style={[styles.dataText, { color: "#000" }]}>
                          Team
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {}}
                        style={[
                          styles.listRow,
                          { backgroundColor: globalColors.card },
                        ]}
                      >
                        <FontAwesome5
                          name="users"
                          size={globalWidth("1.2%")}
                          color="#000"
                        />
                        <Text style={[styles.dataText, { color: "#000" }]}>
                          Customers
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.listRow,
                          { backgroundColor: globalColors.card },
                        ]}
                        onPress={() => {}}
                      >
                        <Entypo
                          name="message"
                          size={globalWidth("1.2%")}
                          color="#000"
                        />
                        <Text style={[styles.dataText, { color: "#000" }]}>
                          Message
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.listRow,
                          { backgroundColor: globalColors.card },
                        ]}
                        onPress={() => {}}
                      >
                        <MaterialIcons
                          name="assignment"
                          size={globalWidth("1.2%")}
                          color="#000"
                        />
                        <Text style={[styles.dataText, { color: "#000" }]}>
                          Assign Task
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.listRow,
                          { backgroundColor: globalColors.card },
                        ]}
                        onPress={() => {}}
                      >
                        <MaterialIcons
                          name="delete"
                          size={globalWidth("1.2%")}
                          color="#000"
                        />
                        <Text style={[styles.dataText, { color: "#000" }]}>
                          Remove
                        </Text>
                      </Pressable>
                    </Animated.View>
                  )}
                </Card>
              );
            })
          ) : (
            <View style={styles.noContainer}>
              <Text style={[styles.noText, { color: globalColors.text }]}>
                No team members
              </Text>
            </View>
          )}
        </View>
        <Animated.View
          style={[
            styles.addMemberContainer,
            {
              transform: [{ translateY: containerHeight }],
              backgroundColor: globalColors.extraCard,
            },
          ]}
        >
          <AddMember hideCard={hideCard} />
        </Animated.View>
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  topBtn: {
    backgroundColor: Colors.button,
    padding: 10,
    borderRadius: 5,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  memberContainer: {
    width: globalWidth("28%"),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: globalHeight("1%"),
    padding: globalHeight("1%"),
    borderRadius: 5,
    marginHorizontal: globalWidth("0.5%"),
  },
  avatar: {
    height: globalWidth("5%"),
    width: globalWidth("5%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  text: {
    color: Colors.blackText,
    fontSize: globalWidth("1.1%"),
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: globalWidth("1%"),
    fontFamily: "poppins",
    marginTop: globalHeight("1%"),
  },
  dataText: {
    color: Colors.blackText,
    fontSize: globalWidth("1%"),
    textAlign: "center",
    marginLeft: globalWidth("1%"),
    fontFamily: "poppins",
  },
  noContainer: {
    flex: 1,
    height: globalHeight("50%"),
    justifyContent: "center",
    alignItems: "center",
  },
  noText: {
    fontSize: globalWidth("1.5%"),
    fontFamily: "poppins",
  },
  lowerBtn: {
    width: globalWidth("10%"),
    marginTop: globalHeight("1.5%"),
    borderRadius: 5,
  },
  listContainer: {
    position: "absolute",
    width: globalWidth("12%"),
    height: globalHeight("30%"),
    zIndex: 1,
    borderRadius: 5,
    borderColor: Colors.blue,
    borderWidth: 2.5,
    overflow: "hidden",
  },
  pressableBtn: {
    alignItems: "flex-end",
    padding: 5,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: globalWidth("1%"),
    marginTop: globalHeight("1%"),
    borderBottomColor: Colors.blue,
    borderBottomWidth: 1,
    paddingBottom: globalHeight("0.5%"),
    height: globalHeight("4%"),
  },
  addMemberContainer: {
    width: globalWidth("60%"),
    height: globalHeight("60%"),
    position: "absolute",
    borderRadius: 10,
    shadowColor: Colors.blackText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.button,
    left: 15,
  },
});

export const TeamScreenOptions = (navData) => {
  return {
    headerTitle: "TeamScreen",
  };
};

export default TeamScreen;
