import { Text, View } from "@common/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import Invites from "../../components/tenant/Invite";
import TenantMenu from "../../components/tenant/Menu";
import Header from "../../components/Header";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateInvite = () => {
  const [inviteType, setInviteType] = useState("one-time"); // Default invite type
  const [guestName, setGuestName] = useState("");
  const [validUntil, setValidUntil] = useState(new Date());
  const [dateExpected, setDateExpected] = useState(new Date());
  const [timeExpected, setTimeExpected] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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
        <View style={styles.body}>
          <View style={styles.top}>
            <Text style={styles.inputLabel}>
              Confirm details and create invite
            </Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Type</Text>

              <View style={styles.picker}>
                <Picker
                  selectedValue={inviteType}
                  onValueChange={(itemValue) => setInviteType(itemValue)}
                >
                  <Picker.Item label="One-time" value="one-time" />
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
          </View>
          <View style={styles.bottom}></View>

          <Pressable
            style={styles.btnSubmit}
            onPress={() => {
              // Handle form submission
              console.log("Form submitted!");
              console.log("Invite Type:", inviteType);
              console.log("Guest Name:", guestName);
              console.log("Valid Until:", validUntil);
              console.log("Date Expected:", dateExpected);
              console.log("Time Expected:", timeExpected);
            }}
          >
            <Text style={styles.btnText}>Create</Text>
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
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    gap: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
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
    fontSize: 14,
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
    fontSize: 14,
    fontFamily: "ManropeMedium",
    borderRadius: 15,
  },
  inputLabel: {
    fontFamily: "ManropeSemiBold",
    fontSize: 12,
    width: "100%",
    color: "#989898",
  },
  btnSubmit: {
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    fontSize: 15,
    color: "#fff",
  },
});

export default CreateInvite;
