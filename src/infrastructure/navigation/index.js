import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppNavigator } from "./app.navigation";
import { AccountNavigator } from "./account.navigation";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

import { LoadingScreen } from "../../features/account/screens/loading.screen";

const Stack = createStackNavigator();

export const Navigation = () => {
  const { isAuthenticated, isLoading } = useContext(AuthenticationContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="Account"
            component={AccountNavigator}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
