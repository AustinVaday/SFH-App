import React from "react";

import { FollowTabs } from "../components/follow-tabs.navigator";

import { SafeArea } from "../../../components/utilities/safe-area.components";

export const FollowListScreen = ({ route }) => {
  const { item, tab } = route.params;

  return (
    <SafeArea>
      <FollowTabs newitem={item} pickedTab={tab} />
    </SafeArea>
  );
};
