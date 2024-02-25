import { Text, View, useThemeColor } from "@common/Themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { updateStatus, verifyInvite } from "@services/verify-invite";
import User from "../../types/User";

const SecurityVerifyInviteScreen = ({ navigation }: BaseProps) => {
  const [inviteCode, setinviteCode] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState<boolean>(false);
  const [IsGrantingStatus, setIsGrantingStatus] = useState<boolean>(false);
  const [isRejectingStatus, setIsRejectingStatus] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean>(false);
  const [guest, setGuest] = useState<string>("");
  const [toSee, setToSee] = useState<User | null>();
  const [message, setMessage] = useState<string>("");

  const [date, setDate] = useState(new Date(1598051730000));

  const reset = () => {
    setIsResponse(false);
    setResponse(false);
    setMessage("");
    setGuest("");
    setToSee(null);
  };

  const confirmInvite = async (code: string) => {
    setIsVerifying(true);
    try {
      const RESPONSE = await verifyInvite(code);
      console.log(RESPONSE);

      if (RESPONSE?.success === true) {
        const { guest, creator, status } = RESPONSE.data;
        setGuest(guest);
        setToSee(creator);
        setIsResponse(true);
        setResponse(true);
        setMessage(`Invite code is valid.`);
      } else {
        setIsResponse(true);
        setResponse(false);
        setMessage(`Invalid code.`);
      }
    } catch (error: any) {
      console.log("error: ", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdateStatus = async (code: string, status: string) => {
    let res = "";

    if (status === "grant") {
      setIsGrantingStatus(true);
    } else {
      setIsRejectingStatus(true);
    }
    try {
      const RESPONSE = await updateStatus(code, status);
      console.log(RESPONSE);

      if (status === "grant") {
        res = "Invite access granted";
      } else {
        res = "Invite access rejected";
      }
      setIsGrantingStatus(false);
      setIsRejectingStatus(false);
      Alert.alert("Code status", res, [{ text: "OK", onPress: () => reset() }]);
    } catch (error: any) {
      console.log("error: ", error);
    } finally {
      setIsGrantingStatus(false);
    }
  };
  return (
    <>
      <View style={styles.container} lightColor="#f2f2f2">
        <Header textColor="#fff" pageTitle="Verify Invite" />
        <View style={styles.body} darkColor="#000" lightColor="#f2f2f2">
          {!isResponse && (
            <>
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
              <Pressable
                style={[
                  styles.btnSubmit,
                  inviteCode && !isVerifying
                    ? { backgroundColor: "#436BAB" }
                    : { backgroundColor: "#F1F5F9" },
                ]}
                onPress={() => (inviteCode ? confirmInvite(inviteCode) : null)}
              >
                <Text
                  style={[
                    styles.btnText,
                    inviteCode && !isVerifying
                      ? { color: "#FFF" }
                      : { color: "#CBD5E1" },
                  ]}
                >
                  Verify
                </Text>
                {isVerifying && <ActivityIndicator />}
              </Pressable>
            </>
          )}
          {isResponse && (
            <View style={styles.responseContainer}>
              {response ? (
                <View style={styles.responseMessage}>
                  <Text style={styles.message}>{message}</Text>
                  <View style={styles.responseItem}>
                    <Text style={styles.responseKey}>Guest: </Text>
                    <Text style={styles.responseValue}>{guest}</Text>
                  </View>
                  <View style={styles.responseItem}>
                    <Text style={styles.responseKey}>To see: </Text>
                    <Text style={styles.responseValue}>
                      {toSee?.firstname + " " + toSee?.lastname}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.responseMessage}>
                  <Text style={styles.responseKey}>{message} </Text>
                </View>
              )}

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 20,
                  backgroundColor: "transparent",
                }}
              >
                {response ? (
                  <>
                    <Pressable
                      style={[
                        styles.btnSubmit,
                        { maxWidth: 230, width: "40%" },
                        !IsGrantingStatus
                          ? { backgroundColor: "#436BAB" }
                          : { backgroundColor: "#F1F5F9" },
                      ]}
                      onPress={() => handleUpdateStatus(inviteCode, "grant")}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          !IsGrantingStatus
                            ? { color: "#FFF" }
                            : { color: "#CBD5E1" },
                        ]}
                      >
                        Allow
                      </Text>
                      {IsGrantingStatus && <ActivityIndicator />}
                    </Pressable>
                    <Pressable
                      style={[
                        styles.btnSubmit,
                        { maxWidth: 230, width: "40%" },
                        !isRejectingStatus
                          ? { backgroundColor: "#f22320" }
                          : { backgroundColor: "#f2a5a4" },
                      ]}
                      onPress={() => handleUpdateStatus(inviteCode, "reject")}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          !isRejectingStatus
                            ? { color: "#FFF" }
                            : { color: "#FFF" },
                        ]}
                      >
                        Reject
                      </Text>
                      {isRejectingStatus && <ActivityIndicator />}
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Pressable style={styles.btnSubmit} onPress={() => reset()}>
                      <Text style={[styles.btnText, { color: "#FFF" }]}>
                        Ok
                      </Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          )}
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
  responseContainer: {
    gap: 20,
    fontFamily: "ManropeSemiBold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "50%",
  },
  responseMessage: {
    fontFamily: "ManropeSemiBold",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 260,
  },
  responseText: {
    fontFamily: "ManropeSemiBold",
    fontSize: 17,
  },
  responseItem: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
  },
  responseKey: {
    fontFamily: "ManropeBold",
    fontSize: 17,
  },
  responseValue: {
    textAlign: "left",
    fontFamily: "ManropeMedium",
    fontSize: 17,
  },
  message: {
    textAlign: "left",
    fontFamily: "ManropeBold",
    fontSize: 17,
    marginBottom: 20,
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
    paddingBottom: 260,
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
    borderRadius: 10,
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
