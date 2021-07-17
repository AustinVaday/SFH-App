import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import styled from "styled-components";

import { colors } from "../../../infrastructure/theme/colors";

const EditBioBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TextInputContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const BioTextInput = styled(TextInput).attrs({
  selectionColor: colors.brand.primary,
  theme: {
    colors: {
      primary: colors.ui.quinary,
      placeholder: colors.ui.quinary,
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
    <EditBioBackground>
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
    </EditBioBackground>
  );
};
