import React from "react";
import { IconButton } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../theme/colors";

import { MessagesScreen } from "../../features/chat/screens/messages.screen";
import { ConversationScreen } from "../../features/chat/screens/conversation.screen";
import { NewMessageScreen } from "../../features/chat/screens/new-message.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";

const ChatStack = createStackNavigator();

export const ChatNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Messages",
          headerTintColor: colors.text.primary,
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("NewMessage")}
            />
          ),
        })}
      />
      <ChatStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
      <ChatStack.Screen
        name="NewMessage"
        component={NewMessageScreen}
      />
      <ChatStack.Screen
        name="ViewProfile"
        component={ProfileScreen}
      />
    </ChatStack.Navigator>
  );
};
