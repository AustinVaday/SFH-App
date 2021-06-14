import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { ActivityIndicator, Colors, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { googleConfig } from "../../../../Config/config";

const { width } = Dimensions.get("window");

const WEBCLIENTID = googleConfig.wClientId;

maybeCompleteAuthSession();

export const GoogleAuth = () => {
  const { onFacebookOrGoogleSignIn, error, isLoading } = useContext(
    AuthenticationContext
  );

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: WEBCLIENTID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      onFacebookOrGoogleSignIn(credential);
    }
  }, [response]);

  return !isLoading ? (
    <Button
      icon={() => <Ionicons name="logo-google" size={40} color="white" />}
      mode="contained"
      color="#DB4437"
      contentStyle={{ padding: 10, width: width / 1.2 }}
      labelStyle={{ fontSize: 15 }}
      onPress={() => {
        promptAsync();
      }}
    >
      Continue with Google
    </Button>
  ) : (
    <ActivityIndicator animating={true} color={Colors.blue300} />
  );
};
