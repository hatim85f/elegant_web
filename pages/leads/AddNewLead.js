import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import * as organizationActions from "../../store/organizations/organizationsActions";
import * as authActions from "../../store/auth/authActions";
import * as leadsActions from "../../store/leads/leadsActions";
import * as teamActions from "../../store/team/teamActions";

import SelectionCalendar from "../../components/SelectionCalendar";

import Colors from "../../constants/Colors";

import DropDownPicker from "react-native-dropdown-picker";

const AddNewLead = (props) => {
  const { globalColors } = useTheme();

  const { changeView } = props;

  const { userOrganization } = useSelector((state) => state.organizations);
  const { token, user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  //   =============================================GETTING USER BACK=============================================

  useEffect(() => {
    if (!token) {
      const userDetails = localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData) {
        dispatch(authActions.getUserIn(userData.user, userData.token));
      }
    }
  }, [token]);

  //   ================================================SETTING STATES======================================================

  const [isLoading, setIsLoading] = useState(false);
  const [branchesList, setBranchesList] = useState([]);
  const [branchListIsOpened, setBranchListIsOpened] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [typeListIsOpened, setTypeListIsOpened] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [source, setSource] = useState("");
  const [branch, setBranch] = useState("");
  const [sourceListIsOpened, setSourceListIsOpened] = useState(false);
  const [notes, setNotes] = useState("");
  const [scheduledFollowupDate, setScheduledFollowupDate] = useState("");
  const [reason, setReason] = useState("");
  const [teamListIsOpened, setTeamListIsOpened] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [uploadingLead, setUploadingLead] = useState(false);
  const [statusListIsOpened, setStatusListIsOpened] = useState(false);
  const [status, setStatus] = useState("pending");

  //   =======================================GETTING BRANCHS AND COMPANY DETAILS==========================================

  useEffect(() => {
    setIsLoading(true);
    dispatch(organizationActions.getUserOrganization()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  //   =========================================================GETTING TEAM LIST==============================================

  useEffect(() => {
    setIsLoading(true);
    dispatch(teamActions.getTeam()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const teamMembers = team.length > 0 ? team : [];

    const teamListData = teamMembers.map((member) => {
      return {
        label: `${member.firstName} ${member.lastName}`,
        value: member._id,
      };
    });

    setTeamList(teamListData);
  }, [team]);

  //   =================================================SUBMITTING FORM=======================================================

  const submitForm = () => {
    setUploadingLead(true);
    dispatch(
      leadsActions.addNewLead(
        name,
        type,
        email,
        phone,
        address,
        branch,
        source,
        selectedMember ? selectedMember : user._id,
        status,
        notes,
        scheduledFollowupDate
          ? new Date(scheduledFollowupDate).toISOString()
          : ""
      )
    ).then(() => {
      setUploadingLead(false);
      setName("");
      setType("");
      setEmail("");
      setPhone("");
      setAddress("");
      setSource("");
      setBranch("");
      setNotes("");
      setScheduledFollowupDate("");
      setReason("");
      setSelectedMember(null);
      changeView();
    });
  };

  //   ==================================================LISTS===============================================================

  const sourceList = [
    { label: "Walkin", value: "walkin" },
    { label: "Call", value: "call" },
    { label: "Email", value: "email" },
    { label: "Website", value: "website" },
    { label: "Referral", value: "referral" },
    { label: "Social Media", value: "socialmedia" },
    { label: "Other", value: "other" },
  ];

  const typeList = [
    { label: "Individual", value: "individual" },
    { label: "Organization", value: "organization" },
  ];

  const statusList = [
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "In Progree", value: "in progress" },
    { label: "Closed", value: "closed" },
  ];

  useEffect(() => {
    const branches = userOrganization?.branches;

    const branchesListData = branches.map((branch) => {
      return {
        label: branch.branchName,
        value: branch._id,
      };
    });

    setBranchesList(branchesListData);
  }, [userOrganization]);

  //   =====================================================RETURNING IF NO USER===================================================

  if (!token) {
    return <View />;
  }

  //   =====================================================RENDERING===============================================================

  return (
    <View style={styles.mainRow}>
      <View style={styles.leftColumn}>
        <View style={styles.innerContainer}>
          <Text style={[styles.header, { color: globalColors.text }]}>
            Leads Information
          </Text>
          <View
            style={[
              styles.dataContainer,
              {
                backgroundColor: globalColors.extraCard,
              },
            ]}
          >
            <Input
              label={() => (
                <View style={styles.labelRow}>
                  <Text
                    style={[
                      styles.label,
                      { color: "#ff0055", fontSize: globalWidth("1.5%") },
                    ]}
                  >
                    *{" "}
                  </Text>
                  <Text style={[styles.label, { color: globalColors.text }]}>
                    Name
                  </Text>
                </View>
              )}
              value={name}
              onChangeText={(text) => setName(text)}
              containerStyle={styles.inputContainer}
              inputStyle={[
                styles.input,
                { backgroundColor: globalColors.card },
              ]}
              labelStyle={[styles.label, { color: globalColors.text }]}
              placeholder="Type client Name"
              placeholderTextColor={Colors.blue}
              keyboardType="default"
              autoCapitalize="words"
            />
            <View
              style={[styles.labelRow, { paddingLeft: globalWidth("0.5%") }]}
            >
              <Text
                style={[
                  styles.label,
                  { color: "#ff0055", fontSize: globalWidth("1.5%") },
                ]}
              >
                *{" "}
              </Text>
              <Text style={[styles.label, { color: globalColors.text }]}>
                Type
              </Text>
            </View>
            <DropDownPicker
              items={typeList}
              open={typeListIsOpened}
              setOpen={setTypeListIsOpened}
              value={type}
              setValue={setType}
              setItems={setTypeListIsOpened}
              containerStyle={{
                width: "97%",
                alignSelf: "center",
              }}
              style={{
                backgroundColor: globalColors.card,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
              }}
              labelStyle={{ color: "#000" }}
              placeholderStyle={[styles.label, { color: Colors.blue }]}
              placeholder="Client Type"
              showArrowIcon
              zIndex={100}
              dropDownContainerStyle={{ zIndex: 100 }}
              dropDownDirection="TOP"
              textStyle={[styles.label, { color: "#000" }]}
            />
            <Input
              label={() => (
                <View style={styles.labelRow}>
                  <Text
                    style={[
                      styles.label,
                      { color: "#ff0055", fontSize: globalWidth("1.5%") },
                    ]}
                  >
                    *{" "}
                  </Text>
                  <Text style={[styles.label, { color: globalColors.text }]}>
                    Email
                  </Text>
                </View>
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
              containerStyle={styles.inputContainer}
              inputStyle={[
                styles.input,
                { backgroundColor: globalColors.card },
              ]}
              labelStyle={[styles.label, { color: globalColors.text }]}
              placeholder="Type client Email"
              placeholderTextColor={Colors.blue}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={() => (
                <View style={styles.labelRow}>
                  <Text
                    style={[
                      styles.label,
                      { color: "#ff0055", fontSize: globalWidth("1.5%") },
                    ]}
                  >
                    *{" "}
                  </Text>
                  <Text style={[styles.label, { color: globalColors.text }]}>
                    Phone
                  </Text>
                </View>
              )}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              containerStyle={styles.inputContainer}
              inputStyle={[
                styles.input,
                { backgroundColor: globalColors.card },
              ]}
              labelStyle={[styles.label, { color: globalColors.text }]}
              placeholder="Type client Phone"
              placeholderTextColor={Colors.blue}
              keyboardType="phone-pad"
              autoCapitalize="none"
              maxLength={13}
            />
            <Input
              label={() => (
                <View style={styles.labelRow}>
                  <Text
                    style={[
                      styles.label,
                      { color: "#ff0055", fontSize: globalWidth("1.5%") },
                    ]}
                  >
                    *{" "}
                  </Text>
                  <Text style={[styles.label, { color: globalColors.text }]}>
                    Address
                  </Text>
                </View>
              )}
              value={address}
              onChangeText={(text) => setAddress(text)}
              containerStyle={styles.inputContainer}
              inputStyle={[
                styles.input,
                { backgroundColor: globalColors.card },
              ]}
              labelStyle={[styles.label, { color: globalColors.text }]}
              placeholder="Type client Address"
              placeholderTextColor={Colors.blue}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <Text style={[styles.header, { color: globalColors.text }]}>
            Source Information
          </Text>
          <View
            style={[
              styles.dataContainer,
              {
                backgroundColor: globalColors.extraCard,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: globalColors.text,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginTop: globalHeight("0.5%"),
                },
              ]}
            >
              Source
            </Text>
            <DropDownPicker
              items={sourceList}
              open={sourceListIsOpened}
              setOpen={setSourceListIsOpened}
              value={source}
              setValue={setSource}
              setItems={setSourceListIsOpened}
              containerStyle={{
                width: "97%",
                alignSelf: "center",
              }}
              style={{
                backgroundColor: globalColors.card,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
              }}
              labelStyle={{ color: "#000" }}
              placeholderStyle={[styles.label, { color: Colors.blue }]}
              placeholder="Source"
              showArrowIcon
              zIndex={100}
              dropDownContainerStyle={{ zIndex: 100 }}
              dropDownDirection="TOP"
              textStyle={[styles.label, { color: "#000" }]}
            />
            <Text
              style={[
                styles.label,
                {
                  color: globalColors.text,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginTop: globalHeight("1%"),
                  marginBottom: -globalHeight("1%"),
                },
              ]}
            >
              Branch
            </Text>
            <DropDownPicker
              items={branchesList}
              open={branchListIsOpened}
              setOpen={setBranchListIsOpened}
              value={branch}
              setValue={setBranch}
              setItems={setBranchListIsOpened}
              containerStyle={{
                width: "97%",
                alignSelf: "center",
              }}
              style={{
                backgroundColor: globalColors.card,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                marginTop: globalHeight("2%"),
              }}
              labelStyle={{ color: "#000" }}
              placeholderStyle={[styles.label, { color: Colors.blue }]}
              placeholder="Branch"
              showArrowIcon
              zIndex={100}
              dropDownContainerStyle={{ zIndex: 100 }}
              dropDownDirection="TOP"
              textStyle={[styles.label, { color: "#000" }]}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.rightColumn,
          {
            backgroundColor: globalColors.extraCard,
          },
        ]}
      >
        <Text
          style={[
            styles.header,
            { color: globalColors.text, marginBottom: globalHeight("1%") },
          ]}
        >
          More Details
        </Text>
        <View
          style={[
            styles.rightDataContainer,
            {
              backgroundColor: globalColors.background,
              shadowColor: globalColors.text,
            },
          ]}
        >
          {user.role !== "employee" && (
            <DropDownPicker
              items={teamList}
              open={teamListIsOpened}
              setOpen={setTeamListIsOpened}
              value={selectedMember}
              setValue={setSelectedMember}
              setItems={setTeamListIsOpened}
              containerStyle={{
                width: "97%",
                alignSelf: "center",
              }}
              style={{
                backgroundColor: globalColors.card,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#000",
              }}
              labelStyle={{ color: "#000" }}
              placeholderStyle={[styles.label, { color: Colors.blue }]}
              placeholder="Assign To"
              showArrowIcon
              zIndex={100}
              dropDownContainerStyle={{ zIndex: 100 }}
              dropDownDirection="TOP"
              textStyle={[styles.label, { color: "#000" }]}
            />
          )}
          <Input
            label="Notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            containerStyle={styles.inputContainer}
            inputStyle={[styles.input, { backgroundColor: globalColors.card }]}
            labelStyle={[styles.label, { color: globalColors.text }]}
            placeholder="Type client Notes"
            placeholderTextColor={Colors.blue}
            keyboardType="default"
            autoCapitalize="none"
            multiline
            numberOfLines={6}
          />
        </View>
        <View
          style={[
            styles.rightDataContainer,
            {
              backgroundColor: globalColors.background,
              shadowColor: globalColors.text,
            },
          ]}
        >
          <Text style={[styles.label, { color: globalColors.text }]}>
            {" "}
            Status{" "}
          </Text>
          <DropDownPicker
            items={statusList}
            open={statusListIsOpened}
            setOpen={setStatusListIsOpened}
            value={status}
            setValue={setStatus}
            setItems={setStatusListIsOpened}
            containerStyle={{
              width: "97%",
              alignSelf: "center",
            }}
            style={{
              backgroundColor: globalColors.card,
              borderRadius: 0,
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: "#000",
            }}
            labelStyle={{ color: "#000" }}
            placeholderStyle={[styles.label, { color: Colors.blue }]}
            placeholder="Status"
            showArrowIcon
            zIndex={100}
            dropDownContainerStyle={{ zIndex: 100 }}
            dropDownDirection="TOP"
            textStyle={[styles.label, { color: "#000" }]}
          />
        </View>
        <SelectionCalendar
          getSelectedDate={(day) => {
            setScheduledFollowupDate(day);
          }}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.title}
          title="Save"
          onPress={submitForm}
          loading={uploadingLead}
          loadingStyle={{ color: globalColors.text }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  leftColumn: {
    width: "65%",
  },
  rightColumn: {
    width: "35%",
    paddingHorizontal: globalWidth("1.2%"),
  },
  innerContainer: {
    padding: globalWidth("1.2%"),
  },
  header: {
    fontWeight: "bold",
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
    marginLeft: globalWidth("2.5%"),
  },
  dataContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: globalWidth("1%"),
    padding: globalWidth("1%"),
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: globalHeight("1%"),
  },
  input: {
    paddingHorizontal: globalWidth("1%"),
    fontFamily: "poppins",
    color: "#000",
  },
  label: {
    marginBottom: globalHeight("0.5%"),
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  rightDataContainer: {
    padding: globalWidth("1%"),
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: globalHeight("1.5%"),
  },
  button: {
    backgroundColor: Colors.button,
    width: globalWidth("15%"),
    alignSelf: "center",
    marginTop: globalHeight("3%"),
    borderRadius: 8,
    marginBottom: globalHeight("2%"),
  },
  title: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "poppins",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export const AddNewLeadOptions = (navData) => {
  return {
    headerTitle: "AddNewLead",
  };
};

export default AddNewLead;
