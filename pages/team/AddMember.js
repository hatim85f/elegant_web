import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";

import { AntDesign } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";

import * as teamActions from "../../store/team/teamActions";
import * as organizationActions from "../../store/organizations/organizationsActions";

const AddMember = (props) => {
  const { theme, globalColors } = useTheme();

  const { managers } = useSelector((state) => state.team);
  const { userOrganization } = useSelector((state) => state.organizations);

  const { hideCard } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [listIsOpened, setListIsOpened] = useState(false);
  const [managerListIsOpened, setManagerListIsOpened] = useState(false);
  const [inviteIsLoading, setInviteIsLoading] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const [branchesList, setBranchesList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIsOpened, setBranchIsOpened] = useState(false);

  const roleList = [
    { label: "Manager", value: "manager" },
    { label: "Sales", value: "employee" },
  ];

  const dispatch = useDispatch();

  const submit = () => {
    setInviteIsLoading(true);

    dispatch(
      teamActions.addTeamMember(
        firstName,
        lastName,
        role,
        email,
        selectedManager,
        selectedBranch
      )
    ).then(() => {
      setFirstName("");
      setLastName("");
      setRole("");
      setEmail("");
      setInviteIsLoading(false);

      hideCard();
    });
  };

  useEffect(() => {
    dispatch(teamActions.getManagers());
    dispatch(organizationActions.getUserOrganization());
  }, [dispatch]);

  useEffect(() => {
    const userBranches = userOrganization?.branches;
    const branches = userBranches?.map((branch) => {
      return { label: branch.branchName, value: branch._id };
    });

    console.log("branches", branches);

    if (branches) {
      setBranchesList(branches);
    } else {
      setBranchesList([]);
    }
  }, [userOrganization]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressContainer} onPress={hideCard}>
        <AntDesign
          name="closecircle"
          size={globalWidth("1.5%")}
          color={globalColors.card}
        />
      </Pressable>
      <Text style={[styles.header, { color: globalColors.text }]}>
        Invite Someone to your team
      </Text>
      <View style={styles.inputsRow}>
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          rightIcon={{
            type: "font-awesome",
            name: "user",
            color: globalColors.extraCard,
            size: globalWidth("2%"),
          }}
          style={[styles.input, { color: globalColors.extraCard }]}
          inputContainerStyle={[
            { backgroundColor: globalColors.card },
            styles.inputContainer,
          ]}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          rightIcon={{
            type: "font-awesome",
            name: "user",
            color: globalColors.extraCard,
            size: globalWidth("2%"),
          }}
          style={[styles.input, { color: globalColors.extraCard }]}
          inputContainerStyle={[
            { backgroundColor: globalColors.card },
            styles.inputContainer,
          ]}
        />
      </View>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        rightIcon={{
          type: "font-awesome",
          name: "envelope",
          color: globalColors.extraCard,
          size: globalWidth("2%"),
        }}
        style={[styles.input, { color: globalColors.extraCard }]}
        inputContainerStyle={[
          { backgroundColor: globalColors.card },
          styles.mainContainer,
        ]}
      />
      <DropDownPicker
        open={listIsOpened}
        value={role}
        items={roleList}
        setOpen={setListIsOpened}
        setValue={setRole}
        setItems={setRole}
        placeholder="Select Role"
        placeholderStyle={{ color: "#6a6b6c" }}
        style={[
          {
            backgroundColor: globalColors.card,
            width: "98.5%",
            alignSelf: "center",
          },
          styles.mainContainer,
        ]}
        textStyle={styles.input}
        dropDownContainerStyle={[
          {
            backgroundColor: globalColors.card,
            width: "98.5%",
            alignSelf: "center",
            zIndex: 1,
          },
          styles.mainContainer,
        ]}
      />
      {role === "employee" && managers.length > 0 && !listIsOpened && (
        <DropDownPicker
          open={managerListIsOpened}
          value={selectedManager}
          items={managers}
          setOpen={setManagerListIsOpened}
          setValue={setSelectedManager}
          setItems={setSelectedManager}
          placeholder="Assign Manager"
          placeholderStyle={{ color: "#6a6b6c" }}
          style={[
            {
              backgroundColor: globalColors.card,
              width: "98.5%",
              alignSelf: "center",
            },
            styles.mainContainer,
          ]}
          textStyle={styles.input}
          dropDownContainerStyle={[
            {
              backgroundColor: globalColors.card,
              width: "98.5%",
              alignSelf: "center",
            },
            styles.mainContainer,
          ]}
        />
      )}
      {!listIsOpened && !managerListIsOpened && (
        <DropDownPicker
          open={branchIsOpened}
          value={selectedBranch}
          items={branchesList}
          setOpen={setBranchIsOpened}
          setValue={setSelectedBranch}
          setItems={setSelectedBranch}
          placeholder="Select Branch"
          placeholderStyle={{ color: "#6a6b6c" }}
          style={[
            {
              backgroundColor: globalColors.card,
              width: "98.5%",
              alignSelf: "center",
            },
            styles.mainContainer,
          ]}
          textStyle={styles.input}
          dropDownContainerStyle={[
            {
              backgroundColor: globalColors.card,
              width: "98.5%",
              alignSelf: "center",
            },
            styles.mainContainer,
          ]}
        />
      )}
      <Button
        title="Invite"
        buttonStyle={styles.submitButton}
        titleStyle={styles.btnTitle}
        onPress={submit}
        loading={inviteIsLoading}
        loadingStyle={{ color: globalColors.text }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: globalWidth("0.5%"),
  },
  header: {
    fontSize: globalWidth("1.5%"),
    fontFamily: "poppins",
    marginVertical: globalWidth("1%"),
    textAlign: "center",
  },
  pressContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mainContainer: {
    borderRadius: 5,
    paddingHorizontal: globalWidth("1%"),
    marginTop: globalHeight("2.5%"),
  },
  inputContainer: {
    borderRadius: 5,
    paddingHorizontal: globalWidth("1%"),
    width: "92.5%",
    alignSelf: "center",
  },
  input: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.82%"),
  },
  inputsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: globalHeight("5%"),
    paddingHorizontal: globalWidth("5%"),
  },
  submitButton: {
    backgroundColor: Colors.button,
    width: "40%",
    alignSelf: "center",
    marginTop: globalHeight("5%"),
    borderRadius: 5,
  },
});

export const AddMemberOptions = (navData) => {
  return {
    headerTitle: "AddMember",
  };
};

export default AddMember;
