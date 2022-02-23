import React from "react";

import { Text } from "../typography/text.components";

import {
  DialogButton,
  Dialog,
  DialogButtonsContainer,
  DialogButtonsSlash,
  TextsContainer,
} from "./alert-dialog.styles";

export default AlertDialog = (props) => {
  const onNegativeButtonPress = () => {
    props.onPressNegative();
  };

  const onPositiveButtonPress = () => {
    props.onPressPositive();
  };

  return (
    <Dialog isVisible={props.displayAlert}>
      <TextsContainer>
        <Text variant="dialog_title">{props.title}</Text>
        {props.message && <Text variant="dialog_message">{props.message}</Text>}
      </TextsContainer>
      <DialogButtonsContainer>
        <DialogButton onPress={onNegativeButtonPress}>
          <Text variant="dialog_negative">{props.negativeButtonText}</Text>
        </DialogButton>
        <DialogButtonsSlash />
        <DialogButton onPress={onPositiveButtonPress}>
          <Text variant="dialog_positive">{props.positiveButtonText}</Text>
        </DialogButton>
      </DialogButtonsContainer>
    </Dialog>
  );
};
