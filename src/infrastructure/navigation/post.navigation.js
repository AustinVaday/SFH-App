import React from "react";
import styled from "styled-components/native";

import { Text } from "../../components/typography/text.components";

import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen } from "../../features/post/screens/camera.screen";
import { LibraryScreen } from "../../features/post/screens/library.screen";
import { PostScreen } from "../../features/post/screens/post.screen";

const PostStack = createStackNavigator();

const NewPostText = styled(Text)`
  font-size: 20px;
`;

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
        name="Post"
        component={PostScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => <NewPostText>New Post</NewPostText>,
        }}
      />
    </PostStack.Navigator>
  );
};
