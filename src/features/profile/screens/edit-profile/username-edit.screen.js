import React, { useState, useEffect } from "react";

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
          maxLength={24}
          autoFocus={true}
          clearButtonMode="while-editing"
          errorMessage={text.length + "/24"}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </TextInputContainer>
    </UsernameEditBackground>
  );
};
