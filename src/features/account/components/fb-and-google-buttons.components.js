// BUG: Using Expo-Facebook and Firebase packages, for some reason, Facebook ID cannot be changed
// in the Expo Client. Same for Expo Google package
// Refer to the similar issue: https://github.com/expo/expo/issues/8951

// CHECK: https://github.com/expo/expo/issues/11471
// If Android device has issues with using Facebook login, check that website for resolve

import React, { useEffect, useState, useContext } from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { maybeCompleteAuthSession } from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/facebook";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";
import { firebase } from "../../../utils/firebase";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { FBAPPID, WEBCLIENTID } from "@env";

const AuthButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const { width } = Dimensions.get("window");

maybeCompleteAuthSession();

export const FacebookAndGoogleButtons = ({ navigation }) => {
  const [onFacebook, setOnFacebook] = useState(false);
  const [onGoogle, setOnGoogle] = useState(false);
  const { onFacebookOrGoogleSignIn, error, isLoading } = useContext(
    AuthenticationContext
  );

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    useAuthRequest({
      responseType: ResponseType.Token,
      clientId: FBAPPID,
      scopes: ["public_profile", "email"],
    });

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    useIdTokenAuthRequest({
      clientId: WEBCLIENTID,
    });

  useEffect(() => {
    if (onFacebook) {
      if (responseFacebook?.type === "success") {
        const { access_token } = responseFacebook.params;

        const credential =
          firebase.auth.FacebookAuthProvider.credential(access_token);
        onFacebookOrGoogleSignIn(credential);
        setOnFacebook(false);
      }
    } else if (onGoogle) {
      if (responseGoogle?.type === "success") {
        const { id_token } = responseGoogle.params;

        const credential =
          firebase.auth.GoogleAuthProvider.credential(id_token);
        onFacebookOrGoogleSignIn(credential);
        setOnGoogle(false);
      }
    }
  }, [responseFacebook, responseGoogle]);

  return (
    <AuthButtonsSection>
      <Button
        icon={() => (
          <Ionicons
            name="logo-facebook"
            size={30}
            color={colors.icon.primary}
          />
        )}
        mode="contained"
        color={colors.icon.facebook}
        contentStyle={{ width: width / 1.2, height: 50 }}
        onPress={() => {
          setOnFacebook(true);
          promptAsyncFacebook();
        }}
        loading={isLoading}
      >
        <Text variant="contained_button">Continue with Facebook</Text>
      </Button>
      <Spacer size="medium" />
      <Button
        icon={() => (
          <Ionicons name="logo-google" size={30} color={colors.icon.primary} />
        )}
        mode="contained"
        color={colors.icon.google}
        contentStyle={{ width: width / 1.2, height: 50 }}
        onPress={() => {
          setOnGoogle(true);
          promptAsyncGoogle();
        }}
        loading={isLoading}
      >
        <Text variant="contained_button">Continue with Google</Text>
      </Button>
    </AuthButtonsSection>
  );
};
