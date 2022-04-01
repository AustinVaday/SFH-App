import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppNavigator } from "./app.navigation";
import { AccountNavigator } from "./account.navigation";
import { IntroductionNavigator } from "./introduction.navigation";

import { LoadingScreen } from "../../features/app/screens/loading.screen";

import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../services/redux/actions/user.actions";

const Stack = createStackNavigator();

export const Navigation = () => {
  const currentUserObj = useSelector((state) => state.user);

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
        ) : currentUserObj.currentUser.isNewUser ? (
          <Stack.Screen
            name="AppIntroduction"
            component={IntroductionNavigator}
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
