import React, { useState } from "react";
import { Button } from "react-native-elements";

import { saveUserField } from "../../services/firebase/users";

import { colors } from "../theme/colors";

export const SaveRightHeader = ({ params, onNavigate }) => {
  const { field, oldValue, newValue } = params;

  const [loading, setLoading] = useState(false);

  const onSave = () => {
    saveUserField(field, newValue).then(() => {
      setLoading(false);
      onNavigate();
    });
  };

  return (
    <Button
      title="Save"
      type="clear"
      titleStyle={{ color: colors.icon.primary }}
      containerStyle={{ marginRight: 4 }}
      onPress={() => {
        setLoading(true);
        onSave();
      }}
      loading={loading}
      disabled={JSON.stringify(oldValue) === JSON.stringify(newValue)}
    />
  );
};
