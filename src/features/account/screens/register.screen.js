import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";
import { FormRegister } from "../components/form-register.components";

const TopTextSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const SignInSection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const CreateAccountText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_600};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const SignUpStartedText = styled(Text)`
  color: #bdc3d4;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const AlreadyAccountText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
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

export const RegisterScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <TopTextSection>
        <CreateAccountText>Create Account</CreateAccountText>
        <SignUpStartedText>Sign up to get started!</SignUpStartedText>
      </TopTextSection>
      <FormRegister />
      <OrSection>
        <HorizontalLine />
        <OrText>OR</OrText>
        <HorizontalLine />
      </OrSection>
      <Spacer size="medium" />
      <FacebookAndGoogleButtons />
      <WhiteSpaceSection />
      <SignInSection>
        <AlreadyAccountText>Already have an account?</AlreadyAccountText>
        <Button
          color="white"
          uppercase={false}
          labelStyle={{
            fontSize: 14,
            color: colors.brand.primary,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Button>
      </SignInSection>
    </SafeArea>
  );
};
