import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { TrendingScreen } from "../../features/trending/screens/trending.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { ViewPostingScreen } from "../../features/home/screens/view-posting.screen";

import { Text } from "../../components/typography/text.components";

const TrendingStack = createStackNavigator();

export const TrendingNavigator = () => {
  return (
    <TrendingStack.Navigator>
      <TrendingStack.Screen
        name="Trending"
        component={TrendingScreen}
        options={{ headerShown: false }}
      />
      <TrendingStack.Screen
        name="GuestProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Text variant="screen_title">{route.params.guestUsername}</Text>
          ),
        })}
      />
      <TrendingStack.Screen
        name="ViewPosting"
        component={ViewPostingScreen}
        options={{ headerShown: false }}
      />
    </TrendingStack.Navigator>
  );
};
