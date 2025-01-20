import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";

import * as clientsActions from "../../store/clients/clientsActions";
import Loader from "../../components/Loader";

import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

import { globalWidth } from "../../constants/globalWidth";
import moment from "moment";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

const InActiveClients = (props) => {
  const { globalColors } = useTheme();

  const { inActiveClients } = useSelector((state) => state.clients);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(clientsActions.getClients()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <Loader
        loadingMessage="Loading Clients Data"
        loadingColor={globalColors.text}
        containerColor={globalColors.background}
      />
    );
  }

  return (
    <ScrollView
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {inActiveClients.length > 0 &&
          inActiveClients.map((client, index) => {
            return (
              <View
                style={[
                  styles.clientContainer,
                  { backgroundColor: globalColors.card },
                ]}
                key={index}
              >
                <View>
                  <View style={styles.smallRow}>
                    <FontAwesome
                      name="user"
                      size={globalWidth("1.5%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      {client.clientName}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <Entypo
                      name="email"
                      size={globalWidth("1.5%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      {client.clientEmail}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <FontAwesome5
                      name="phone"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      {client.clientPhone}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <MaterialCommunityIcons
                      name="account-off"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      {client.clientStatus} Client
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <FontAwesome5
                      name="handshake"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      Assigned To: {client.handledBy}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <MaterialCommunityIcons
                      name="account-plus-outline"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      Created By : {client.clientCreatedBy}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <Fontisto
                      name="date"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      Created At :{" "}
                      {moment(client.clientCreatedAt).format("lll")}
                    </Text>
                  </View>
                  <View style={styles.smallRow}>
                    <Entypo
                      name="flow-branch"
                      size={globalWidth("1.3%")}
                      color="#000"
                    />
                    <Text style={[styles.cardText, { color: "#000" }]}>
                      Branch : {client.branchName}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    buttonStyle={[
                      styles.detailsButton,
                      { backgroundColor: globalColors.custom },
                    ]}
                    title="Complete Details"
                    onPress={() =>
                      props.navigation.navigate("add_new_client", {
                        clientId: client._id,
                      })
                    }
                    titleStyle={styles.detailsButtonText}
                  />
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clientContainer: {
    padding: globalWidth("1%"),
    margin: globalWidth("1%"),
    borderRadius: globalWidth("1%"),
    flexDirection: "row",
    justifyContent: "space-between",
    width: globalWidth("40%"),
  },
  smallRow: {
    flexDirection: "row",
    marginVertical: globalWidth("0.5%"),
  },
  cardText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
    marginLeft: globalWidth("1%"),
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  detailsButton: {
    backgroundColor: Colors.button,
    borderRadius: 10,
    width: globalWidth("10%"),
  },
  detailsButtonText: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
});

export default InActiveClients;
