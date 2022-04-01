import React from "react";
import { ActivityIndicator } from "react-native";

import { colors } from "../../infrastructure/theme/colors";

export const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      size="large"
      color={colors.ui.lightergray}
      style={{ flexGrow: 1 }}
    />
  );
};
