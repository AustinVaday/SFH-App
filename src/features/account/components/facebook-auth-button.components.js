// BUG: Using Expo-Facebook and Firebase packages, for some reason, Facebook ID cannot be changed
// in the Expo Client.
// Refer to the similar issue: https://github.com/expo/expo/issues/8951

import React, { useEffect, useContext } from "react";
import { Dimensions } from "react-native";
import { ActivityIndicator, Colors, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import { maybeCompleteAuthSession } from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import firebase from "firebase";

import { facebookConfig } from "../../../../Config/config";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

const FB_APP_ID = facebookConfig.fbAppId;

maybeCompleteAuthSession();

export const FacebookAuth = () => {
  const { onFacebookOrGoogleSignIn, error, isLoading } = useContext(
    AuthenticationContext
  );

  const [request, response, promptAsync] = useAuthRequest({
    responseType: ResponseType.Token,
    clientId: FB_APP_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      const credential =
        firebase.auth.FacebookAuthProvider.credential(access_token);
      onFacebookOrGoogleSignIn(credential);
    }
  }, [response]);

  return !isLoading ? (
    <Button
      icon={() => <Ionicons name="logo-facebook" size={40} color="white" />}
      mode="contained"
      color="#4267B2"
      contentStyle={{ padding: 10, width: width / 1.2 }}
      labelStyle={{ fontSize: 15 }}
      onPress={() => {
        promptAsync();
      }}
    >
      Continue with Facebook
    </Button>
  ) : (
    <ActivityIndicator animating={true} color={Colors.blue300} />
  );
};
