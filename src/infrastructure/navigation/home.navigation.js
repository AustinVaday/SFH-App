import React from "react";
import { Image } from "react-native";
import { IconButton } from "react-native-paper";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import { ActivityScreen } from "../../features/home/screens/activity.screen";
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
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="screen_title">Explore</Text>,
          headerTintColor: colors.text.primary,
          headerLeft: () => (
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/icons/sfh-logo-nobg.png")}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="bell-outline"
              onPress={() => navigation.navigate("Activity")}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="screen_title">Activity</Text>,
          headerTintColor: colors.text.primary,
        })}
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
          headerTintColor: colors.text.primary,
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
