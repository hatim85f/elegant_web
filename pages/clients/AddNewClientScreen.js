import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as authActions from "../../store/auth/authActions";
import * as teamActions from "../../store/team/teamActions";
import * as clientsActions from "../../store/clients/clientsActions";
import * as organizationActions from "../../store/organizations/organizationsActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";

import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

const AddNewClientScreen = (props) => {
  const { globalColors } = useTheme();

  const { inActiveClients, activeClients } = useSelector(
    (state) => state.clients
  );
  const { team } = useSelector((state) => state.team);
  const { token, user } = useSelector((state) => state.auth);
  const { userOrganization } = useSelector((state) => state.organizations);
  // ================================================GETTING USER BACK FROM REDUX====================================

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // ==================================================SETTING STATES==================================================

  const [isLoading, setIsLoading] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [cleintIndustry, setCleintIndustry] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectBudget, setProjectBudget] = useState(0);

  const [clientTypeListIsOpened, setClientTypeListIsOpened] = useState(false);
  const [contactListIsOpened, setContactListIsOpened] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [teamListIsOpened, setTeamListIsOpened] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const [branchesList, setBranchesList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIsOpened, setBranchIsOpened] = useState(false);

  // ==================================================LISTS FOR THE DROPDOWN==================================================

  const clientTypeList = [
    { label: "Individual", value: "individual" },
    { label: "Organization", value: "organization" },
  ];

  const contactList = [
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "SMS", value: "sms" },
  ];

  // ============================================CHECKING IF CLIENT IS UPDATING ===========================================

  const clientId = props.route.params;
  const fullClientsList = [...inActiveClients, ...activeClients];

  useEffect(() => {
    if (clientId) {
      const client = fullClientsList.find(
        (client) => client._id === clientId.clientId
      );

      setClientName(client?.clientName);
      setClientType(client?.type ? client?.type : "individual");
      setClientEmail(client?.clientEmail);
      setClientPhone(client?.clientPhone);
      setClientAddress(client?.address ? client?.address : "");
      setCleintIndustry(client?.industry ? client?.industry : "");
      setClientNotes(client?.notes ? client?.notes : "");
      setPreferredContactMethod(
        client?.preferredContactMethod
          ? client?.preferredContactMethod
          : "email"
      );
    }
  }, [clientId]);

  // ==================================================GETTING TEAM BACK FROM REDUX============================================

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(teamActions.getTeam());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      const teamList = team?.map((member) => {
        return {
          label: `${member.firstName} ${member.lastName}`,
          value: member._id,
        };
      });

      setTeamList(teamList);
    }
  }, [team]);

  // ===========================================================REFS=========================================================

  const clientNameRef = useRef();
  const clientTypeRef = useRef();
  const clientEmailRef = useRef();
  const clientPhoneRef = useRef();
  const clientAddressRef = useRef();
  const clientIndustryRef = useRef();
  const clientNotesRef = useRef();
  const preferredContactMethodRef = useRef();

  // ==================================================SUBMISSION HANDLERS==================================================

  const submitHandler = () => {
    setIsLoading(true);

    dispatch(
      clientsActions.updateClient(
        clientName,
        clientType,
        clientEmail,
        clientPhone,
        clientAddress,
        cleintIndustry,
        clientNotes,
        selectedTeamMember,
        preferredContactMethod,
        projectName,
        projectDescription,
        projectDeadline,
        +projectBudget,
        clientId ? clientId.clientId : "No Client ID",
        selectedBranch
      )
    ).then(() => {
      setClientName("");
      setClientType("");
      setClientEmail("");
      setClientPhone("");
      setClientAddress("");
      setCleintIndustry("");
      setClientNotes("");
      setPreferredContactMethod("");
      setProjectName("");
      setProjectDescription("");
      setProjectDeadline("");
      setProjectBudget(0);
      setSelectedTeamMember(null);

      setIsLoading(false);
    });
  };

  useEffect(() => {
    dispatch(organizationActions.getUserOrganization());
  }, [dispatch]);

  useEffect(() => {
    const userBranches = userOrganization.branches;
    const branches = userBranches.map((branch) => {
      return { label: branch.branchName, value: branch._id };
    });

    setBranchesList(branches);
  }, [userOrganization]);

  // ==================================================RETURN STATEMENT==================================================

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen
        pageTitle="Add New Client"
        navigation={props.navigation}
      >
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: globalColors.card },
            ]}
          >
            <Text style={[styles.header]}>Client Details</Text>
            <View style={styles.smallRow}>
              <Input
                label="Client Name"
                value={clientName}
                onChangeText={(text) => setClientName(text)}
                containerStyle={styles.inputContainer}
                style={styles.input}
                labelStyle={styles.label}
                rightIcon={{
                  type: "font-awesome",
                  name: "user",
                  marginLeft: 10,
                }}
                onEndEditing={() => clientEmailRef.current.focus()}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
              <Input
                label="Client Email"
                value={clientEmail}
                onChangeText={(text) => setClientEmail(text)}
                containerStyle={styles.inputContainer}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientEmailRef}
                rightIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
            </View>
            <View style={styles.smallRow}>
              <DropDownPicker
                items={clientTypeList}
                open={clientTypeListIsOpened}
                setOpen={setClientTypeListIsOpened}
                value={clientType}
                setValue={setClientType}
                setItems={setClientTypeListIsOpened}
                containerStyle={{
                  width: globalWidth("21%"),
                  alignSelf: "center",
                }}
                style={{
                  backgroundColor: "#000",
                  borderColor: globalColors.card,
                }}
                labelStyle={{ color: "#fff" }}
                placeholderStyle={[styles.label, { color: "#fff" }]}
                placeholder="Client Type"
                showArrowIcon
                zIndex={100}
                dropDownContainerStyle={{ zIndex: 100 }}
                dropDownDirection="TOP"
                textStyle={[styles.label, { color: "#000" }]}
              />
              <DropDownPicker
                items={contactList}
                open={contactListIsOpened}
                setOpen={setContactListIsOpened}
                value={preferredContactMethod}
                setValue={setPreferredContactMethod}
                setItems={setContactListIsOpened}
                containerStyle={{
                  width: globalWidth("21%"),
                  alignSelf: "center",
                }}
                style={{
                  backgroundColor: "#000",
                  borderColor: globalColors.card,
                }}
                labelStyle={{ color: "#fff" }}
                placeholderStyle={[styles.label, { color: "#fff" }]}
                placeholder="Preferred Contact Method"
                showArrowIcon
                zIndex={100}
                dropDownContainerStyle={{ zIndex: 100 }}
                dropDownDirection="TOP"
                textStyle={[styles.label, { color: "#000" }]}
              />
              <DropDownPicker
                items={branchesList}
                open={branchIsOpened}
                setOpen={setBranchIsOpened}
                value={selectedBranch}
                setValue={setSelectedBranch}
                setItems={setBranchIsOpened}
                containerStyle={{
                  width: globalWidth("21%"),
                  alignSelf: "center",
                }}
                style={{
                  backgroundColor: "#000",
                  borderColor: globalColors.card,
                }}
                labelStyle={{ color: "#fff" }}
                placeholderStyle={[styles.label, { color: "#fff" }]}
                placeholder="Branch of the Customer"
                showArrowIcon
                zIndex={100}
                dropDownContainerStyle={{ zIndex: 100 }}
                dropDownDirection="TOP"
                textStyle={[styles.label, { color: "#000" }]}
              />
            </View>
            <View style={[styles.smallRow, { marginTop: globalHeight("1%") }]}>
              <Input
                label="Client Phone"
                value={clientPhone}
                onChangeText={(text) => setClientPhone(text)}
                containerStyle={styles.inputContainer}
                maxLength={13}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientPhoneRef}
                onEndEditing={() => clientAddressRef.current.focus()}
                rightIcon={{
                  type: "font-awesome",
                  name: "phone",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
              <Input
                label="Client Address"
                value={clientAddress}
                onChangeText={(text) => setClientAddress(text)}
                containerStyle={styles.inputContainer}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientAddressRef}
                onEndEditing={() => clientIndustryRef.current.focus()}
                rightIcon={{
                  type: "font-awesome",
                  name: "map",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
            </View>
            <View style={[styles.smallRow, { marginTop: globalHeight("1%") }]}>
              <Input
                label="Client Industry"
                value={cleintIndustry}
                onChangeText={(text) => setCleintIndustry(text)}
                containerStyle={styles.inputContainer}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientIndustryRef}
                onEndEditing={() => clientNotesRef.current.focus()}
                rightIcon={{
                  type: "font-awesome",
                  name: "industry",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
              <Input
                label="Client Notes"
                value={clientNotes}
                onChangeText={(text) => setClientNotes(text)}
                containerStyle={styles.inputContainer}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientNotesRef}
                rightIcon={{
                  type: "font-awesome",
                  name: "sticky-note",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
            </View>
          </View>
          <View
            style={[
              styles.cardContainer,
              { backgroundColor: globalColors.card },
            ]}
          >
            <Text style={[styles.header]}>Project Details</Text>
            <View style={styles.smallRow}>
              <Input
                label="Project Name"
                value={projectName}
                onChangeText={(text) => setProjectName(text)}
                containerStyle={[styles.inputContainer, { width: "25%" }]}
                style={styles.input}
                labelStyle={styles.label}
                rightIcon={{
                  type: "font-awesome",
                  name: "user",
                  marginLeft: 10,
                }}
                onEndEditing={() => clientEmailRef.current.focus()}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
              <Input
                label="Project Deadline"
                placeholder="MM/DD/YYYY"
                placeholderTextColor={Colors.blue}
                value={projectDeadline}
                onChangeText={(text) => setProjectDeadline(text)}
                containerStyle={[styles.inputContainer, { width: "25%" }]}
                style={styles.input}
                labelStyle={styles.label}
                ref={clientEmailRef}
                rightIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
              <Input
                label="Project Budget"
                value={projectBudget}
                onChangeText={(text) => setProjectBudget(text)}
                containerStyle={[styles.inputContainer, { width: "25%" }]}
                style={styles.input}
                labelStyle={styles.label}
                rightIcon={{
                  type: "font-awesome",
                  name: "dollar",
                  marginLeft: 10,
                }}
                rightIconContainerStyle={{ marginLeft: 10 }}
              />
            </View>
            <Input
              label="Project Description"
              value={projectDescription}
              onChangeText={(text) => setProjectDescription(text)}
              containerStyle={[
                styles.inputContainer,
                { width: "95%", alignSelf: "center" },
              ]}
              style={styles.input}
              labelStyle={styles.label}
              multiline
              numberOfLines={4}
            />
          </View>
          {user.role !== "employee" && (
            <View
              style={[
                styles.cardContainer,
                { backgroundColor: globalColors.card },
              ]}
            >
              <Text style={[styles.header]}>Assign To</Text>
              <DropDownPicker
                items={teamList}
                open={teamListIsOpened}
                setOpen={setTeamListIsOpened}
                value={selectedTeamMember}
                setValue={setSelectedTeamMember}
                setItems={setTeamListIsOpened}
                containerStyle={{
                  width: globalWidth("35%"),
                  alignSelf: "center",
                }}
                style={{
                  backgroundColor: "#000",
                  borderColor: globalColors.card,
                }}
                placeholderStyle={[styles.label, { color: "#fff" }]}
                labelStyle={{ color: "#fff" }}
                placeholder="Assign To"
                showArrowIcon
                zIndex={100}
                dropDownContainerStyle={{ zIndex: 100 }}
                dropDownDirection="TOP"
                textStyle={[styles.label, { color: "#000" }]}
              />
            </View>
          )}
          <Button
            buttonStyle={styles.button}
            title="Submit"
            onPress={submitHandler}
            titleStyle={styles.titleStyle}
            loading={isLoading}
            loadingStyle={{ color: globalColors.background }}
          />
        </ScrollView>
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    marginBottom: globalHeight("1%"),
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: globalWidth("80%"),
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#000",
    marginVertical: globalHeight("2%"),
    padding: globalWidth("1%"),
  },
  label: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    marginBottom: globalHeight("0.5%"),
    color: "#000",
  },
  inputContainer: {
    overflow: "hidden",
    width: "45%",
    marginBottom: globalHeight("1%"),
  },
  input: {
    backgroundColor: "#000",
    borderRadius: 8,
    color: "#fff",
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    paddingHorizontal: globalWidth("1%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("80%"),
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.button,
    marginBottom: globalHeight("2%"),
    width: "30%",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export const AddNewClientScreenOptions = (navData) => {
  return {
    headerTitle: "AddNewClientScreen",
  };
};

export default AddNewClientScreen;
