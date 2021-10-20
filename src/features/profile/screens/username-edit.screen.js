import React, { useState, useEffect } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { colors } from "../../../infrastructure/theme/colors";

const EditUsernameBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const UsernameTextInput = styled(TextInput).attrs({
  selectionColor: colors.brand.primary,
  theme: {
    colors: {
      primary: colors.ui.quinary,
      placeholder: colors.ui.quinary,
    },
  },
})`
  height: 50px;
  background-color: ${colors.bg.primary};
`;

export const UsernameEditScreen = ({ route, navigation }) => {
  const { field, username } = route.params;
  const [text, setText] = useState(username);

  useEffect(() => {
    navigation.setParams({ field: field, value: text });
  }, [text]);

  return (
    <EditUsernameBackground>
      <TextInputContainer>
        <UsernameTextInput
          mode="flat"
          placeholder="Username"
          maxLength={24}
          autoFocus={true}
          clearButtonMode="while-editing"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <HelperText type="info" style={{ paddingTop: 10 }}>
          {text.length}/24
        </HelperText>
        <HelperText
          type="info"
          style={{ paddingTop: 10, paddingHorizontal: 0 }}
        >
          Only contain letters, numbers, underscores, and periods.
        </HelperText>
      </TextInputContainer>
    </EditUsernameBackground>
  );
};
