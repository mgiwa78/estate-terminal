import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";

const TenantMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Menu </Text>

      <View style={styles.menuBody}>
        <Pressable
          style={styles.menuItem}
          onPress={() => router.replace("/tenant/createInvite")}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../assets/images/Group.png")}
          />
          <Text style={styles.menuTitle}>Create invite</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/tenant/allInvites")}
          style={styles.menuItem}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../assets/images/Grou2p.png")}
          />
          <Text style={styles.menuTitle}>All invites</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "ManropeSemiBold",
    color: "#000",
    fontWeight: "600",
  },
  menuItem: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    display: "flex",
    width: 100,
    gap: 15,
    height: 102,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#3629B7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
  menuBody: {
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 24,
  },
  menuTitle: {
    fontSize: 12,
    fontFamily: "ManropeMedium",
    color: "#979797",
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
});

export default TenantMenu;
