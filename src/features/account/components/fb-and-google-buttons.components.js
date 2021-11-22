// BUG: Using Expo-Facebook and Firebase packages, for some reason, Facebook ID cannot be changed
// in the Expo Client. Same for Expo Google package
// Refer to the similar issue: https://github.com/expo/expo/issues/8951

// CHECK: https://github.com/expo/expo/issues/11471
// If Android device has issues with using Facebook login, check that website for resolve

import React, { useEffect, useState } from "react";

import { maybeCompleteAuthSession } from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/facebook";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";
import { firebase } from "../../../utils/firebase";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import {
  onFacebookSignIn,
  onGoogleSignIn,
} from "../../../services/redux/actions/auth.actions";

import { FBAPPID, WEBCLIENTID } from "@env";

import {
  AuthenticationsButtonsSection,
  FacebookButton,
  GoogleButton,
} from "../styles/fb-and-google-buttons.styles";

maybeCompleteAuthSession();

export const FacebookAndGoogleButtons = ({ navigation }) => {
  const [onFacebook, setOnFacebook] = useState(false);
  const [onGoogle, setOnGoogle] = useState(false);

  const isGoogleLoading = useSelector((state) => state.auth.googleLoading);
  const isFacebookLoading = useSelector((state) => state.auth.facebookLoading);
  const dispatch = useDispatch();

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
        dispatch(onFacebookSignIn(credential));
        setOnFacebook(false);
      }
    } else if (onGoogle) {
      if (responseGoogle?.type === "success") {
        const { id_token } = responseGoogle.params;

        const credential =
          firebase.auth.GoogleAuthProvider.credential(id_token);
        dispatch(onGoogleSignIn(credential));
        setOnGoogle(false);
      }
    }
  }, [responseFacebook, responseGoogle]);

  return (
    <AuthenticationsButtonsSection>
      <FacebookButton
        title={
          <Text variant="fb_google_textbutton">Continue with Facebook</Text>
        }
        onPress={() => {
          setOnFacebook(true);
          promptAsyncFacebook();
        }}
        loading={isFacebookLoading}
      />
      <Spacer size="medium" />
      <GoogleButton
        title={<Text variant="fb_google_textbutton">Continue with Google</Text>}
        onPress={() => {
          setOnGoogle(true);
          promptAsyncGoogle();
        }}
        loading={isGoogleLoading}
      />
    </AuthenticationsButtonsSection>
  );
};
