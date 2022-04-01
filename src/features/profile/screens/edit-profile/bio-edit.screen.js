import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import { BIO_MAX_LENGTH, BIO_ROW_LIMIT } from "../../../../utils/constants";

import {
  BioEditBackground,
  TextInputContainer,
  BioTextInput,
} from "./styles/bio-edit.styles";

export const BioEditScreen = ({ route, navigation }) => {
  const { field, bio } = route.params;
  const [text, setText] = useState(bio ? bio : "");

  useEffect(() => {
    navigation.setParams({
      field: field,
      oldValue: bio ? bio : "",
      newValue: text === "" ? null : text,
    });
  }, [text]);

  return (
    <BioEditBackground>
      <TextInputContainer>
        <BioTextInput
          placeholder="Bio"
          maxLength={BIO_MAX_LENGTH}
          multiline={true}
          numberOfLines={BIO_ROW_LIMIT}
          scrollEnabled={false}
          autoFocus={true}
          value={text}
          errorMessage={text.length + "/" + BIO_MAX_LENGTH}
          onChangeText={(value) => {
            if (value.split("\n").length < 5) {
              setText(value);
            } else {
              Toast.show({
                type: "infoMessage",
                props: {
                  message: "Row limit.",
                },
                visibilityTime: 2000,
                topOffset: 45,
              });
            }
          }}
        />
      </TextInputContainer>
    </BioEditBackground>
  );
};
