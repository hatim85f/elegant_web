import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as clientsActions from "../../store/clients/clientsActions";

import * as organizationActions from "../../store/organizations/organizationsActions";
import DropDownPicker from "react-native-dropdown-picker";

const AddingClients = (props) => {
  const { toggleAddClient } = props;

  const { userOrganization } = useSelector((state) => state.organizations);

  const { theme, globalColors } = useTheme();

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientIsLoading, setClientIsLoading] = useState(false);
  const [numberIsMobile, setNumberIsMobile] = useState(false);

  const [branchesList, setBranchesList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIsOpened, setBranchIsOpened] = useState(false);

  const closeModal = () => {
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    toggleAddClient();
  };

  const dispatch = useDispatch();

  const submitAddClient = () => {
    setClientIsLoading(true);
    dispatch(
      clientsActions.addShortClient(
        clientName,
        clientEmail,
        clientPhone,
        selectedBranch
      )
    ).then(() => {
      setClientIsLoading(false);
    });
    toggleAddClient();
    closeModal();
  };

  useEffect(() => {
    dispatch(organizationActions.getUserOrganization());
  }, [dispatch]);

  useEffect(() => {
    const userBranches = userOrganization?.branches;
    const branches = userBranches?.map((branch) => {
      return { label: branch.branchName, value: branch._id };
    });

    setBranchesList(branches);
  }, [userOrganization]);

  return (
    <View style={styles.container}>
      <Pressable onPress={closeModal} style={styles.closeBtn}>
        <AntDesign
          name="closecircle"
          size={globalWidth("1.8%")}
          color={Colors.button}
        />
      </Pressable>
      <Text style={[styles.header, { color: theme.text }]}>
        Add Client to be Distributed to the team
      </Text>
      <Input
        placeholder="Client Name"
        value={clientName}
        onChangeText={(text) => setClientName(text)}
        inputStyle={[styles.inputContainer]}
        containerStyle={[{ backgroundColor: theme.text }, styles.input]}
        style={[styles.inputStyles, { color: theme.background }]}
        placeholderTextColor={Colors.blue}
        rightIcon={
          <FontAwesome
            name="users"
            size={globalWidth("1.6%")}
            color={theme.backgroundColor}
          />
        }
      />
      <Input
        placeholder="Client Email"
        value={clientEmail}
        onChangeText={(text) => setClientEmail(text)}
        inputStyle={[styles.inputContainer]}
        containerStyle={[{ backgroundColor: theme.text }, styles.input]}
        style={[styles.inputStyles, { color: theme.background }]}
        placeholderTextColor={Colors.blue}
        rightIcon={
          <FontAwesome
            name="envelope"
            size={globalWidth("1.6%")}
            color={theme.backgroundColor}
          />
        }
      />
      <View style={styles.checksRow}>
        <View style={styles.checkContainer}>
          <Text style={[styles.checkText, { color: theme.text }]}>Mobile</Text>
          <CheckBox
            checked={numberIsMobile}
            onPress={() => setNumberIsMobile(!numberIsMobile)}
            checkedColor={Colors.button}
            uncheckedColor={theme.background}
          />
        </View>
        <View style={styles.checkContainer}>
          <Text style={[styles.checkText, { color: theme.text }]}>
            Landline
          </Text>
          <CheckBox
            checked={!numberIsMobile}
            onPress={() => setNumberIsMobile(!numberIsMobile)}
            checkedColor={Colors.button}
            uncheckedColor={theme.background}
          />
        </View>
      </View>
      <Input
        placeholder="Client Phone e.g +971 50 123 4567"
        value={clientPhone}
        maxLength={numberIsMobile ? 13 : 12}
        onChangeText={(text) => setClientPhone(text)}
        inputStyle={[styles.inputContainer]}
        containerStyle={[{ backgroundColor: theme.text }, styles.input]}
        style={[styles.inputStyles, { color: theme.background }]}
        placeholderTextColor={Colors.blue}
        rightIcon={
          <FontAwesome
            name="phone"
            size={globalWidth("1.6%")}
            color={theme.backgroundColor}
          />
        }
      />
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
            backgroundColor: globalColors.text,
            marginTop: globalWidth("2.5%"),
            alignSelf: "center",
          },
          styles.mainContainer,
        ]}
        textStyle={styles.inputText}
        dropDownContainerStyle={[
          {
            backgroundColor: globalColors.text,

            alignSelf: "center",
          },
          styles.mainContainer,
        ]}
      />
      <Button
        title="Add Client"
        buttonStyle={[
          {
            backgroundColor: Colors.button,
          },
          styles.button,
        ]}
        loading={clientIsLoading}
        loadingStyle={{ color: theme.background }}
        titleStyle={[styles.buttonText, { color: theme.text }]}
        onPress={submitAddClient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.6%"),
    textAlign: "center",
  },

  closeBtn: {
    alignSelf: "flex-end",
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: globalWidth("2%"),
    marginTop: globalWidth("1%"),
  },
  inputStyles: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
  button: {
    width: "50%",
    alignSelf: "center",
    marginTop: globalWidth("2%"),
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
  checksRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    alignSelf: "center",
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
});

export const AddingClientsOptions = (navData) => {
  return {
    headerTitle: "AddingClients",
  };
};

export default AddingClients;
