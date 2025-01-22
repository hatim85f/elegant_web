import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { isTablet } from "../../constants/device";

import { useTheme } from "../../context/ThemeContext";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import DropDowmPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

import * as organizationActions from "../../store/organizations/organizationsActions";
import * as authActions from "../../store/auth/authActions";
import Loader from "../../components/Loader";

const RegisterationScreen = (props) => {
  const { theme } = useTheme();

  const { token } = useSelector((state) => state.auth);
  const { organizations } = useSelector((state) => state.organizations);

  const dispatch = useDispatch();

  // ==========================================================SETTING STATE===================================================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [organization, setOrganization] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [listIsOpened, setListIsOpened] = useState(false);
  const [organizationLoading, setOrganizationLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organizationsList, setOrganizationsList] = useState([
    { label: "Select an Organization", value: "" },
  ]);

  // ==============================================================USERNAME CHECKS==========================================

  const checkUserName = () => {
    if (!userName.includes("@") || !userName.includes(".")) {
      setEmailIsValid(false);
      setEmailErrorMessage("Invalid email address");
    } else {
      setEmailIsValid(true);
      setEmailErrorMessage("");
    }
  };

  // =====================================================PASSWORD CHECKS===========================================

  const checkPasswordLength = () => {
    if (password.length < 8) {
      setPasswordIsValid(false);
      setPasswordErrorMessage("Password must be at least 8 characters long");
    } else {
      setPasswordHasError(false);
      setPasswordErrorMessage("");
    }
  };

  const checkConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setPasswordIsValid(false);
      setPasswordErrorMessage("Passwords doesn't match");
    } else {
      setPasswordIsValid(true);
    }
  };

  // ========================================SUBMIT AND RENDER ===================================================

  const submitHandler = () => {
    if (
      (passwordHasError && !emailIsValid) ||
      userName.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      organization.length === 0
    ) {
      Alert.alert("Invalid Input", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }

    setIsLoading(true);
    dispatch(
      authActions.registerUser(
        firstName,
        lastName,
        userName,
        password,
        organization
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  const { navigation } = props;

  useEffect(() => {
    if (token) {
      navigation.navigate("home");
    }
  }, [token, navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.mainRow}>
        <View
          style={[
            styles.imageContainer,
            {
              flex: 1,
              width: globalWidth("35%"),
              paddingTop: globalHeight("8%"),
            },
          ]}
        >
          <Text style={[styles.header, { color: theme.text }]}>
            {" "}
            Create Your Account{" "}
          </Text>
          <Text style={[styles.subHeader]}>
            Sign up to manage your customers and teams with ease.
          </Text>
          <View style={styles.inputsRow}>
            <Input
              placeholder="First Name"
              placeholderTextColor={Colors.text}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              inputStyle={[{ color: theme.background }, styles.input]}
              onFocus={() => setPasswordIsValid(true)}
              inputContainerStyle={[
                styles.inputContainer,
                {
                  borderBottomColor: theme.text,
                  backgroundColor: theme.card,
                },
              ]}
              rightIcon={{
                type: "entypo",
                name: "user",
                color: theme.background,
              }}
            />
            <Input
              placeholder="Last Name"
              placeholderTextColor={Colors.text}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              onFocus={() => setPasswordIsValid(true)}
              inputStyle={[{ color: theme.background }, styles.input]}
              inputContainerStyle={[
                {
                  borderBottomColor: theme.text,
                  backgroundColor: theme.card,
                },
                styles.inputContainer,
              ]}
              rightIcon={{
                type: "entypo",
                name: "user",
                color: theme.background,
              }}
            />
          </View>
          <Input
            placeholder="Email"
            placeholderTextColor={Colors.text}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            inputStyle={[{ color: theme.background }, styles.input]}
            onFocus={() => setEmailIsValid(true)}
            onBlur={checkUserName}
            inputContainerStyle={[
              {
                borderBottomColor: theme.text,
                backgroundColor: theme.card,
                width: globalWidth("29%"),
                alignSelf: "center",
              },
              styles.inputContainer,
            ]}
            rightIcon={{
              type: "entypo",
              name: "mail",
              color: theme.background,
            }}
          />

          <Input
            placeholder="Password"
            placeholderTextColor={Colors.text}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onEndEditing={checkPasswordLength}
            secureTextEntry={!showPassword}
            inputStyle={[{ color: theme.background }, styles.input]}
            onFocus={() => setPasswordIsValid(true)}
            inputContainerStyle={[
              {
                borderBottomColor: theme.text,
                backgroundColor: theme.card,
                width: globalWidth("29%"),
                alignSelf: "center",
              },
              styles.inputContainer,
            ]}
            rightIcon={() => (
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text
                  style={{
                    color: theme.background,
                    fontSize: globalWidth("1%"),
                    fontFamily: "poppins",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            )}
          />
          <Input
            placeholder="Confirm Password"
            placeholderTextColor={Colors.text}
            value={confirmPassword}
            onChangeText={(text) => checkConfirmPassword(text)}
            secureTextEntry={!showPassword}
            inputStyle={[{ color: theme.background }, styles.input]}
            onFocus={() => setPasswordIsValid(true)}
            inputContainerStyle={[
              {
                borderBottomColor: theme.text,
                backgroundColor: theme.card,
                width: globalWidth("29%"),
                alignSelf: "center",
              },
              styles.inputContainer,
            ]}
            rightIcon={{
              type: "entypo",
              name: "lock",
              color: theme.background,
            }}
          />
          <Input
            placeholder="Write your Organization Name"
            placeholderTextColor={Colors.text}
            value={organization}
            onChangeText={(text) => setOrganization(text)}
            inputStyle={[{ color: theme.background }, styles.input]}
            onFocus={() => setPasswordIsValid(true)}
            inputContainerStyle={[
              {
                borderBottomColor: theme.text,
                backgroundColor: theme.card,
                width: globalWidth("29%"),
                alignSelf: "center",
                marginTop: globalHeight("1%"),
              },
              styles.inputContainer,
            ]}
            rightIcon={{
              type: "font-awesome",
              name: "building",
              color: theme.background,
            }}
          />
          <Button
            title="Submit"
            buttonStyle={styles.btn}
            titleStyle={styles.btnText}
            onPress={submitHandler}
            loading={isLoading}
            loadingStyle={{ color: theme.text }}
          />
          <View style={styles.emptyView}>
            {!emailIsValid && (
              <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
            )}
            {!passwordIsValid && (
              <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
            )}
          </View>
          <View style={styles.lowerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}> Or Signup with </Text>
            <View style={styles.line} />
          </View>

          <View style={styles.buttonsRow}>
            <Button
              title="Google"
              buttonStyle={styles.socialBtn}
              titleStyle={styles.btnText}
              onPress={() => {}}
            />
            <Button
              title="Facebook"
              buttonStyle={styles.socialBtn}
              titleStyle={styles.btnText}
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={[styles.imageContainer, { flex: 2 }]}>
          <Image
            source={require("../../assets/images/register_page.jpg")}
            style={styles.rightImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rightImage: {
    width: globalWidth("65%"),
    height: globalHeight("100%"),
  },

  header: {
    fontFamily: "poppins",
    fontSize: globalHeight("3%"),
    textAlign: "center",
  },
  subHeader: {
    marginTop: globalHeight("1%"),
    fontFamily: "poppins",
    fontSize: globalHeight("1.5%"),
    textAlign: "center",
    color: Colors.text,
  },
  inputsRow: {
    width: globalWidth("15%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: globalHeight("5%"),
  },
  inputContainer: {
    borderRadius: 8,
    paddingHorizontal: 5,
    marginVertical: globalHeight("0.5%"),
    borderWidth: 1,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: globalHeight("1.8%"),
    marginVertical: globalHeight("1%"),
    fontFamily: "poppins",
  },
  emptyView: {
    height: globalHeight("4.2%"),
  },
  dropDownStyle: {
    width: globalWidth("29%"),
    alignSelf: "center",
    marginVertical: globalHeight("0.5%"),
  },
  btn: {
    backgroundColor: Colors.button,
    borderRadius: 8,
    width: globalWidth("29%"),
    alignSelf: "center",
    marginTop: globalHeight("1%"),
  },
  btnText: {
    fontFamily: "poppins",
    fontSize: globalHeight("2%"),
  },
  lowerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: globalHeight("2.5%"),
  },
  line: {
    height: 1,
    width: globalWidth("10%"),
    backgroundColor: Colors.text,
  },
  orText: {
    fontFamily: "poppins",
    fontSize: globalHeight("1.5%"),
    marginHorizontal: globalWidth("2%"),
    color: Colors.text,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("2.5%"),
  },

  socialBtn: {
    backgroundColor: "#000",
    borderRadius: 8,
    width: globalWidth("13%"),
  },
});

export const RegisterationScreenOptions = (navData) => {
  return {
    headerTitle: "RegisterationScreen",
  };
};

export default RegisterationScreen;
