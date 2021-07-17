import React from "react";
import { Button } from "react-native-paper";

import { colors } from "../theme/colors";

export const SaveRightHeader = ({ onNavigate }) => {
  return (
      <Button
        uppercase={false}
        color={colors.ui.quaternary}
        labelStyle={{color: colors.icon.brand}}
        onPress={() => onNavigate()}
      >
        Save
      </Button>
  );
};
