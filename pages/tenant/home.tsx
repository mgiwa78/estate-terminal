import { Text, View } from "@common/Themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Invites from "../../components/tenant/Invites";
import TenantMenu from "../../components/tenant/Menu";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { useGetInvitesQuery } from "@toolkit/invitesApi";
import { isLoaded, isLoading } from "expo-font";
import { scaleFont } from "../../utils/scaleFont";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { logout } from "@redux/slice/authSlice";

const TenantHomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleSignout = () => {
    navigation.navigate("TenantLoginScreen");
    dispatch(logout());
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.homeUserMenu}>
          <View style={styles.userImg}></View>

          <Text style={styles.userMenuName}>
            {user ? `Hi , ${user?.firstname}` : ""}
          </Text>

          <Pressable style={styles.image} onPress={() => handleSignout()}>
            <Image
              style={{ width: 22, height: 22 }}
              source={require("../../assets/images/box-arrow-right.png")}
            />
          </Pressable>
        </View>
        <View style={styles.homeBody} darkColor="#000" lightColor="#f2f2f2">
          <TenantMenu />
          <Text style={styles.title}> Invites </Text>
          <Invites limit={2} filter="all" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    right: 24,
    top: 37,
  },
  container: {
    fontFamily: "ManropeSemiBold",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#436BAB",
    paddingVertical: 60,
    position: "relative",
    width: "100%",
  },
  scrollViewContent: {
    width: "100%",
  },
  homeBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",

    width: "100%",
    height: "100%",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: scaleFont(20),
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: scaleFont(18),
    color: "#000",
    fontFamily: "ManropeSemiBold",
    marginTop: 20,
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
    fontSize: scaleFont(20),
    color: "#fff",
  },
});

export default TenantHomeScreen;
