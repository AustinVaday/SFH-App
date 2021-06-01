import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../screens/LoginScreen";
import { SignupScreen } from "../../screens/SignupScreen";
import { FederatedLoginScreen } from "../../screens/FederatedLoginScreen";
import { LoadingScreen } from "../../screens/LoadingScreen";
import { ForgotPasswordScreen } from "../../screens/ForgotPasswordScreen";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => (
  <AccountStack.Navigator headerMode="none">
    <AccountStack.Screen name="Loading" component={LoadingScreen} />
    <AccountStack.Screen name="Login" component={LoginScreen} />
    <AccountStack.Screen name="Signup" component={SignupScreen} />
    <AccountStack.Screen
      name="FederatedLogin"
      component={FederatedLoginScreen}
    />
    <AccountStack.Screen
      name="FrgotPassword"
      component={ForgotPasswordScreen}
    />
  </AccountStack.Navigator>
);
