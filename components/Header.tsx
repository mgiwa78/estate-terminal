import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { scaleFont } from "../utils/scaleFont";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

type Props = {
  pageTitle: string;
  textColor: string;
  backTo: any;
};

const Header = ({ pageTitle, backTo, textColor }: Props) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Pressable
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 10,
            paddingVertical: 0,
          }}
          onPress={() => navigation.navigate(backTo)}
        >
          <Image
            style={styles.menuIcon}
            source={require("../assets/images/Path.png")}
          />
        </Pressable>
        <Text style={[styles.title, { color: textColor }]}> {pageTitle} </Text>
      </View>
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
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#436BAB",
    paddingBottom: 10,
    flexDirection: "row",
    width: "100%",
    height: 100,
    paddingHorizontal: 18,
    marginBottom: 10,
    gap: 5,
  },
  headerBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 12,
    paddingRight: 30,
  },
  menuIcon: {
    width: 9,
    height: 16,
  },
});

export default Header;
