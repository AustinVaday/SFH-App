import React from "react";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FederatedButtons } from "../components/federated-buttons.components";

import {
  AuthenticationsBackground,
  Logo,
  LogoContainer,
  TitleAndMessageSection,
  BottomButtonsSection,
  LoginButton,
  SignUpButton,
} from "./styles/authentications.styles";

export const AuthenticationsScreen = ({ navigation }) => {
  return (
    <AuthenticationsBackground>
      <LogoContainer>
        <Logo source={require("../../../assets/icons/sfh-logo.png")} />
      </LogoContainer>

      <TitleAndMessageSection>
        <Text variant="authentications_title">Signs For Humanity</Text>
        <Spacer position="top" size="large" />
        <Text variant="authentications_message">Share words and learn sign</Text>
      </TitleAndMessageSection>

      <FederatedButtons navigation={navigation} />

      <BottomButtonsSection>
        <LoginButton
          title={<Text variant="authentications_text_button">Login</Text>}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
        <SignUpButton
          title={
            <Text variant="authentications_text_button">
              Sign up with email
            </Text>
          }
          onPress={() => {
            navigation.navigate("SignupEmail");
          }}
        />
      </BottomButtonsSection>
    </AuthenticationsBackground>
  );
};
