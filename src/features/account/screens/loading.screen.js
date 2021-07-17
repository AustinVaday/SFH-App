import React from "react";
import { ImageBackground, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components";

import { colors } from "../../../infrastructure/theme/colors";

const LoadingBackground = styled.View`
  flex: 1;
`;

const { height } = Dimensions.get("window");

export const LoadingScreen = () => {
  return (
    <LoadingBackground>
      <ImageBackground
        resizeMode="center"
        source={require("../../../assets/splash/splash.png")}
        style={{ flex: 1 }}
      >
        <ActivityIndicator
          size="large"
          color={colors.brand.primary}
          style={{ flex: 1, top: height * 0.1 }}
        />
      </ImageBackground>
    </LoadingBackground>
  );
};
