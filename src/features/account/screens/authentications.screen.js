import React from "react";
import { Button } from "react-native-paper";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";
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
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.brand.primary};
  text-align: center;
`;

const MessageText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: #b3b3b3;
`;

const MainTextSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[5]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
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
      <FacebookAndGoogleButtons />
      <BottomButtonsSection>
        <Button
          color="white"
          labelStyle={{
            fontSize: 12,
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
            fontSize: 12,
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
