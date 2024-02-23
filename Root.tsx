import * as React from "react";
// import "react-native-gesture-handler";

import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Fonts from "@constants/Fonts";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./pages/auth/login";
import TenantMenu from "./components/tenant/Menu";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { BaseProps } from "./types/BaseProps";
import TenantHomeScreen from "./pages/tenant/home";
import TenantStackNavigator from "./pages/tenant/tenant-stack";
import SecurityStackNavigator from "./pages/security/security-stack";

export default function RootLayout() {
  const RootStack = createStackNavigator();
  const user = useAppSelector(selectUser);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (user) {
  //       navigation.navigate("Login");
  //     } else {
  //       navigation.navigate("Tenant");
  //     }
  //   }, 2000);
  // }, []);

  const [loaded, error] = useFonts({
    ...Fonts,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          {!user && (
            <RootStack.Screen
              name="Login"
              options={{ title: "Login", headerShown: false }}
              component={LoginScreen}
            />
          )}
          {/* {user && (
            <RootStack.Screen
              name="TenantStackNavigator"
              options={{ title: "Tenant Home", headerShown: false }}
              component={TenantStackNavigator}
            />
          )} */}
          {user && (
            <RootStack.Screen
              name="SecurityStackNavigator"
              options={{ title: "Security Home", headerShown: false }}
              component={SecurityStackNavigator}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
