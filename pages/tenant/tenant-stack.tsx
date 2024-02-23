import { createStackNavigator } from "@react-navigation/stack";

import { Button, Pressable } from "react-native";
import CreateInvite from "./createInvite";
import AllInvites from "./allInvites";
import TenantHomeScreen from "./home";

const TenantStack = createStackNavigator();

export default function TenantStackNavigator() {
  return (
    <TenantStack.Navigator>
      <TenantStack.Screen
        name="TenantHomeScreen"
        options={{ title: "Home", headerShown: false }}
        component={TenantHomeScreen}
      />
      <TenantStack.Screen
        name="TenantCreateInviteScreen"
        options={{ title: "Create Invites", headerShown: false }}
        component={CreateInvite}
      />
      <TenantStack.Screen
        name="TenantAllInviteScreen"
        options={{ title: "All Invites", headerShown: false }}
        component={AllInvites}
      />
    </TenantStack.Navigator>
  );
}
