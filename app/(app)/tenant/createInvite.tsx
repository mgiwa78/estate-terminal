import { Text, View } from "@common/Themed";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import Invites from "../../../components/tenant/Invite";
import TenantMenu from "../../../components/tenant/Menu";
import Header from "../../../components/Header";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAddInviteMutation } from "@toolkit/invitesApi";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { isLoading } from "expo-font";
import { scaleFont } from "../../../utils/scaleFont";

const CreateInvite = () => {
  const [codeType, setCodeType] = useState<"one-time" | "recurring" | "">(""); // Default invite type
  const [guestName, setGuestName] = useState("");
  const [dateExpected, setDateExpected] = useState(new Date());
  const [timeExpected, setTimeExpected] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [validUntil, setValidUntil] = useState(new Date());
  const [showValidUntil, setValidUntilShow] = useState(false);

  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onValidUntilChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setValidUntilShow(false);
    setValidUntil(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const [createInvite, { isLoading: isCreating, isSuccess, error, data }] =
    useAddInviteMutation();
  if (isSuccess) {
    console.log(data);
    router.push("/tenant/allInvites");
  }
  if (error) {
    console.log(error);
  }

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
          pageTitle="Create Invite"
          backTo="/tenant/home"
        />
        <View style={styles.body} darkColor="#000">
          <View style={styles.top}>
            <Text style={styles.inputLabel}>
              Confirm details and create invite
            </Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Type</Text>

              <View style={styles.picker}>
                <Picker
                  selectedValue={codeType}
                  onValueChange={(itemValue) => setCodeType(itemValue)}
                >
                  <Picker.Item label="Select code type" value="" />
                  <Picker.Item label="One-time" value="onetime" />
                  <Picker.Item label="Recurring" value="recurring" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Guest name</Text>
              <TextInput
                style={styles.input}
                value={guestName}
                onChangeText={setGuestName}
                placeholder="Guest Name"
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Date Expected</Text>
              <Pressable style={styles.input} onPress={() => showDatepicker()}>
                <Text>{date.toLocaleDateString()}</Text>
              </Pressable>
            </View>
            {codeType === "recurring" ? (
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Valid Untill</Text>
                <Pressable
                  style={styles.input}
                  onPress={() => setValidUntilShow(true)}
                >
                  <Text>{validUntil.toLocaleDateString()}</Text>
                </Pressable>
              </View>
            ) : (
              ""
            )}
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Time Expected</Text>
              <Pressable style={styles.input} onPress={() => showTimepicker()}>
                <Text>{date.toLocaleTimeString()}</Text>
              </Pressable>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            {showValidUntil && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onValidUntilChange}
              />
            )}
          </View>
          <View style={styles.bottom}></View>

          <Pressable
            style={[
              styles.btnSubmit,
              guestName && date && codeType && !isCreating
                ? { backgroundColor: "#436BAB" }
                : { backgroundColor: "#F1F5F9" },
            ]}
            onPress={() =>
              guestName && date && codeType && !isCreating
                ? createInvite({
                    id: user?._id || "0",
                    guest: guestName,
                    codeType,
                    ...(codeType === "recurring" && {
                      validUntil: date.toLocaleDateString(),
                    }),
                    dateExpected: date.toLocaleDateString(),
                    timeExpected: date.toLocaleTimeString(),
                  })
                : null
            }
          >
            <Text
              style={[
                styles.btnText,
                guestName && date && codeType && !isCreating
                  ? { color: "#FFF" }
                  : { color: "#CBD5E1" },
              ]}
            >
              Create
            </Text>
            {isCreating && <ActivityIndicator />}
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
    marginTop: 8,
    height: 57,
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

export default CreateInvite;
