import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/account/screens/login/login.screen";
import { AuthenticationsScreen } from "../../features/account/screens/authentications.screen";
import { ForgotPasswordScreen } from "../../features/account/screens/login/forgot-password.screen";
import { SignupEmailScreen } from "../../features/account/screens/signup/signup-email.screen";
import { SignupPasswordScreen } from "../../features/account/screens/signup/signup-password.screen";
import { EmailSentScreen } from "../../features/account/screens/login/email-sent.screen";

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
        headerLeftContainerStyle: { paddingLeft: 10 },
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
        headerLeftContainerStyle: { paddingLeft: 8 },
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
        headerLeftContainerStyle: { paddingLeft: 8 },
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
        headerLeftContainerStyle: { paddingLeft: 8 },
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Reset</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <AccountStack.Screen
      name="EmailSent"
      component={EmailSentScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
    />
  </AccountStack.Navigator>
);
