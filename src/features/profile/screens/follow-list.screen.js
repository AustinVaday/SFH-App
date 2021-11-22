import React from "react";

import { FollowTabs } from "../navigators/follow-tabs.navigator";

export const FollowListScreen = ({ route }) => {
  const { users, tab } = route.params;

  return <FollowTabs newitem={users} pickedTab={tab} />;
};
