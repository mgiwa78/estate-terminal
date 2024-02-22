import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import Invites from "../../../components/tenant/Invites";
import TenantMenu from "../../../components/tenant/Menu";
import Header from "../../../components/Header";

import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { useGetInvitesQuery } from "@toolkit/invitesApi";
type filter = "all" | "pending" | "cleared";

const AllInvites = () => {
  const [filter, setfilter] = useState<filter>("all");

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
        <View style={styles.body} darkColor="#000">
          <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.invitesTab}>
              {["all", "pending", "cleared"].map((tab: any) => (
                <View key={tab} onTouchEnd={() => setfilter(tab)}>
                  <Text
                    style={[
                      styles.invitesTabItemText,
                      tab === filter
                        ? {
                            fontFamily: "ManropeBold",
                            borderBottomWidth: 2,
                            borderBottomColor: "#436BAB",
                          }
                        : { fontFamily: "ManropeRegular" },
                    ]}
                  >
                    {tab}
                  </Text>
                </View>
              ))}
            </View>
            <Invites filter={filter} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "ManropeSemiBold",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#436BAB",
    width: "100%",
  },
  scrollViewContent: {
    width: "100%",
  },
  invitesTab: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  invitesItem: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  invitesTabItemText: {
    textTransform: "capitalize",
    fontFamily: "ManropeRegular",
    paddingLeft: -4,
    fontSize: 15,
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    width: "100%",
    height: "100%",
    gap: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default AllInvites;
