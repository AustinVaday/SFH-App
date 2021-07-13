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

const ForgotPasswordText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_600};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const MessageText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_600};
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: black;
`;

const OrSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;

const OrText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_400};
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
  align-self: center;
  width: 50px;
`;

const WhiteSpaceSection = styled.View`
  flex-grow: 1;
`;

export const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <TopTextSection>
        <ForgotPasswordText>Trouble logging in?</ForgotPasswordText>
        <Spacer position="top" size="large" />
        <MessageText>
          Enter your email and we will send you a link to get back into your
          account.
        </MessageText>
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
        color="white"
        uppercase={false}
        labelStyle={{
          fontSize: 13,
          color: colors.brand.primary,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back to Login
      </Button>
    </SafeArea>
  );
};
