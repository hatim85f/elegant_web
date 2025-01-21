import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as teamsActions from "../../store/team/teamActions";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-web";

const TeamMemberScreen = (props) => {
  const { globalColors } = useTheme();

  const { memberId } = props.route.params;

  const { team } = useSelector((state) => state.team);

  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const member = team.find((member) => member._id === memberId);
    setSelectedMember(member);
  }, [team, memberId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(teamsActions.getTeam());
  }, [dispatch, memberId]);

  const scrollViewRef = useRef(null);

  const scrollLeft = () => {
    scrollViewRef.current.scrollTo({ x: -200, animated: true }); // Scroll left by 200px
  };

  const scrollRight = () => {
    scrollViewRef.current.scrollTo({ x: 200, animated: true }); // Scroll right by 200px
  };

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen
        navigation={props.navigation}
        pageTitle={`${selectedMember?.firstName?.charAt(0)}. ${
          selectedMember?.lastName
        }`}
      >
        <View style={{ padding: 15 }}>
          <View
            style={[
              styles.upperContainer,
              {
                backgroundColor:
                  globalColors.background === "#212121"
                    ? "#272727"
                    : globalColors.card,
              },
            ]}
          >
            <View style={styles.dataContainer}>
              <Avatar
                source={{ uri: selectedMember?.avatar }}
                size="xlarge"
                rounded
              />
              <Text style={[styles.header, { color: globalColors.text }]}>
                {selectedMember?.firstName} {selectedMember?.lastName}{" "}
              </Text>
              <Text style={[styles.header, { color: globalColors.text }]}>
                Role : {selectedMember?.role}{" "}
              </Text>
              <Text style={[styles.header, { color: globalColors.text }]}>
                Team Members : {selectedMember?.teamMembers}{" "}
              </Text>
              <Text style={[styles.header, { color: globalColors.text }]}>
                Customers Managed : {selectedMember?.customersNumber}{" "}
              </Text>
              <Button
                buttonStyle={styles.editMemberBtn}
                titleStyle={styles.btnTitle}
                title="Edit Member Data"
                onPress={() => {}}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={[styles.header, { color: globalColors.text }]}>
                {selectedMember?.officeLocation}
              </Text>
              <Text style={[styles.header, { color: globalColors.text }]}>
                {selectedMember?.email}
              </Text>
              <Text style={[styles.header, { color: globalColors.text }]}>
                {selectedMember?.phone}
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                backgroundColor:
                  globalColors.background === "#212121"
                    ? "#272727"
                    : globalColors.card,
              },
              styles.middle,
            ]}
          >
            <Text
              style={[
                styles.header,
                { color: globalColors.text, marginBottom: 10 },
              ]}
            >
              Team Members
            </Text>
            <View style={[styles.middleContainer]}>
              <Pressable style={styles.arrowButton} onPress={scrollLeft}>
                <Text style={styles.arrowText}>{"<"}</Text>
              </Pressable>
              <ScrollView
                horizontal
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {selectedMember?.subTeam.map((member, index) => {
                  return (
                    <View
                      style={[
                        styles.memberContainer,
                        { backgroundColor: globalColors.background },
                      ]}
                      key={index}
                    >
                      <Avatar
                        source={{ uri: member.avatar }}
                        size="large"
                        rounded
                      />
                      <View style={{ height: 10 }} />
                      <Text
                        style={[styles.subHeader, { color: globalColors.text }]}
                      >
                        {member.firstName} {member.lastName}{" "}
                      </Text>
                      <Text
                        style={[styles.subHeader, { color: globalColors.text }]}
                      >
                        Role: {member.role}
                      </Text>
                      <Text
                        style={[styles.subHeader, { color: globalColors.text }]}
                      >
                        Office Location: {member.officeLocation}
                      </Text>
                      <Text
                        style={[styles.subHeader, { color: globalColors.text }]}
                      >
                        Customers Managed: {member.customersNumber}
                      </Text>
                      <Button
                        buttonStyle={styles.taskBtn}
                        titleStyle={[
                          styles.btnTitle,
                          { fontSize: globalWidth("0.8%") },
                        ]}
                        title="Assign Task"
                      />
                    </View>
                  );
                })}
              </ScrollView>
              <Pressable style={styles.arrowButton} onPress={scrollRight}>
                <Text style={styles.arrowText}>{">"}</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={[
              styles.middle,
              {
                backgroundColor:
                  globalColors.background === "#212121"
                    ? "#272727"
                    : globalColors.card,
              },
            ]}
          >
            <Text
              style={[
                styles.header,
                { color: globalColors.text, marginTop: 20 },
              ]}
            >
              Team Actions
            </Text>
            <View style={styles.lowerBtnContainer}>
              <Button
                title="Add Member"
                buttonStyle={styles.lowerMemberBtn}
                titleStyle={[
                  styles.btnTitle,
                  { fontSize: globalWidth("0.8%") },
                ]}
                icon={{
                  name: "add",
                  size: 20,
                  color: "white",
                }}
              />
              <Button
                title="Message Team"
                buttonStyle={styles.lowerMemberBtn}
                titleStyle={[
                  styles.btnTitle,
                  { fontSize: globalWidth("0.8%") },
                ]}
                icon={{ name: "message", size: 20, color: "white" }}
              />
              <Button
                title="Generate Team Report"
                buttonStyle={styles.lowerMemberBtn}
                titleStyle={[
                  styles.btnTitle,
                  { fontSize: globalWidth("0.8%") },
                ]}
                icon={{ name: "folder", size: 20, color: "white" }}
              />
            </View>
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
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: globalWidth("5%"),
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  header: {
    fontSize: globalWidth("1.0%"),
    fontFamily: "poppins",
  },
  editMemberBtn: {
    backgroundColor: Colors.button,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  middle: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberContainer: {
    width: globalWidth("20%"),
    backgroundColor: "red",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  subHeader: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "poppins",
    textAlign: "center",
  },
  taskBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  arrowButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
  },
  arrowText: {
    color: "#fff",
    fontSize: globalWidth("1.5%"),
  },
  btnTitle: {
    fontSize: globalWidth("1.0%"),
    fontFamily: "poppins",
  },
  lowerBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  lowerMemberBtn: {
    width: globalWidth("16%"),
    backgroundColor: "black",
    borderRadius: 5,
  },
});

export const TeamMemberScreenOptions = (navData) => {
  const memberId = navData.route.params.memberId;
  return {
    headerTitle: "TeamMemberScreen",
  };
};

export default TeamMemberScreen;
