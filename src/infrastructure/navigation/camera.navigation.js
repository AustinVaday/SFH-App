import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen } from "../../features/upload/screens/camera.screen";
import { LibraryScreen } from "../../features/upload/screens/library.screen";
import { UploadScreen } from "../../features/upload/screens/upload.screen";

const CameraStack = createStackNavigator();

export const CameraNavigator = () => {
  return (
    <CameraStack.Navigator headerMode="none">
      <CameraStack.Screen name="Library" component={LibraryScreen} />
      <CameraStack.Screen name="Camera" component={CameraScreen} />
      <CameraStack.Screen name="Upload" component={UploadScreen} />
    </CameraStack.Navigator>
  );
};
