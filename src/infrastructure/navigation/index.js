import React, { useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppNavigator } from "./app.navigation";
import { AccountNavigator } from "./account.navigation";

import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../services/redux/actions/auth.actions";

import { LoadingScreen } from "../../features/account/screens/loading.screen";

const Stack = createStackNavigator();

export const Navigation = () => {
  const currentUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  if (!currentUserObj.loaded) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUserObj.currentUser === null ? (
          <Stack.Screen
            name="Account"
            component={AccountNavigator}
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
