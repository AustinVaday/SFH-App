import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { colors } from "../../../infrastructure/theme/colors";

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const UsernameTextInput = styled(TextInput).attrs({
  underlineColor: "#cecbce",
  selectionColor: colors.brand.primary,
  theme: {
    colors: {
      primary: "#cecbce",
      placeholder: "#cecbce",
    },
  },
})`
  height: 50px;
  background-color: ${colors.bg.primary};
`;

export const UsernameEditScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [text, setText] = useState(username);

  return (
    <SafeArea>
      <TextInputContainer>
        <UsernameTextInput
          mode="flat"
          placeholder="Username"
          maxLength={24}
          autoFocus={true}
          clearButtonMode="while-editing"
          value={text}
          onChangeText={(value) => setText(value)}
          onSubmitEditing={() => navigation.setParams({ username: text })}
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
    </SafeArea>
  );
};
