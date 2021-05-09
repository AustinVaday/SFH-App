import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FederatedLoginScreen from "../screens/FederatedLoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const AuthNavigator = createStackNavigator({
	Loading: {
		screen: LoadingScreen,
		navigationOptions: {
			headerShown: false,
		},
	},
	FederatedLogin: {
		screen: FederatedLoginScreen,
		navigationOptions: {
			headerShown: false,
		},
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			headerShown: false,
		},
	},
	Signup: {
		screen: SignupScreen,
		navigationOptions: {
			headerShown: false,
		},
	},
	ForgotPassword: {
		screen: ForgotPasswordScreen,
		navigationOptions: {
			headerShown: false,
		},
	},
});

export default AuthNavigator;
