import React from "react";
import { Button } from "react-native-elements";

import { saveUserField } from "../../services/user";

import { colors } from "../theme/colors";

export const SaveRightHeader = ({ params, onNavigate }) => {
  const { field, value } = params;

  const onSave = () => {
    saveUserField(field, value).then(() => onNavigate());
  };

  return (
    <Button
      title="Save"
      titleStyle={{ color: colors.icon.primary }}
      onPress={() => onSave()}
    />
  );
};
