import React from "react";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

import { Spacer } from "../../../components/spacer/spacer.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";

const AuthSafeArea = styled(SafeArea)`
  justify-content: center;
  align-items: center;
`;

const BottomButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  justify-content: center;
  flex-direction: row;
`;

const MainTextSection = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
`;

const AnimationWrapper = styled.View`
  width: 100%;
  height: 30%;
`;

export const AuthenticationsScreen = ({ navigation }) => {
  return (
    <AuthSafeArea>
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/lottie/world.json")}
        />
      </AnimationWrapper>

      <MainTextSection>
        <Text variant="account_title">Signs For Humanity</Text>
        <Spacer position="top" size="large" />
        <Text variant="account_message">Deaf. Hearing. Together.</Text>
      </MainTextSection>
      <FacebookAndGoogleButtons />
      <BottomButtonsSection>
        <Button
          onPress={() => {
            navigation.navigate("Login");
          }}
          color={colors.ui.tertiary}
        >
          <Text variant="text_button">Login</Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
          color={colors.ui.tertiary}
        >
          <Text variant="text_button">Sign up with email</Text>
        </Button>
      </BottomButtonsSection>
    </AuthSafeArea>
  );
};
