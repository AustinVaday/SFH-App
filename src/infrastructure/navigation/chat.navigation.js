import React from "react";
import { IconButton } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../theme/colors";
import { Text } from "../../components/typography/text.components";

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
          headerTitle: () => <Text variant="screen_title">Messages</Text>,
          headerTintColor: colors.text.primary,
          headerRight: () => (
            <IconButton
              icon="plus"
              onPress={() => navigation.navigate("NewMessage")}
            />
          ),
        })}
      />
      {/* <ChatStack.Screen
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
            <IconButton icon="dots-horizontal" onPress={() => {}} />
          ),
        })}
      /> */}
      <ChatStack.Screen
        name="NewMessage"
        component={NewMessageScreen}
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: () => <Text variant="screen_title">New Message</Text>,
          headerTintColor: colors.text.primary,
        })}
      />
      <ChatStack.Screen name="ViewProfile" component={ProfileScreen} />
    </ChatStack.Navigator>
  );
};
