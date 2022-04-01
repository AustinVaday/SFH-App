import React from "react";
import { Dimensions, View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { colors } from "../../../infrastructure/theme/colors";

const { width, height } = Dimensions.get("window");

const WIDTH1 = width - 70;
const WIDTH2 = WIDTH1 + 50;
const HEIGHT = height / 1.6;
const YHEIGHT1 = HEIGHT + 80;
const YHEIGHT2 = YHEIGHT1 + 20;

export const WordLoader = () => {
  return (
    <View style={{ flex: 1 }}>
      <ContentLoader
        width={"100%"}
        height={"100%"}
        style={{
          backgroundColor: colors.bg.secondary,
        }}
      >
        <Circle cx="25" cy="35" r="20" />
        <Rect x="60" y="17" rx="3" ry="3" width={WIDTH1} height="10" />
        <Rect x="60" y="40" rx="3" ry="3" width={WIDTH1} height="10" />
        <Rect x="10" y="70" rx="3" ry="3" width={WIDTH2} height={HEIGHT} />
        <Rect x="10" y={YHEIGHT1} rx="3" ry="3" width={WIDTH2} height="10" />
        <Rect x="10" y={YHEIGHT2} rx="3" ry="3" width={WIDTH2} height="30" />
      </ContentLoader>
    </View>
  );
};
