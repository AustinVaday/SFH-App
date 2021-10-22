import React from "react";

import { Text } from "../../components/typography/text.components";

import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen } from "../../features/post/screens/camera.screen";
import { LibraryScreen } from "../../features/post/screens/library.screen";
import { PostScreen } from "../../features/post/screens/post.screen";
import { PreviewScreen } from "../../features/post/screens/preview.screen";
import { colors } from "../theme/colors";

const PostStack = createStackNavigator();

export const PostNavigator = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Library"
        component={LibraryScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colors.text.primary,
          headerTitle: () => <Text variant="screen_title">New Post</Text>,
        }}
      />
    </PostStack.Navigator>
  );
};
