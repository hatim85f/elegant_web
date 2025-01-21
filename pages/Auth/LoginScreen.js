import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, CheckBox, Image, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { Pressable } from "react-native-gesture-handler";

import * as authActions from "../../store/auth/authActions";

import { Entypo } from "@expo/vector-icons";

const LoginScreen = (props) => {
  const { theme } = useTheme();

  const { token } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberChecked, setRememberChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSecured, setPasswordSecured] = useState(true);

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (userName === "" || password === "") {
      return;
    }

    setIsLoading(true);
    dispatch(authActions.loginUser(userName, password, rememberChecked)).then(
      () => {
        setIsLoading(false);
      }
    );
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
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/login_bg.jpg")}
            style={styles.leftImage}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={[styles.header, { color: theme.text }]}>
            Welcome Back to Elegant Flow
          </Text>
          <Text style={[styles.subHeader, { color: theme.text }]}>
            Sign in to your account
          </Text>
          <Input
            placeholder="Username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            inputStyle={[
              { color: theme.text, backgroundColor: theme.card },
              styles.input,
            ]}
            inputContainerStyle={[
              {
                borderBottomColor: theme.background,
                backgroundColor: theme.card,
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
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputStyle={[{ color: theme.text }, styles.input]}
            inputContainerStyle={[
              { borderBottomColor: theme.text, backgroundColor: theme.card },
              styles.inputContainer,
            ]}
            secureTextEntry={passwordSecured}
            rightIcon={() => (
              <Pressable onPress={() => setPasswordSecured(!passwordSecured)}>
                <Entypo
                  name={passwordSecured ? "eye" : "eye-with-line"}
                  size={24}
                  color={theme.background}
                />
              </Pressable>
            )}
          />
          <View style={styles.checksRow}>
            <View style={styles.smallRow}>
              <CheckBox
                checked={rememberChecked}
                onPress={() => setRememberChecked(!rememberChecked)}
                checkedColor={Colors.button}
                uncheckedColor={theme.primary === "#121212" ? "#fff" : "#000"}
                containerStyle={{
                  marginLeft: -8,
                }}
              />
              <Text
                style={[
                  styles.checkText,
                  { color: theme.text, marginLeft: -10 },
                ]}
              >
                Remember me
              </Text>
            </View>
            <Pressable onPress={() => {}} style={styles.touchable}>
              <Text style={[styles.checkText, { color: theme.text }]}>
                Forgot Password ?
              </Text>
            </Pressable>
          </View>
          <Button
            title="Login"
            buttonStyle={styles.btn}
            titleStyle={styles.checkText}
            onPress={submitHandler}
            loading={isLoading}
            loadingStyle={{ color: theme.text }}
          />
          <View style={styles.checksRow}>
            <View style={styles.line} />
            <Text style={[styles.checkText, { color: theme.text }]}>
              OR LOGIN WITH{" "}
            </Text>
            <View style={styles.line} />
          </View>
          <View style={styles.buttonRow}>
            <Button
              buttonStyle={styles.secondLog}
              title="Facebook"
              titleStyle={styles.checkText}
              onPress={() => {}}
            />
            <Button
              buttonStyle={styles.secondLog}
              title="Google"
              titleStyle={styles.checkText}
              onPress={() => {}}
            />
          </View>
          <Text style={[styles.checkText, { color: theme.text }]}>
            Don't have an account ?{" "}
            <Pressable
              onPress={() => props.navigation.navigate("register")}
              style={styles.touchable}
            >
              <Text style={[styles.checkText, { color: Colors.button }]}>
                Sign Up
              </Text>
            </Pressable>
          </Text>
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
  imageContainer: {
    flex: 2,
  },
  leftImage: {
    height: globalHeight("100%"),
    width: globalWidth("66%"),
  },
  loginContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: globalHeight("12%"),
  },
  header: {
    fontSize: globalWidth("1.4%"),
    fontFamily: "poppins",
  },
  subHeader: {
    fontSize: globalWidth("0.9%"),
    fontFamily: "poppins",
    marginTop: globalHeight("1%"),
  },
  inputContainer: {
    width: "90%",
    alignSelf: "center",
    borderColor: Colors.text,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: globalWidth("0.25%"),
    fontFamily: "poppins",
  },
  input: {
    fontFamily: "poppins",
    color: Colors.background,
  },
  checksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    fontFamily: "poppins",
    fontSize: globalWidth("0.8%"),
  },
  btn: {
    width: globalWidth("20%"),
    borderRadius: 8,
    backgroundColor: Colors.button,
  },
  line: {
    height: 1,
    width: "35%",
    backgroundColor: Colors.text,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  secondLog: {
    width: globalWidth("10%"),
    borderRadius: 8,
    backgroundColor: "#000",
  },
});

export const LoginScreenOptions = (navData) => {
  return {
    headerTitle: "LoginScreen",
  };
};

export default LoginScreen;
