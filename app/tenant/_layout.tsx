import Fonts from "@constants/Fonts";
import Styles from "@constants/Styles";
import { store } from "@redux/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";

export default function () {
  // const [stateLoaded, setStateLoaded] = useState(false);
  const [fontsLoaded] = useFonts(Fonts);

  // Callback function to hide the splash screen when layout is triggered
  // const onLayout = useCallback(() => {
  //   SplashScreen.hideAsync();
  // }, []);

  // Callback function executed before the persist gate is lifted
  // const onBeforeLimit = useCallback(() => setStateLoaded(true), []);

  // const colorScheme = useColorScheme();

  // const navigationBarColor = useThemeColor("background");

  return (
    // <Provider store={store}>
    <>
      {fontsLoaded && (
        // <ThemeProvider
        //   value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        // >
        // <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
        //   </ThemeProvider>
        // </GestureHandlerRootView>
      )}
    </>
    // </Provider>
  );
}
