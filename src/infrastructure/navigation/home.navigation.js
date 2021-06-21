import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import { ViewGuestProfileScreen } from "../../features/home/screens/view-guest-profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ViewGuestProfile" component={ViewGuestProfileScreen} />
      <HomeStack.Screen name="ViewPosting" component={ViewPostingScreen} />
    </HomeStack.Navigator>
  );
};
