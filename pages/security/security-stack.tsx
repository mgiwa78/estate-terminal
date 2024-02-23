import { createStackNavigator } from "@react-navigation/stack";

import SecurityHome from "./home";
import SecurityVerifyInviteScreen from "./verifyInvite";

const SecurityStack = createStackNavigator();

export default function SecurityStackNavigator() {
  return (
    <SecurityStack.Navigator>
      <SecurityStack.Screen
        name="SecurityHomeScreen"
        options={{ title: "Home", headerShown: false }}
        component={SecurityHome}
      />
      <SecurityStack.Screen
        name="SecurityVerifyInviteScreen"
        options={{ title: "Verify Invite", headerShown: false }}
        component={SecurityVerifyInviteScreen}
      />
    </SecurityStack.Navigator>
  );
}
