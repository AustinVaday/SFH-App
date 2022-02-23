import React from "react";
import { Dimensions, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

import { colors } from "../../../infrastructure/theme/colors";

const { width, height } = Dimensions.get("window");

const WIDTH = width / 2 - 8;
const XWIDTH = width / 2 + 2;
const HEIGHT = height / 2.5;
const YHEIGHT1 = height / 2.5 + 10;
const YHEIGHT2 = YHEIGHT1 * 2 - 5;

export const DiscoverListLoader = () => {
  return (
    <View style={{ flex: 1 }}>
      <ContentLoader
        width={"100%"}
        height={"100%"}
        style={{
          backgroundColor: colors.bg.secondary,
        }}
      >
        <Rect x="5" y="5" rx="3" ry="3" width={WIDTH} height={HEIGHT} />
        <Rect x={XWIDTH} y="5" rx="3" ry="3" width={WIDTH} height={HEIGHT} />

        <Rect x="5" y={YHEIGHT1} rx="3" ry="3" width={WIDTH} height={HEIGHT} />
        <Rect
          x={XWIDTH}
          y={YHEIGHT1}
          rx="3"
          ry="3"
          width={WIDTH}
          height={HEIGHT}
        />

        <Rect x="5" y={YHEIGHT2} rx="3" ry="3" width={WIDTH} height={HEIGHT} />
        <Rect
          x={XWIDTH}
          y={YHEIGHT2}
          rx="3"
          ry="3"
          width={WIDTH}
          height={HEIGHT}
        />
      </ContentLoader>
    </View>
  );
};
