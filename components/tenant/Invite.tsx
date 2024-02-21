import { Text, View } from "@common/Themed";
import { Invite } from "../../types/Invite";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useGetInvitesQuery } from "@toolkit/invitesApi";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { scaleFont } from "../../utils/scaleFont";

const Invites = () => {
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useGetInvitesQuery(user?._id || "0");

  const formateDate = (date: string) => {
    const unformated = new Date(date);
    const day = unformated.getDate();
    const month = unformated.getMonth() + 1; // Month is zero-based, so we add 1
    const year = unformated.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
  };
  if (error) {
    console.log(error);
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Active Invites </Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.body}>
            {data
              ? data?.map((invite) => (
                  <View colorName="tint" style={styles.inviteContainer}>
                    <View style={styles.inviteTop}>
                      <Text style={styles.inviteTopTitle}>{invite.guest}</Text>
                      <Text style={styles.inviteTopSub}>{invite?.code}</Text>
                    </View>
                    <View style={styles.inviteBody}>
                      <View style={styles.inviteDescription}>
                        <Text style={styles.inviteDescriptionKey}>
                          Code Type{" "}
                        </Text>
                        <Text style={styles.inviteDescriptionValue}>
                          {invite?.codeType === "onetime" && "One Time"}
                          {invite?.codeType === "recurring" && "Recurring"}
                        </Text>
                      </View>
                      {invite?.codeType === "onetime" && (
                        <View style={styles.inviteDescription}>
                          <Text style={styles.inviteDescriptionKey}>
                            Date Expected
                          </Text>
                          <Text style={styles.inviteDescriptionValue}>
                            {invite.dateExpected
                              ? formateDate(invite.dateExpected)
                              : "-----"}
                          </Text>
                        </View>
                      )}
                      {invite?.codeType === "recurring" && (
                        <>
                          <View style={styles.inviteDescription}>
                            <Text style={styles.inviteDescriptionKey}>
                              Date Expected
                            </Text>
                            <Text style={styles.inviteDescriptionValue}>
                              {invite.dateExpected
                                ? formateDate(invite.dateExpected)
                                : "-----"}
                            </Text>
                          </View>
                          <View style={styles.inviteDescription}>
                            <Text style={styles.inviteDescriptionKey}>
                              Valid Untill
                            </Text>
                            <Text style={styles.inviteDescriptionValue}>
                              {invite.validUntil
                                ? formateDate(invite.validUntil)
                                : "-----"}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                ))
              : ""}

            {isLoading && <ActivityIndicator size={"large"} />}
          </View>
        </ScrollView>

        {/* <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.inviteContainer}>
          <View style={styles.inviteTop}>
            <Text style={styles.inviteTopTitle}>Plumber Idris</Text>
            <Text style={styles.inviteTopSub}>30/10/2024</Text>
          </View>
          <View style={styles.inviteBody}>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Purpose </Text>
              <Text style={styles.inviteDescriptionValue}> House service</Text>
            </View>
            <View style={styles.inviteDescription}>
              <Text style={styles.inviteDescriptionKey}> Duration </Text>
              <Text style={styles.inviteDescriptionValue}>
                21/10/2024 - 30/10/2024
              </Text>
            </View>
          </View>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(18),
    fontFamily: "ManropeSemiBold",
    textAlign: "left",
  },
  invitesTab: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  scrollViewContent: {
    width: "100%",
  },
  container: {
    textAlign: "left",
    marginTop: 15,
    width: "100%",
    gap: 14,
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    gap: 16,
    paddingHorizontal: 7,
    marginBottom: 280,
  },
  inviteContainer: {
    height: 110,
    maxWidth: 400,
    fontFamily: "ManropeBold",
    justifyContent: "center",
    gap: 6,

    alignItems: "flex-start",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "98%",
    elevation: 4,
    shadowColor: "#3629B7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
  },
  inviteBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    width: "100%",
  },
  inviteTopTitle: {
    textTransform: "capitalize",
    fontSize: scaleFont(16),
    fontFamily: "ManropeSemiBold",
    color: "#000",
  },
  inviteTopSub: {
    fontSize: scaleFont(12),
    fontFamily: "ManropeSemiBold",
    color: "#979797",
  },
  inviteDescription: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    display: "flex",
    flexDirection: "row",
  },
  inviteDescriptionKey: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    color: "#979797",
    fontFamily: "ManropeSemiBold",
  },
  inviteDescriptionValue: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2%",
    display: "flex",
    color: "#979797",
    fontSize: scaleFont(12),
    fontFamily: "ManropeMedium",
  },
  inviteTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Invites;
