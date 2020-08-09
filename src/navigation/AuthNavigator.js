import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FederatedLoginScreen from "../screens/FederatedLoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ForgetPassword from "../screens/ForgetPassword";

const AuthNavigator = createStackNavigator({
	Loading: {
		screen: LoadingScreen,
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
	ForgetPassword: {
		screen: ForgetPassword,
		navigationOptions: {
			headerShown: false,
		},
	},
});

export default AuthNavigator;
