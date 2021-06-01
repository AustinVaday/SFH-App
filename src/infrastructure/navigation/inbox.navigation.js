import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { InboxScreen } from "../../screens/InboxScreen";
import { ViewGuestProfileScreen } from "../../screens/ViewGuestProfileScreen";

const InboxStack = createStackNavigator();

export const InboxNavigator = () => {
  return (
    <InboxStack.Navigator headerMode="none">
      <InboxStack.Screen name="Inbox" component={InboxScreen} />
      <InboxStack.Screen
        name="ViewGuestProfile"
        component={ViewGuestProfileScreen}
      />
    </InboxStack.Navigator>
  );
};
