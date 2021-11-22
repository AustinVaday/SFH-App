import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/account/screens/login.screen";
import { AuthenticationsScreen } from "../../features/account/screens/authentications.screen";
import { ForgotPasswordScreen } from "../../features/account/screens/forgot-password.screen";
import { SignupEmailScreen } from "../../features/account/screens/signup-email.screen";
import { SignupPasswordScreen } from "../../features/account/screens/signup-password.screen";
import { SignupNameScreen } from "../../features/account/screens/signup-name.screen";
import { SignupUsernameScreen } from "../../features/account/screens/signup-username.screen";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

const AccountStack = createStackNavigator();

export const AccountNavigator = (props) => (
  <AccountStack.Navigator>
    <AccountStack.Screen
      name="Authentications"
      component={AuthenticationsScreen}
      navigation={props.navigation}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
    <AccountStack.Screen
      name="Login"
      component={LoginScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Login</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="SignupEmail"
      component={SignupEmailScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Sign up</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="SignupPassword"
      component={SignupPasswordScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Sign up</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="SignupName"
      component={SignupNameScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Sign up</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="SignupUsername"
      component={SignupUsernameScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Sign up</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Reset</Text>,
        headerTintColor: colors.text.black,
      })}
    />
  </AccountStack.Navigator>
);
