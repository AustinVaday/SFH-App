import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { CreateNameScreen } from "../../features/account/screens/new-user/create-name.screen";
import { CreateUsernameScreen } from "../../features/account/screens/new-user/create-username.screen";
import { IntroductionScreen } from "../../features/account/screens/new-user/introduction.screen";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

const IntroductionStack = createStackNavigator();

export const IntroductionNavigator = (props) => (
  <IntroductionStack.Navigator>
    <IntroductionStack.Screen
      name="CreateName"
      component={CreateNameScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Create Name</Text>,
        headerTintColor: colors.text.black,
        animationEnabled: false,
      })}
    />
    <IntroductionStack.Screen
      name="CreateUsername"
      component={CreateUsernameScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: true,
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerBackTitleVisible: false,
        headerTitle: () => <Text variant="navbar_title">Create Username</Text>,
        headerTintColor: colors.text.black,
      })}
    />
    <IntroductionStack.Screen
      name="Introduction"
      component={IntroductionScreen}
      navigation={props.navigation}
      options={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
    />
  </IntroductionStack.Navigator>
);
