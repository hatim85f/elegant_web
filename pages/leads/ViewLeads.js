import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../context/ThemeContext";

import * as leadsActions from "../../store/leads/leadsActions";
import * as authActions from "../../store/auth/authActions";

import Loader from "../../components/Loader";
import { FlatList, Pressable } from "react-native-gesture-handler";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";

const ViewLeads = (props) => {
  const { globalColors } = useTheme();

  const { leads } = useSelector((state) => state.leads);
  const { user, token } = useSelector((state) => state.auth);

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

  // ======================================================SETTING STATES======================================================

  const ITEMS_PER_PAGE = 4;

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsData, setLeadsData] = useState([]);
  const [filterText, setFilterText] = useState("All");
  const [totalPages, setTotalPages] = useState(0);

  const filterList = [
    { label: "All", value: "All" },
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "In Progress", value: "in progress" },
    { label: "Colsed", value: "closed" },
  ];

  // =====================================================GETTING LEADS==========================================================

  useEffect(() => {
    setIsLoading(true);
    dispatch(leadsActions.getLeads()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  //   ===============================================HANDLING PAGINATION=========================================================

  const handleNextPage = () => {
    if (endIndex < leads.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = leads.slice(startIndex, endIndex);

  //   ====================================================SET LEADS===============================================================

  useEffect(() => {
    let filteredLeads = leads;

    // Apply filtering based on filterText
    if (filterText && filterText !== "All") {
      filteredLeads = leads.filter((lead) => lead.status === filterText);
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

    // Update leads data
    setLeadsData(paginatedLeads);

    // Calculate total pages
    setTotalPages(Math.ceil(filteredLeads.length / ITEMS_PER_PAGE));
  }, [leads, filterText, currentPage]);

  // ======================================================RENDERING===============================================================

  if (!user) {
    return <View />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader
          loadingMessage="Loading Leads"
          loadingColor={globalColors.text}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.topView, { borderBottomColor: globalColors.text }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.header, { color: globalColors.text }]}>
            Leads Overview
          </Text>
          <Text style={[styles.text, { color: globalColors.text }]}>
            {" "}
            Active Leads : {leads.length}{" "}
          </Text>
        </View>
        <View style={styles.filterContainer}>
          <Text
            style={[
              styles.header,
              { color: globalColors.text, textAlign: "center" },
            ]}
          >
            Filter By Status
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => setFilterText("All")}
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "All"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                All
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "pending"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
              onPress={() => setFilterText("pending")}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                Pending
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "active"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
              onPress={() => setFilterText("active")}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                Active
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "inactive"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
              onPress={() => setFilterText("inactive")}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                Inactive
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "in progress"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
              onPress={() => setFilterText("in progress")}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                In Progress
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.pressFilter,
                {
                  backgroundColor:
                    filterText === "closed"
                      ? Colors.button
                      : globalColors.extraCard,
                },
              ]}
              onPress={() => setFilterText("closed")}
            >
              <Text style={[styles.text, { color: globalColors.text }]}>
                Closed
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.paginationContainer}>
        <Pressable
          onPress={handlePrevPage}
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
            {
              backgroundColor:
                globalColors.primary === "#121212" ? "#444" : globalColors.card,
            },
          ]}
          disabled={currentPage === 1}
        >
          <Text style={[styles.paginationText, { color: globalColors.text }]}>
            {"<"}
          </Text>
        </Pressable>

        {Array.from({ length: totalPages }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageNumber,
              {
                backgroundColor: globalColors.card,
              },
              currentPage === index + 1 && styles.activePage,
            ]}
          >
            <Text style={[styles.pageText, { color: globalColors.text }]}>
              {index + 1}
            </Text>
          </View>
        ))}

        <Pressable
          onPress={handleNextPage}
          style={[
            styles.paginationButton,
            currentPage === totalPages && styles.disabledButton,
            {
              backgroundColor:
                globalColors.primary === "#121212" ? "#444" : globalColors.card,
            },
          ]}
          disabled={currentPage === totalPages}
        >
          <Text
            style={[
              styles.paginationText,
              {
                color: globalColors.text,
              },
            ]}
          >
            {">"}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={leadsData}
        keyExtractor={(item) => item._id}
        pagingEnabled
        maxToRenderPerBatch={10}
        renderItem={({ item, index }) => (
          <View style={styles.leadContainer}>
            <View style={[styles.nameCotnainer, { width: "3%" }]}>
              <Text style={[styles.details, { color: globalColors.text }]}>
                {index + 1 + startIndex})
              </Text>
            </View>
            <View style={styles.nameCotnainer}>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Name:{" "}
                </Text>{" "}
                {item.name}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Lead Type:{" "}
                </Text>
                {item.type}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Email:{" "}
                </Text>{" "}
                {item.email}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Phone:{" "}
                </Text>{" "}
                {item.phone}
              </Text>
            </View>
            <View style={styles.nameCotnainer}>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Created By:{" "}
                </Text>
                {item.history?.created_by}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Status:{" "}
                </Text>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Assigned To:{" "}
                </Text>
                {item.assignedTo}
              </Text>
            </View>
            <View style={[styles.nameCotnainer, { width: "15%" }]}>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.text }}>
                  Source:{" "}
                </Text>
                {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
              </Text>
            </View>
            <View style={styles.nameCotnainer}>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.blue }}>
                  Created At:{" "}
                </Text>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </Text>
              <Text style={[styles.details, { color: globalColors.text }]}>
                <Text style={{ fontWeight: "bold", color: Colors.blue }}>
                  Branch:{" "}
                </Text>
                {item.branchName}
              </Text>
            </View>
            <View style={styles.nameCotnainer}>
              <Button
                title="View Details"
                onPress={() => {}}
                buttonStyle={styles.leadButton}
                titleStyle={styles.titleBtn}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "93%",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
  },
  header: {},
  leadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: globalWidth("1.5%"),
    marginVertical: globalWidth("1.5%"),
    borderBottomColor: "#000",
    borderBottomWidth: 2.8,
    paddingBottom: globalWidth("1%"),
  },
  nameCotnainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "23%",
  },
  details: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  leadButton: {
    width: globalWidth("10%"),
    backgroundColor: "#000",
    borderRadius: 5,
  },
  titleBtn: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: globalWidth("3.5%"),
    marginVertical: globalWidth("1%"),
    borderBottomWidth: 2,
  },
  textContainer: {
    flexDirection: "column",
    padding: globalWidth("1%"),
  },
  header: {
    fontFamily: "poppins",
    fontSize: globalWidth("1.5%"),
  },
  text: {
    fontFamily: "poppins",
    fontSize: globalWidth("1%"),
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: globalHeight("1%"),
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 4,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#222",
  },
  paginationText: {
    color: "#fff",
    fontSize: 16,
  },
  pageNumber: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activePage: {
    backgroundColor: Colors.button,
  },
  pageText: {
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    width: globalHeight("80%"),
  },
  pressFilter: {
    width: globalWidth("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ViewLeadsOptions = (navData) => {
  return {
    headerTitle: "ViewLeads",
  };
};

export default ViewLeads;
