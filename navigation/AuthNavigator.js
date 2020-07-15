import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FederatedLoginScreen from "../screens/FederatedLoginScreen";

const AuthNavigator = createStackNavigator({
  FederatedLogin: {
    screen: FederatedLoginScreen,
    navigationOptions: {
      headerShown: false,
    }
  }, 
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
});

export default AuthNavigator;
