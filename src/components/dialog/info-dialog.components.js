import React from "react";

import { Text } from "../typography/text.components";

import {
  DialogButton,
  Dialog,
  DialogButtonsContainer,
  TextsContainer,
} from "./info-dialog.styles";

export default InfoDialog = (props) => {
  console.log(props.thirdButtonText);
  const onFirstButtonPress = () => {
    props.onPressFirst();
  };

  const onSecondButtonPress = () => {
    props.onPressSecond();
  };

  const onThirdButtonPress = () => {
    props.onPressThird();
  };

  const onFourthButtonPress = () => {
    props.onPressFourth();
  };

  return (
    <Dialog
      isVisible={props.displayAlert}
      onBackdropPress={props.onPressBackdrop}
    >
      <TextsContainer>
        <Text variant="dialog_title">{props.title}</Text>
        <Text variant="dialog_message">{props.message}</Text>
      </TextsContainer>
      <DialogButtonsContainer>
        {props.fourthButtonText && (
          <DialogButton onPress={onFourthButtonPress}>
            <Text variant="dialog_buttonText">{props.fourthButtonText}</Text>
          </DialogButton>
        )}
        {props.thirdButtonText && (
          <DialogButton onPress={onThirdButtonPress}>
            <Text variant="dialog_buttonText">{props.thirdButtonText}</Text>
          </DialogButton>
        )}
        {props.secondButtonText && (
          <DialogButton onPress={onSecondButtonPress}>
            <Text variant="dialog_buttonText">{props.secondButtonText}</Text>
          </DialogButton>
        )}
        <DialogButton onPress={onFirstButtonPress}>
          <Text variant="dialog_cancel">{props.firstButtonText}</Text>
        </DialogButton>
      </DialogButtonsContainer>
    </Dialog>
  );
};
