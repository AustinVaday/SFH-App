import React, { useState, useEffect } from "react";

import {
  BioEditBackground,
  TextInputContainer,
  BioTextInput,
} from "./styles/bio-edit.styles";

export const BioEditScreen = ({ route, navigation }) => {
  const { field, bio } = route.params;
  const [text, setText] = useState(bio);

  useEffect(() => {
    navigation.setParams({ field: field, value: text });
  }, [text]);

  return (
    <BioEditBackground>
      <TextInputContainer>
        <BioTextInput
          placeholder="Bio"
          maxLength={80}
          multiline={true}
          numberOfLines={4}
          scrollEnabled={false}
          autoFocus={true}
          value={text}
          errorMessage={text.length + "/80"}
          onChangeText={(value) => {
            if (value.split("\n").length < 5) {
              setText(value);
            } else {
              console.log("Row limit");
            }
          }}
        />
      </TextInputContainer>
    </BioEditBackground>
  );
};
