import React, { useState } from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../../infrastructure/theme/colors";

import { FollowingTab } from "../components/following-tab.components";
import { FollowersTab } from "../components/followers-tab.components";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

export const FollowTabs = ({ newitem, pickedTab }) => {
  const [activeTab, setActiveTab] = useState(pickedTab);

  return (
    <Tab.Navigator
      initialRouteName={activeTab}
      tabBarOptions={{
        activeTintColor: colors.icon.brand,
        inactiveTintColor: colors.icon.secondary,
        showLabel: true,
        labelStyle: {
          textTransform: "none",
          fontFamily: "OpenSans_600SemiBold",
          fontSize: 14,
        },
        indicatorStyle: { width: width / 4, left: width / 8 },
      }}
    >
      <Tab.Screen
        name="Following"
        component={activeTab === "Following" ? FollowingTab : FollowersTab}
        initialParams={{ newitem: newitem }}
        listeners={{ focus: () => setActiveTab("Following") }}
        options={{
          tabBarLabel: "Following",
        }}
      />
      <Tab.Screen
        name="Followers"
        component={activeTab === "Followers" ? FollowersTab : FollowingTab}
        initialParams={{ newitem: newitem }}
        listeners={{ focus: () => setActiveTab("Followers") }}
        options={{
          tabBarLabel: "Followers",
        }}
      />
    </Tab.Navigator>
  );
};
