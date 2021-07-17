import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { colors } from "../../../infrastructure/theme/colors";

const EditNameBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const NameTextInput = styled(TextInput).attrs({
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

export const NameEditScreen = ({ route, navigation }) => {
  const { name } = route.params;
  const [text, setText] = useState(name);

  return (
    <EditNameBackground>
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
    </EditNameBackground>
  );
};
