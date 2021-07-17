import React from "react";

import {
  createStackNavigator,
} from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import { ViewGuestProfileScreen } from "../../features/home/screens/view-guest-profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

import { ViewPostingLeftHeader } from "../components/view-posting-left-header.components";
import { ViewPostingRightHeader } from "../components/view-posting-right-header.components";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ViewGuestProfile"
        component={ViewGuestProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ViewPosting"
        component={ViewPostingScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: { height: 120 },
          headerTitle: null,
          headerTintColor: "black",
          headerLeft: (props) => (
            <ViewPostingLeftHeader
              props={props}
              user={route.params.user}
              onNavigate={navigation.navigate}
            />
          ),
          headerRight: () => <ViewPostingRightHeader />,
        })}
      />
    </HomeStack.Navigator>
  );
};
