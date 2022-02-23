import React from "react";

import {
  LoadingBackground,
  LogoSplash,
  LoadingIcon,
} from "./styles/loading.styles";

export const LoadingScreen = () => {
  return (
    <LoadingBackground>
      <LogoSplash source={require("../../../assets/splash/splash.png")}>
        <LoadingIcon />
      </LogoSplash>
    </LoadingBackground>
  );
};
