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
import { useColorScheme } from "@common/useColorScheme";
import { persistor, store } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "@common/Themed";

export default function RootLayout() {
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

  return (
    <Text style={{ marginHorizontal: 100, marginVertical: 100 }}>index</Text>
  );
}
