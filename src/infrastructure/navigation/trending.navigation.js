import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { TrendingScreen } from "../../features/trending/screens/trending.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

const TrendingStack = createStackNavigator();

export const TrendingNavigator = () => {
  return (
    <TrendingStack.Navigator headerMode="none">
      <TrendingStack.Screen name="Trending" component={TrendingScreen} />
      <TrendingStack.Screen name="ViewPosting" component={ViewPostingScreen} />
    </TrendingStack.Navigator>
  );
};
