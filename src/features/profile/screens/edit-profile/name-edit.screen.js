import React, { useState, useEffect } from "react";

import { DISPLAYNAME_MAX_LENGTH } from "../../../../utils/constants";

import {
  NameEditBackground,
  TextInputContainer,
  NameTextInput,
} from "./styles/name-edit.styles";

export const NameEditScreen = ({ route, navigation }) => {
  const { field, name } = route.params;
  const [text, setText] = useState(name);

  useEffect(() => {
    navigation.setParams({ field: field, oldValue: name, newValue: text });
  }, [text]);

  return (
    <NameEditBackground>
      <TextInputContainer>
        <NameTextInput
          placeholder="Name"
          maxLength={DISPLAYNAME_MAX_LENGTH}
          autoFocus={true}
          clearButtonMode="while-editing"
          value={text}
          errorMessage={text.length + "/" + DISPLAYNAME_MAX_LENGTH}
          onChangeText={(value) => {
            setText(value);
          }}
        />
      </TextInputContainer>
    </NameEditBackground>
  );
};
