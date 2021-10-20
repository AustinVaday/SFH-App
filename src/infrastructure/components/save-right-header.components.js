import React from "react";
import { Button } from "react-native-paper";

import { saveUserField } from "../../services/user";

import { colors } from "../theme/colors";

export const SaveRightHeader = ({ params, onNavigate }) => {
  const { field, value } = params;

  const onSave = () => {
    saveUserField(field, value).then(() => onNavigate());
  };

  return (
    <Button
      uppercase={false}
      color={colors.ui.quaternary}
      labelStyle={{ color: colors.icon.brand }}
      onPress={() => onSave()}
    >
      Save
    </Button>
  );
};
