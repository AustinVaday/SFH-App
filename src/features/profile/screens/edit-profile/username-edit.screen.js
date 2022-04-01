import React, { useState, useEffect } from "react";

import { USERNAME_MAX_LENGTH } from "../../../../utils/constants";

import {
  UsernameEditBackground,
  TextInputContainer,
  UsernameTextInput,
} from "./styles/username-edit.styles";

export const UsernameEditScreen = ({ route, navigation }) => {
  const { field, username } = route.params;
  const [text, setText] = useState(username);

  useEffect(() => {
    navigation.setParams({ field: field, value: text });
  }, [text]);

  return (
    <UsernameEditBackground>
      <TextInputContainer>
        <UsernameTextInput
          placeholder="Username"
          maxLength={USERNAME_MAX_LENGTH}
          autoFocus={true}
          clearButtonMode="while-editing"
          errorMessage={text.length + "/" + USERNAME_MAX_LENGTH}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </TextInputContainer>
    </UsernameEditBackground>
  );
};
