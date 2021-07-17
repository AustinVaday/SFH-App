import React from "react";
import { Button } from "react-native-paper";

import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";
import { FormForgotPassword } from "../components/form-forgot-password.components";

const TopTextSection = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${(props) => props.theme.colors.text.secondary};
`;

const OrSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;

const OrText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_600};
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: center;
  width: 50px;
`;

const WhiteSpaceSection = styled.View`
  flex-grow: 1;
`;

export const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <TopTextSection>
        <Text variant="forgot_password_title">Trouble logging in?</Text>
        <Spacer position="top" size="large" />
        <Text variant="forgot_password_message">
          Enter your email and we will send you a link to get back into your
          account.
        </Text>
      </TopTextSection>
      <FormForgotPassword onNavigate={navigation.navigate} />
      <OrSection>
        <HorizontalLine />
        <OrText>OR</OrText>
        <HorizontalLine />
      </OrSection>
      <Spacer size="medium" />
      <FacebookAndGoogleButtons />
      <WhiteSpaceSection />
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        color={colors.ui.tertiary}
        uppercase={false}
      >
        <Text variant="text_button" style={{ color: colors.text.brand }}>
          Back to Login
        </Text>
      </Button>
    </SafeArea>
  );
};
