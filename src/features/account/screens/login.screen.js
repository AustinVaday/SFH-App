import React from "react";
import { Button } from "react-native-paper";

import NetInfo from "@react-native-community/netinfo";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";
import { FormLogin } from "../components/form-login.components";

const TopTextSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const SignUpSection = styled.View`
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

// create the Network Information
const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// to unsubscribe to these update, just use:
unsubscribe();

export const LoginScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <TopTextSection>
        <Text variant="account_title" style={{ textAlign: "left" }}>
          Welcome
        </Text>
        <Text variant="account_message">Log in to continue!</Text>
      </TopTextSection>
      <FormLogin onNavigate={navigation.navigate} />
      <OrSection>
        <HorizontalLine />
        <OrText>OR</OrText>
        <HorizontalLine />
      </OrSection>
      <Spacer size="medium" />
      <FacebookAndGoogleButtons />
      <WhiteSpaceSection />
      <SignUpSection>
        <Text variant="text_button">Don't have an account?</Text>
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
          color={colors.ui.tertiary}
          uppercase={false}
        >
          <Text variant="text_button" style={{ color: colors.text.brand }}>
            Sign up
          </Text>
        </Button>
      </SignUpSection>
    </SafeArea>
  );
};
