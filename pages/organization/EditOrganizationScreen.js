import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";

import useImageUpload from "../../hooks/useImageUploads";

import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";

import * as authActions from "../../store/auth/authActions";
import * as organizationActions from "../../store/organizations/organizationsActions";
import * as teamActions from "../../store/team/teamActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import MainHolderScreen from "../holderScreens/MainHolderScreen";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

const EditOrganizationScreen = (props) => {
  const { globalColors } = useTheme();

  const { userOrganization } = useSelector((state) => state.organizations);
  const { managers } = useSelector((state) => state.team);

  const { token, user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [editIsLoading, setEditIsLoading] = useState(false);

  const [organizationName, setOrganizationName] = useState(
    userOrganization?.name
  );
  const [logo, setLogo] = useState(userOrganization?.logo);
  const [industry, setIndustry] = useState(userOrganization?.industry);
  const [branches, setBranches] = useState(
    userOrganization.branches
      ? userOrganization.branches.map((branch) => ({
          ...branch,
          dropdownOpen: false, // Initialize dropdown state for each branch
        }))
      : []
  );
  const [webstite, setWebstite] = useState(userOrganization?.webstite);
  const [address, setAddress] = useState(userOrganization?.address);

  const [managerListIsOpened, setManagerListIsOpened] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");

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
    dispatch(organizationActions.getUserOrganization()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const { pickAndUploadImage, imageUrl, progress } = useImageUpload(
    `${userOrganization.name?.trim()}-image.jpg`,
    `${userOrganization.name?.trim()}-image/images`
  );

  const changeCompanyLogo = async () => {
    const url = await pickAndUploadImage();
    if (url) {
      setLogo(url);
    }
  };

  const addNewBranch = () => {
    let newBranches = [...branches];
    newBranches.push({
      branchName: "",
      branchLocation: "",
      branchLocation: "",
      branchEmail: "",
      branchManager: "",
    });

    setBranches(newBranches);
  };

  const removeBranch = (index) => {
    let newBranches = [...branches];
    newBranches.splice(index, 1);

    setBranches(newBranches);
  };

  const changeBranch = (index, key, value) => {
    let newBranches = [...branches];
    newBranches[index][key] = value;

    setBranches(newBranches);
  };

  useEffect(() => {
    dispatch(teamActions.getManagers());
  }, [dispatch]);

  const updadeOrganization = () => {
    setEditIsLoading(true);
    dispatch(
      organizationActions.editOrganization(
        userOrganization._id,
        organizationName,
        industry,
        webstite,
        logo,
        branches,
        address
      )
    ).then(() => {
      setEditIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: globalColors.background,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader loadingMessage="Loading..." loadingColor={globalColors.text} />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen
        pageTitle="Edit Organization"
        navigation={props.navigation}
      >
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.editContainer]}>
              <Input
                placeholder="Organization Name"
                value={organizationName}
                onChangeText={(text) => setOrganizationName(text)}
                inputContainerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.text },
                ]}
                style={styles.input}
                rightIcon={{
                  type: "font-awesome",
                  name: "building",
                  color: globalColors.extraCard,
                }}
                placeholderTextColor={globalColors.extraCard}
                label="Organization Name"
                labelStyle={[{ color: globalColors.text }, styles.label]}
              />
              <Input
                placeholder="Industry"
                value={industry}
                onChangeText={(text) => setIndustry(text)}
                inputContainerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.text },
                ]}
                style={styles.input}
                rightIcon={{
                  type: "font-awesome",
                  name: "industry",
                  color: globalColors.extraCard,
                }}
                placeholderTextColor={globalColors.extraCard}
                label="Industry"
                labelStyle={[{ color: globalColors.text }, styles.label]}
              />
              <Text
                style={[
                  styles.label,
                  { color: globalColors.text, marginLeft: globalWidth("0.5%") },
                ]}
              >
                Company Logo
              </Text>
              <Pressable
                onPress={changeCompanyLogo}
                style={[
                  {
                    backgroundColor: globalColors.text,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  },
                  styles.uploadButton,
                ]}
              >
                <View
                  style={{
                    width: "50%",
                    paddingLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Change Company Logo</Text>
                </View>
                <View
                  style={{
                    width: "50%",

                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingRight: 10,
                  }}
                >
                  <AntDesign
                    name="upload"
                    size={globalWidth("1.5%")}
                    color="black"
                  />
                </View>
              </Pressable>
              <Input
                placeholder="Website"
                value={webstite}
                onChangeText={(text) => setWebstite(text)}
                inputContainerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.text },
                ]}
                style={styles.input}
                rightIcon={{
                  type: "font-awesome",
                  name: "globe",
                  color: globalColors.extraCard,
                }}
                placeholderTextColor={globalColors.extraCard}
                label="Website"
                labelStyle={[{ color: globalColors.text }, styles.label]}
              />
              <Input
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
                inputContainerStyle={[
                  styles.inputContainer,
                  { backgroundColor: globalColors.text },
                ]}
                style={[styles.input, { color: globalColors.background }]}
                rightIcon={{
                  type: "entypo",
                  name: "location",
                  color: globalColors.extraCard,
                }}
                placeholderTextColor={globalColors.background}
                label="Address"
                labelStyle={[{ color: globalColors.text }, styles.label]}
              />
              <View style={[styles.uploadButton, styles.rowContainer]}>
                <Text style={[styles.label, { color: globalColors.text }]}>
                  Branches
                </Text>
                <View style={styles.smallRow}>
                  <Pressable onPress={addNewBranch}>
                    <AntDesign
                      name="pluscircle"
                      size={globalWidth("1.5%")}
                      color={globalColors.custom}
                    />
                  </Pressable>
                  <Pressable onPress={addNewBranch}>
                    <AntDesign
                      name="minuscircle"
                      size={globalWidth("1.5%")}
                      color={globalColors.custom}
                    />
                  </Pressable>
                </View>
              </View>
              <Button
                buttonStyle={styles.button}
                title="Save Changes"
                titleStyle={styles.title}
                onPress={updadeOrganization}
                loading={editIsLoading}
                loadingStyle={{ color: globalColors.text }}
              />
            </View>
            <View style={styles.editContainer}>
              {branches &&
                branches.length > 0 &&
                branches.map((branch, index) => (
                  <ScrollView
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.branchesEditContainer} key={index}>
                      <Pressable
                        onPress={() => removeBranch(index)}
                        style={{ alignSelf: "flex-end", marginBottom: 10 }}
                      >
                        <AntDesign
                          name="closecircle"
                          size={globalWidth("1.5%")}
                          color={globalColors.custom}
                        />
                      </Pressable>
                      <Input
                        placeholder="Branch Name"
                        value={branch.branchName}
                        onChangeText={(text) =>
                          changeBranch(index, "branchName", text)
                        }
                        inputContainerStyle={[
                          styles.inputContainer,
                          { backgroundColor: globalColors.text },
                        ]}
                        style={styles.input}
                        rightIcon={{
                          type: "font-awesome",
                          name: "building",
                          color: globalColors.extraCard,
                        }}
                        placeholderTextColor={globalColors.extraCard}
                      />
                      <Input
                        placeholder="Location"
                        value={branch.branchLocation}
                        onChangeText={(text) =>
                          changeBranch(index, "branchLocation", text)
                        }
                        inputContainerStyle={[
                          styles.inputContainer,
                          { backgroundColor: globalColors.text },
                        ]}
                        style={styles.input}
                        rightIcon={{
                          type: "font-awesome",
                          name: "map-marker",
                          color: globalColors.extraCard,
                        }}
                        placeholderTextColor={globalColors.extraCard}
                      />
                      <Input
                        placeholder="Contact"
                        value={branch.branchContact}
                        onChangeText={(text) =>
                          changeBranch(index, "branchContact", text)
                        }
                        maxLength={13}
                        inputContainerStyle={[
                          styles.inputContainer,
                          { backgroundColor: globalColors.text },
                        ]}
                        style={styles.input}
                        rightIcon={{
                          type: "font-awesome",
                          name: "phone",
                          color: globalColors.extraCard,
                        }}
                        placeholderTextColor={globalColors.extraCard}
                      />
                      <Input
                        placeholder="Email"
                        value={branch.email}
                        onChangeText={(text) =>
                          changeBranch(index, "branchEmail", text)
                        }
                        inputContainerStyle={[
                          styles.inputContainer,
                          { backgroundColor: globalColors.text },
                        ]}
                        style={styles.input}
                        rightIcon={{
                          type: "font-awesome",
                          name: "envelope",
                          color: globalColors.extraCard,
                        }}
                        placeholderTextColor={globalColors.extraCard}
                      />
                      <DropDownPicker
                        open={branch.dropdownOpen}
                        value={branch.branchManager}
                        items={managers}
                        setOpen={(open) => {
                          const updatedBranches = [...branches];
                          updatedBranches[index].dropdownOpen = open; // Track the state for each branch
                          setBranches(updatedBranches);
                          setManagerListIsOpened(open);
                        }}
                        setValue={(callback) => {
                          const selectedManager = callback();
                          changeBranch(index, "branchManager", selectedManager);
                        }}
                        setItems={setSelectedManager}
                        placeholder="Assign Manager"
                        placeholderStyle={{ color: "#6a6b6c" }}
                        style={[
                          {
                            backgroundColor: globalColors.text,
                            width: "98.5%",
                            alignSelf: "center",
                          },
                          styles.mainContainer,
                        ]}
                        textStyle={styles.input}
                        dropDownDirection="TOP"
                        dropDownContainerStyle={[
                          {
                            backgroundColor: globalColors.text,
                            width: "98.5%",
                            alignSelf: "center",
                            zIndex: 1,
                          },
                          styles.mainContainer,
                        ]}
                      />
                    </View>
                  </ScrollView>
                ))}
            </View>
          </View>
        </ScrollView>
      </MainHolderScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  editContainer: {
    padding: 7,
    width: "50%",
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  uploadButton: {
    width: "97%",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    height: globalHeight("4%"),
    justifyContent: "center",
    marginBottom: globalHeight("1%"),
  },
  buttonText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  input: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "96%",
    marginTop: globalHeight("1%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("1%"),
    width: "15%",
  },
  branchesEditContainer: {
    width: "96%",
    alignSelf: "center",
    marginBottom: globalHeight("2%"),
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    padding: globalHeight("1%"),
  },
  label: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    marginBottom: globalHeight("1.2%"),
  },
  button: {
    width: "50%",
    backgroundColor: Colors.button,
    alignSelf: "center",
  },
  title: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.2%"),
  },
});

export const EditOrganizationScreenOptions = (navData) => {
  return {
    headerTitle: "EditOrganizationScreen",
  };
};

export default EditOrganizationScreen;
