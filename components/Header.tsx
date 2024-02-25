import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { scaleFont } from "../utils/scaleFont";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useAppDispatch } from "@redux/hooks";
import { logout } from "@redux/slice/authSlice";

type Props = {
  pageTitle: string;
  textColor: string;
  backTo?: any;
};

const Header = ({ pageTitle, backTo, textColor }: Props) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    // navigation.navigate("TenantLoginScreen", {});
    dispatch(logout());
  };
  return (
    <View style={styles.headerBox}>
      <View style={styles.headerLeft}>
        {backTo && (
          <Pressable
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 19,
            }}
            onPress={() => navigation.navigate(backTo)}
          >
            <Image
              style={styles.menuIcon}
              source={require("../assets/images/Path.png")}
            />
          </Pressable>
        )}
        <Text style={[styles.title, { color: textColor }]}> {pageTitle} </Text>
      </View>
      <Pressable style={styles.image} onPress={() => handleSignout()}>
        <Image
          style={{ width: 22, height: 22 }}
          source={require("../assets/images/box-arrow-right.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: scaleFont(20),
    fontFamily: "ManropeSemiBold",
    color: "#000",
    marginBottom: 5,
  },
  image: { marginBottom: 10 },
  headerLeft: {
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  headerBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    gap: 12,
    paddingRight: 30,
    alignItems: "flex-end",
    backgroundColor: "#436BAB",
    height: 100,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  menuIcon: {
    width: 9,
    height: 16,
  },
});

export default Header;
