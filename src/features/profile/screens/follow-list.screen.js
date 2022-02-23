import React from "react";
import { Dimensions } from "react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";

import { colors } from "../../../infrastructure/theme/colors";
import { FollowingTab } from "../components/following-tab.components";
import { FollowersTab } from "../components/followers-tab.components";

const { width } = Dimensions.get("window");

export const FollowListScreen = ({ route, navigation }) => {
  const { uid, isOtherUser, tab } = route.params;

  return (
    <Tabs.Container
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          activeColor={colors.icon.primary}
          inactiveColor={colors.icon.lightgray}
          indicatorStyle={{ width: width / 4, left: width / 8 }}
        />
      )}
      lazy={true}
      containerStyle={{ backgroundColor: colors.bg.secondary }}
      // cancelLazyFadeIn={true}
      initialTabName={tab}
      headerContainerStyle={{
        shadowOpacity: 0,
        borderBottomWidth: 0.2,
        borderColor: colors.ui.lightergray,
      }}
    >
      <Tabs.Tab name="Following" label="Following">
        <FollowingTab
          uid={uid}
          isOtherUser={isOtherUser}
          navigation={navigation}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Followers" label="Followers">
        <FollowersTab isOtherUser={isOtherUser} navigation={navigation} />
      </Tabs.Tab>
    </Tabs.Container>
  );
};
