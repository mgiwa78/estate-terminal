import { Text, View, useThemeColor } from "@common/Themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import Invites from "../../components/tenant/Invites";
import TenantMenu from "../../components/tenant/Menu";
import Header from "../../components/Header";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAddInviteMutation } from "@toolkit/invitesApi";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { isLoading } from "expo-font";
import { scaleFont } from "../../utils/scaleFont";
import { BaseProps } from "../../types/BaseProps";

const SecurityVerifyInviteScreen = ({ navigation }: BaseProps) => {
  const [inviteCode, setinviteCode] = useState<string>("");
  const [isVerifying, setisVerifying] = useState<boolean>(false);

  const [date, setDate] = useState(new Date(1598051730000));

  const confirmInvite = (code: any) => {};

  return (
    <>
      <View style={styles.container} lightColor="#f2f2f2">
        <Header
          textColor="#fff"
          pageTitle="Verify Invite"
          backTo="SecurityHomeScreen"
        />
        <View style={styles.body} darkColor="#000" lightColor="#f2f2f2">
          <View style={styles.top} lightColor="#f2f2f2">
            <Text style={styles.inputLabel}>
              Enter invite code and tap verify and Confirm code
            </Text>

            <View style={styles.inputBox} lightColor="#f2f2f2">
              <Text style={styles.inputLabel}>Invite Code</Text>
              <TextInput
                style={styles.input}
                value={inviteCode}
                onChangeText={setinviteCode}
                placeholder="Enter invite code"
              />
            </View>
          </View>
          <View style={styles.bottom}></View>

          <Pressable
            style={[
              styles.btnSubmit,
              inviteCode
                ? { backgroundColor: "#436BAB" }
                : { backgroundColor: "#F1F5F9" },
            ]}
            onPress={() =>
              inviteCode
                ? confirmInvite({
                    code: inviteCode,
                  })
                : null
            }
          >
            <Text
              style={[
                styles.btnText,
                inviteCode ? { color: "#FFF" } : { color: "#CBD5E1" },
              ]}
            >
              Verify
            </Text>
            {isVerifying && <ActivityIndicator />}
          </Pressable>
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
  body: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    display: "flex",
    width: "100%",
    height: "100%",
    gap: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 130,
  },
  inputBox: {
    width: "100%",
  },
  input: {
    marginTop: 8,
    width: "100%",
    borderColor: "#CBCBCB",
    borderWidth: 1,
    height: 44,
    fontSize: scaleFont(14),
    display: "flex",
    justifyContent: "center",
    fontFamily: "ManropeMedium",
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  picker: {
    marginTop: 2,
    height: "auto",
    width: "100%",
    borderColor: "#CBCBCB",

    borderWidth: 1,
    fontSize: scaleFont(14),
    fontFamily: "ManropeMedium",
    borderRadius: 15,
  },
  inputLabel: {
    fontFamily: "ManropeSemiBold",
    fontSize: scaleFont(12),
    width: "100%",
    color: "#989898",
  },
  btnSubmit: {
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 20,
    borderRadius: 15,
    backgroundColor: "#436BAB",
  },
  bottom: {
    display: "flex",
    width: "100%",
  },
  top: {
    gap: 11,
    display: "flex",
    width: "100%",
  },
  btnText: {
    fontFamily: "ManropeMedium",
    fontSize: scaleFont(15),
    color: "#fff",
  },
});

export default SecurityVerifyInviteScreen;
