import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { securityLogin } from "@services/auth";
// import { selectUser } from "@/redux/selectors/auth";
import { Text, View } from "@common/Themed";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { loginSuccess } from "@redux/slice/authSlice";
import { scaleFont } from "../../utils/scaleFont";
import { BaseProps } from "../../types/BaseProps";
// import { loginSuccess } from "@/redux/slice/authSlice";

const SecurityLoginScreen = ({ navigation }: BaseProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErr, setServerErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valueState, setValueState] = useState(false);

  const user = useAppSelector(selectUser);

  console.log("login user data: ", user);

  const dispatch = useAppDispatch();

  // const onCreateUserClick = async (e) => {
  //   try {
  //     setIsLoading(true); // Set loading to true when submitting
  //     const res = await createUser(formData);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 3000);
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };w
  // useEffect(() => {
  //   if (user) {
  //     router.replace("/tenant/home");
  //   }
  // }, [user]);
  const handleLogin = async () => {
    setIsLoading(true);
    setServerErr("");

    try {
      const RESPONSE = await securityLogin({
        password: password,
        email: email,
      });

      console.log(RESPONSE);

      if (RESPONSE?.status === "1" && RESPONSE?.data.role == "security") {
        setIsLoading(false);
        dispatch(loginSuccess(RESPONSE.data));
        navigation.navigate("SecurityStackNavigator");
      } else {
        setIsLoading(false);
        setServerErr(RESPONSE?.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      setServerErr(error.message);
      console.log("error: ", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "data:image/png;base64,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",
          }}
        />

        <Text style={styles.header}>Welcome, Security</Text>
        <Text
          style={{ color: "red", marginBottom: 10, fontFamily: "ManropeBold" }}
        >
          {serverErr}
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Text style={styles.authLink}>Forgot Password?</Text>

        <TouchableOpacity
          style={[
            styles.btn,
            password && email && !isLoading
              ? { backgroundColor: "#436BAB" }
              : { backgroundColor: "#F1F5F9" },
            // (isLoading || !(password && email && houseNumber)) && {
            //   backgroundColor: "#F1F5F9"
            // }
          ]}
          onPress={handleLogin}
          disabled={!password || !email}
        >
          <Text
            style={[
              styles.btnText,
              password && email && !isLoading
                ? { color: "#FFF" }
                : { color: "#CBD5E1" },
            ]}
          >
            Login
          </Text>
          {isLoading && <ActivityIndicator />}
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate("TenantLoginScreen")}
          style={[
            styles.authLink,
            {
              position: "absolute",
              bottom: 50,
              right: "50%",

              transform: [{ translateX: 33 }],
            },
          ]}
        >
          Tenant Login
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 500,
    maxWidth: "100%",
    height: 200,
    resizeMode: "contain", // or 'contain' or 'stretch' or 'center'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: scaleFont(20),
    fontFamily: "ManropeSemiBold",
    color: "#000",

    marginBottom: 20,
  },
  input: {
    fontFamily: "ManropeRegular",
    width: "100%",
    height: 56,
    borderColor: "#E2E8F0",
    borderWidth: 1,
    marginBottom: 20,
    fontSize: scaleFont(16),
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  authLink: {
    fontSize: scaleFont(16),
    fontFamily: "ManropeSemiBold",
    color: "#5A7AAE",
  },
  btn: {
    fontFamily: "ManropeRegular",
    marginTop: 30,
    borderRadius: 8,
    width: "100%",
    height: 56,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  btnText: {
    fontSize: scaleFont(16),
    fontFamily: "ManropeSemiBold",
    color: "#CBD5E1",
  },
});

export default SecurityLoginScreen;
