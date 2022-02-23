import React, { useEffect } from "react";

import { maybeCompleteAuthSession } from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/facebook";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import useLoader from "../../../services/hooks/loader/useLoader";

import {
  onFacebookSignIn,
  onGoogleSignIn,
} from "../../../services/firebase/auth";

import { FBAPPID, WEBCLIENTID } from "@env";

import {
  AuthenticationsButtonsSection,
  FacebookButton,
  GoogleButton,
} from "./styles/fb-and-google-buttons.styles";

maybeCompleteAuthSession();

export const FacebookAndGoogleButtons = () => {
  const [loader, showLoader, hideLoader] = useLoader();

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    useAuthRequest({
      responseType: ResponseType.Token,
      clientId: FBAPPID,
      scopes: ["public_profile", "email"],
    });

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    useIdTokenAuthRequest({
      clientId: WEBCLIENTID,
      scopes: ["profile", "email"],
    });

  useEffect(() => {
    if (responseFacebook?.type === "success") {
      const { access_token } = responseFacebook.params;

      onFacebookSignIn(access_token, hideLoader);
    } else {
      hideLoader();
    }
  }, [responseFacebook]);

  useEffect(() => {
    if (responseGoogle?.type === "success") {
      const { id_token } = responseGoogle.params;

      onGoogleSignIn(id_token, hideLoader);
    } else {
      hideLoader();
    }
  }, [responseGoogle]);

  return (
    <AuthenticationsButtonsSection>
      {loader}
      <FacebookButton
        title={
          <Text variant="fb_google_textbutton">Continue with Facebook</Text>
        }
        onPress={() => {
          showLoader();
          promptAsyncFacebook();
        }}
      />
      <Spacer size="medium" />
      <GoogleButton
        title={<Text variant="fb_google_textbutton">Continue with Google</Text>}
        onPress={() => {
          showLoader();
          promptAsyncGoogle();
        }}
      />
    </AuthenticationsButtonsSection>
  );
};
