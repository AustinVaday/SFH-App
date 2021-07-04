import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { InboxScreen } from "../../features/inbox/screens/inbox.screen";
import { ViewGuestProfileScreen } from "../../features/home/screens/view-guest-profile.screen";

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
