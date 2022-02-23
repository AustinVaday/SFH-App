import React from "react";
import { Dimensions, View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { Tabs } from "react-native-collapsible-tab-view";

import { colors } from "../../../infrastructure/theme/colors";

const { width } = Dimensions.get("window");

const WIDTH1 = width / 3;
const WIDTH2 = width / 4;
const XWIDTH1 = width / 4;
const XWIDTH2 = width - 125;

export const FollowsListLoader = () => {
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
          <Circle cx="40" cy="40" r="30" />
          <Rect x={XWIDTH1} y="35" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="30" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="120" r="30" />
          <Rect x={XWIDTH1} y="115" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="110" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="200" r="30" />
          <Rect x={XWIDTH1} y="195" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="190" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="280" r="30" />
          <Rect x={XWIDTH1} y="275" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="270" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="360" r="30" />
          <Rect x={XWIDTH1} y="355" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="350" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="440" r="30" />
          <Rect x={XWIDTH1} y="435" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="430" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="520" r="30" />
          <Rect x={XWIDTH1} y="515" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="510" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="600" r="30" />
          <Rect x={XWIDTH1} y="595" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="590" rx="5" ry="5" width={WIDTH2} height="20" />

          <Circle cx="40" cy="680" r="30" />
          <Rect x={XWIDTH1} y="675" rx="5" ry="5" width={WIDTH1} height="10" />
          <Rect x={XWIDTH2} y="670" rx="5" ry="5" width={WIDTH2} height="20" />
        </ContentLoader>
      </View>
    </Tabs.ScrollView>
  );
};
