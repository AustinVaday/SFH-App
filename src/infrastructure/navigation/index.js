import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigation";
import { AccountNavigator } from "./account.navigation";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
