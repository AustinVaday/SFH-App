import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { colors } from "../../../infrastructure/theme/colors";

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const NameTextInput = styled(TextInput).attrs({
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

export const NameEditScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const [text, setText] = useState(name);

  return (
    <SafeArea>
      <TextInputContainer>
        <NameTextInput
          mode="flat"
          placeholder="Name"
          maxLength={30}
          autoFocus={true}
          clearButtonMode="while-editing"
          value={text}
          onChangeText={(value) => setText(value)}
          onSubmitEditing={() => navigation.setParams({ name: text })}
        />
        <HelperText type="info" style={{ paddingTop: 10 }}>
          {text.length}/30
        </HelperText>
      </TextInputContainer>
    </SafeArea>
  );
};
