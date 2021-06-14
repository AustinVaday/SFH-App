import React from "react";
import { Button } from "react-native-paper";
import { FacebookAuth } from "../components/facebook-auth-button.components";
import { GoogleAuth } from "../components/google-auth-button.components";
import styled from "styled-components/native";

import { Spacer } from "../../../components/spacer/spacer.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";

const AuthSafeArea = styled(SafeArea)`
  justify-content: center;
  align-items: center;
`;

const BottomButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  justify-content: center;
  flex-direction: row;
`;

const TitleText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_bold};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.brand.primary};
`;

const MessageText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: #b3b3b3;
`;

const MainTextSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[5]};
  align-items: center;
`;

export const AuthenticationsScreen = ({ navigation }) => {
  return (
    <AuthSafeArea>
      <MainTextSection>
        <TitleText>Signs For Humanity</TitleText>
        <Spacer position="top" size="large" />
        <MessageText>Deaf. Hearing. Together.</MessageText>
      </MainTextSection>
      <FacebookAuth />
      <Spacer position="top" size="large" />
      <GoogleAuth />
      <BottomButtonsSection>
        <Button
          color="white"
          labelStyle={{
            fontSize: 15,
            color: "black",
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Button>
        <Button
          color="white"
          labelStyle={{
            fontSize: 15,
            color: "black",
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Sign up with email
        </Button>
      </BottomButtonsSection>
    </AuthSafeArea>
  );
};
