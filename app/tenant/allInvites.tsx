import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Invites from "../../components/tenant/Invite";
import TenantMenu from "../../components/tenant/Menu";
import Header from "../../components/Header";

const AllInvites = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <Header
          textColor="#fff"
          pageTitle="All Invites"
          backTo="/tenant/home"
        />
        <View style={styles.body}>
          <View style={{ width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View
                style={{
                  display: "flex",
                  gap: 20,
                }}
              >
                <Invites />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "ManropeSemiBold",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#436BAB",
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    gap: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default AllInvites;
