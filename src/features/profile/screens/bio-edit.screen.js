import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { colors } from "../../../infrastructure/theme/colors";

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const BioTextInput = styled(TextInput).attrs({
  underlineColor: "#cecbce",
  selectionColor: colors.brand.primary,
  theme: {
    colors: {
      primary: "#cecbce",
      placeholder: "#cecbce",
    },
  },
})`
  min-height: 120px;
  background-color: ${colors.bg.primary};
  padding-right: 12px;
  padding-left: 12px;
  flex: 1;
`;

export const BioEditScreen = ({ route, navigation }) => {
  const { bio } = route.params;
  const [text, setText] = useState(bio);

  return (
    <SafeArea>
      <TextInputContainer>
        <BioTextInput
          mode="flat"
          placeholder="Bio"
          maxLength={80}
          multiline={true}
          numberOfLines={4}
          scrollEnabled={false}
          autoFocus={true}
          value={text}
          onChangeText={(value) => {
            if (value.split("\n").length < 5) {
              setText(value);
            } else {
              console.log("Row limit");
            }
          }}
          onSubmitEditing={() => navigation.setParams({ bio: text })}
          style={{ paddingHorizontal: 0 }}
        />
        <HelperText type="info" style={{ paddingTop: 10 }}>
          {text.length}/80
        </HelperText>
      </TextInputContainer>
    </SafeArea>
  );
};
