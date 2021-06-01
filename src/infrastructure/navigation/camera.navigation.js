import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen } from "../../screens/CameraScreen";
import { LibraryScreen } from "../../screens/LibraryScreen";
import { UploadScreen } from "../../screens/UploadScreen";

const CameraStack = createStackNavigator();

export const CameraNavigator = () => {
  return (
    <CameraStack.Navigator headerMode="none">
      <CameraStack.Screen name="Camera" component={CameraScreen} />
      <CameraStack.Screen name="Library" component={LibraryScreen} />
      <CameraStack.Screen name="Upload" component={UploadScreen} />
    </CameraStack.Navigator>
  );
};
