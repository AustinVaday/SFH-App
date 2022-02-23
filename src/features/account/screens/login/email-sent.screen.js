import React from "react";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";

import {
  EmailSentBackground,
  LoginButton,
  CheckedIcon,
} from "./styles/email-sent.styles";

export const EmailSentScreen = ({ navigation }) => {
  const onPress = () => {
    navigation.pop(2);
  };

  return (
    <EmailSentBackground>
      <Text variant="emailSent_title">Email Sent!</Text>
      <Spacer size="large" />
      <CheckedIcon />
      <Spacer size="large" />
      <Text variant="emailSent_message">
        Please check your email and change a new password.
      </Text>
      <Spacer size="huge" />
      <LoginButton
        title={<Text variant="emailSent_button">Login</Text>}
        onPress={onPress}
      />
    </EmailSentBackground>
  );
};
