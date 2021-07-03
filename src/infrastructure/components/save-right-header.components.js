import React from "react";
import { Button } from "react-native-paper";

import { colors } from "../theme/colors";

export const SaveRightHeader = ({ onNavigate }) => {
  return (
      <Button
        uppercase={false}
        color={colors.brand.primary}
        contentStyle={{backgroundColor: colors.bg.primary}}
        onPress={() => onNavigate()}
      >
        Save
      </Button>
  );
};
