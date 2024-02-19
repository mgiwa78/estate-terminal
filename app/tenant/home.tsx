import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Invites from "../../components/tenant/Invite";
import TenantMenu from "../../components/tenant/Menu";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";

const HomeScreen = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.homeUserMenu}>
          <View style={styles.userImg}></View>

          <Text style={styles.userMenuName}>
            {user ? `Hi , ${user?.lastname + " " + user?.firstname}` : ""}
          </Text>
        </View>
        <View style={styles.homeBody}>
          <View style={{ width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View
                style={{
                  display: "flex",
                  gap: 20,
                  paddingBottom: 30,
                }}
              >
                <TenantMenu />
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
    paddingVertical: 60,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    width: "100%",
  },
  homeBody: {
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
    paddingVertical: 30,
  },
  header: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  invitesTab: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  userImg: {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    width: 55,
    height: 55,
  },
  homeUserMenu: {
    backgroundColor: "#436BAB",
    gap: 20,
    height: 90,
    display: "flex",
    paddingHorizontal: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userMenuName: {
    fontFamily: "ManropeSemiBold",
    fontSize: 20,
    color: "#fff",
  },
});

export default HomeScreen;
