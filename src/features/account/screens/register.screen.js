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

const LoginSection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
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

export const RegisterScreen = ({ navigation }) => {
  return (
    <SafeArea>

      <TopTextSection>
        <Text variant="account_title" style={{textAlign: "left"}}>Create Account</Text>
        <Text variant="account_message">Sign up to get started!</Text>
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
      <LoginSection>
        <Text variant="text_button">Already have an account?</Text>
        <Button
          onPress={() => {
            navigation.navigate("Login");
          }}
          color={colors.ui.tertiary}
          uppercase={false}
        >
          <Text variant="text_button" style={{color: colors.text.brand}}>Login</Text>
        </Button>
      </LoginSection>
    </SafeArea>
  );
};
