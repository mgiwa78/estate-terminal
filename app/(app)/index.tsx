import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Fonts from "@constants/Fonts";
import { useColorScheme } from "@common/useColorScheme";
import { persistor, store } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text, View } from "@common/Themed";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        router.push("/tenant/home");
      } else {
        router.push("/auth/login");
      }
    }, 2000);
  }, []);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
