import React from "react";
import { Dimensions, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Tabs } from "react-native-collapsible-tab-view";

import { colors } from "../../../infrastructure/theme/colors";

const { width } = Dimensions.get("window");

const WIDTH1 = width / 3 - 4;
const WIDTH2 = width / 3 - 4;
const WIDTH3 = width / 3 - 2;
const XWIDTH1 = (width / 3 + 1) * 1;
const XWIDTH2 = (width / 3) * 2;

export const PostsListLoader = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={{ flex: 1 }}>
        <ContentLoader
          width={"100%"}
          height={"100%"}
          style={{
            backgroundColor: colors.bg.secondary,
          }}
        >
          <Rect x="2" y="0" rx="0" ry="0" width={WIDTH1} height="140" />
          <Rect x={XWIDTH1} y="0" rx="0" ry="0" width={WIDTH2} height="140" />
          <Rect x={XWIDTH2} y="0" rx="0" ry="0" width={WIDTH3} height="140" />

          <Rect x="2" y="142" rx="0" ry="0" width={WIDTH1} height="140" />
          <Rect x={XWIDTH1} y="142" rx="0" ry="0" width={WIDTH2} height="140" />
          <Rect x={XWIDTH2} y="142" rx="0" ry="0" width={WIDTH3} height="140" />

          <Rect x="2" y="284" rx="0" ry="0" width={WIDTH1} height="140" />
          <Rect x={XWIDTH1} y="284" rx="0" ry="0" width={WIDTH2} height="140" />
          <Rect x={XWIDTH2} y="284" rx="0" ry="0" width={WIDTH3} height="140" />

          <Rect x="2" y="426" rx="426" ry="0" width={WIDTH1} height="140" />
          <Rect x={XWIDTH1} y="426" rx="0" ry="0" width={WIDTH2} height="140" />
          <Rect x={XWIDTH2} y="426" rx="0" ry="0" width={WIDTH3} height="140" />

          <Rect x="2" y="568" rx="0" ry="0" width={WIDTH1} height="140" />
          <Rect x={XWIDTH1} y="568" rx="0" ry="0" width={WIDTH2} height="140" />
          <Rect x={XWIDTH2} y="568" rx="0" ry="0" width={WIDTH3} height="140" />
        </ContentLoader>
      </View>
    </Tabs.ScrollView>
  );
};
