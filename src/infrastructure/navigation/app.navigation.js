import React from "react";

import { AppTabsNavigator } from "./app-tabs.navigation";

import { createStackNavigator } from "@react-navigation/stack";

import { ConversationScreen } from "../../features/chat/screens/conversation.screen";
import { ViewPostScreen } from "../../features/app/screens/view-post.screen";

import { colors } from "../theme/colors";
import { IconButton } from "react-native-paper";
import { Text } from "../../components/typography/text.components";

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={AppTabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ViewPost"
        component={ViewPostScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Text variant="screen_title">{route.params.user}</Text>
          ),
          headerTintColor: colors.text.primary,
          headerRight: () => (
            <IconButton
              icon="dots-horizontal"
              underlayColor="transparent"
              onPress={() => {}}
            />
          ),
        })}
      />
    </AppStack.Navigator>
  );
};
