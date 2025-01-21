import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";
import MainHolderScreen from "../holderScreens/MainHolderScreen";

import * as clientsActions from "../../store/clients/clientsActions";
import Loader from "../../components/Loader";
import FeedbackUpdates from "./FeedbackUpdates";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import ClientData from "./ClientData";

const ActiveClientsDetails = (props) => {
  const { globalColors } = useTheme();

  const { clientDetails } = useSelector((state) => state.clients);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const clientId = props.route.params.clientId;

  useEffect(() => {
    setIsLoading(true);
    dispatch(clientsActions.getSpecificClient(clientId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, clientId]);

  if (!clientDetails) {
    return (
      <Loader
        loadingMessage="Getting Client Details"
        loadingColor={globalColors.text}
      />
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: globalColors.background }]}
    >
      <MainHolderScreen
        navigation={props.navigation}
        pageTitle={clientDetails?.clientName}
      >
        {isLoading && (
          <Loader
            loadingMessage="Loading Client Data"
            loadingColor={globalColors.text}
            containerColor={globalColors.background}
          />
        )}
        <View style={styles.mainRow}>
          <View style={{ flex: 1, height: globalHeight("90%") }}>
            <ClientData />
          </View>
          <View style={styles.feedbackContainer}>
            <FeedbackUpdates clientId={clientId} />
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
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  detailsContainer: {
    width: "60%",
    padding: globalWidth("1.5%"),
    borderRadius: 8,
  },
  feedbackContainer: {
    width: "40%",
    backgroundColor: "green",
    height: "100%",
  },
});

export const ActiveClientsDetailsOptions = (navData) => {
  return {
    headerTitle: "ActiveClientsDetails",
  };
};

export default ActiveClientsDetails;
