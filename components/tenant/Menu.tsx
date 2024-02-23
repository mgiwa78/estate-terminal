import { Text, View } from "@common/Themed";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Pressable, Image } from "react-native";

const TenantMenu = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container} lightColor="transparent">
      <Text style={styles.title}> Menu </Text>

      <View style={styles.menuBody} lightColor="transparent">
        <View
          lightColor={"#fff"}
          darkColor={"#fff"}
          style={styles.menuItem}
          onTouchEnd={() => navigation.navigate("TenantCreateInviteScreen")}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../assets/images/Group.png")}
          />
          <Text style={styles.menuTitle}>Create invite</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("TenantAllInviteScreen")}
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
