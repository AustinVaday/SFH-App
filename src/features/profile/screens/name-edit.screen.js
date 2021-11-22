import React, { useState, useEffect } from "react";

import {
  NameEditBackground,
  TextInputContainer,
  NameTextInput,
} from "../styles/name-edit.styles";

export const NameEditScreen = ({ route, navigation }) => {
  const { field, name } = route.params;
  const [text, setText] = useState(name);

  useEffect(() => {
    navigation.setParams({ field: field, value: text });
  }, [text]);

  return (
    <NameEditBackground>
      <TextInputContainer>
        <NameTextInput
          placeholder="Name"
          maxLength={30}
          autoFocus={true}
          clearButtonMode="while-editing"
          value={text}
          errorMessage={text.length + "/30"}
          onChangeText={(value) => {
            setText(value);
          }}
        />
      </TextInputContainer>
    </NameEditBackground>
  );
};
