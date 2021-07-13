import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { AuthenticationsScreen } from "../../features/account/screens/authentications.screen";
import { LoadingScreen } from "../../features/account/screens/loading.screen";
import { ForgotPasswordScreen } from "../../features/account/screens/forgot-password.screen";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => (
  <AccountStack.Navigator headerMode="none">
    <AccountStack.Screen
      name="Loading"
      component={LoadingScreen}
      options={{
        animationEnabled: false,
      }}
    />
    <AccountStack.Screen
      name="Authentications"
      component={AuthenticationsScreen}
      options={{
        animationEnabled: false,
      }}
    />
    <AccountStack.Screen name="Login" component={LoginScreen} />
    <AccountStack.Screen name="Register" component={RegisterScreen} />
    <AccountStack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
  </AccountStack.Navigator>
);
