import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../screens/HomeScreen";
import { ViewPostingScreen } from "../../screens/ViewPostingScreen";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ViewPosting" component={ViewPostingScreen} />
    </HomeStack.Navigator>
  );
};
