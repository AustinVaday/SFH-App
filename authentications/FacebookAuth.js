import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";
import firebase from "firebase";
import { Button, Icon } from "react-native-elements";
import { facebookConfig } from "../Config/config";


const FB_APP_ID = facebookConfig.fbAppId;

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

const useProxy = Platform.select({ web: false, default: true });

export default function FacebookAuth() {
  //const [user, setUser] = React.useState(null);

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy,
    // For usage in bare and standalone
    // Use your FBID here. The path MUST be `authorize`.
    native: `fb${FB_APP_ID}://authorize`,
  });

  // Request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: FB_APP_ID,
      scopes: ["public_profile", "email"],
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri({
        // For usage in bare and standalone
        // Use your FBID here. The path MUST be `authorize`.
        native: `fb${FB_APP_ID}://authorize`,
        useProxy,
      }),
      extraParams: {
        // Use `popup` on web for a better experience
        display: Platform.select({ web: "popup" }),
        // Optionally you can use this to rerequest declined permissions
        auth_type: "rerequest",
      },
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  // You need to add this url to your authorized redirect urls on your Facebook app
  console.log({
    redirectUri,
  });

  const _handlePressAsync = async () => {
    const result = await promptAsync({ useProxy });

    if (result.type === "success") {

    let accessToken = result.params.access_token;

    const credential = firebase.auth.FacebookAuthProvider.credential(
      accessToken
    );
    // Sign in with the credential from the Facebook user.
    firebase.auth().signInWithCredential(credential);

    //let userInfoResponse = await fetch(
    //  `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    //);
    //const userInfo = await userInfoResponse.json();
    //setUser(userInfo);
    }
  };
  //alert("Uh oh, something went wrong");

  return (
    <Button
      title="Continue with Facebook"
      disabled={!request}
      onPress={_handlePressAsync}
      titleStyle={{
        padding: 10,
        fontSize: 20,
        fontFamily: "open-sans",
      }}
      buttonStyle={{
        margin: 10,
        height: 60,
        backgroundColor: "#4267B2",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,

        elevation: 12,
      }}
      icon={
        <Icon name="logo-facebook" type="ionicon" size={40} color="white" />
      }
    />
  );
}
