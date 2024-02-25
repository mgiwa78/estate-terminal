import * as React from "react";

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
import LoginScreen from "./pages/auth/tenant-login";
import TenantMenu from "./components/tenant/Menu";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/selectors/auth";
import { BaseProps } from "./types/BaseProps";
import TenantHomeScreen from "./pages/tenant/home";
import TenantStackNavigator from "./pages/tenant/tenant-stack";
import SecurityStackNavigator from "./pages/security/security-stack";
import SecurityLoginScreen from "./pages/auth/security-login";

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
              name="TenantLoginScreen"
              options={{ title: "TenantLoginScreen", headerShown: false }}
              component={LoginScreen}
            />
          )}
          {user && (
            <RootStack.Screen
              name="TenantStackNavigator"
              options={{ title: "Tenant Home", headerShown: false }}
              component={TenantStackNavigator}
            />
          )}
          <RootStack.Screen
            name="SecurityLoginScreen"
            options={{ title: "Security Login", headerShown: false }}
            component={SecurityLoginScreen}
          />

          <RootStack.Screen
            name="SecurityStackNavigator"
            options={{ title: "Security Home", headerShown: false }}
            component={SecurityStackNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
