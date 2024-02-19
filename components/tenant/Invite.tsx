import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const Invites = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}> Active Invites </Text>
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "ManropeSemiBold",
    color: "#000",
    textAlign: "left",
  },
  invitesTab: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  container: {
    textAlign: "left",
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    gap: 24,
  },
  inviteContainer: {
    height: 110,
    maxWidth: 400,
    fontFamily: "ManropeBold",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    elevation: 2,
    shadowColor: "#3629B7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
  },
  inviteBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    width: "100%",
    gap: 5,
  },
  inviteTopTitle: {
    fontSize: 16,
    fontFamily: "ManropeSemiBold",
    color: "#000",
  },
  inviteTopSub: {
    fontSize: 12,
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
    display: "flex",
    color: "#979797",
    fontSize: 12,
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
