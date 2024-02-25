import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Fonts from "@constants/Fonts";
import { useColorScheme } from "@common/useColorScheme";  `GRH7UJy6\ { persistor, store } from "@redux/store";
import { Text, View } from "@common/Themed";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

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
