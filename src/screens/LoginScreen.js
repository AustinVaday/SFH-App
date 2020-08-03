import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Image,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-paper";
import * as firebase from "firebase/app";
import "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

export default class LoginScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			isLoading: false,
		};
	}

	onSignIn = () => {};

	onSignUp = async () => {
		if (this.state.email && this.state.password) {
			try {
				const response = await firebase
					.auth()
					.createUserWithEmailAndPassword(this.state.email, this.state.password);
			} catch (error) {
				if (error.code == "auth/email-already-in-use") {
					alert("User already exists. Try again.");
				}
			}
		} else {
			alert("Please enter email and password");
		}
	};

	render() {
		return (
			<SafeAreaView style={styles.screen}>
				<View>
					<Text
						style={{
							fontFamily: "open-sans-bold",
							fontSize: 35,
							marginRight: 180,
						}}
					>
						Welcome
					</Text>
				</View>
				<View>
					<Text
						style={{
							fontFamily: "open-sans",
							fontSize: 15,
							marginRight: 205,
							marginBottom: 100,
						}}
					>
						Log in to continue!
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						mode='outlined'
						label='Email'
						keyboardType='email-address'
						onChangeText={(email) => this.setState({ email })}
						theme={{
							roundness: 15,
							colors: {
								primary: Colors.primaryColor,
								nderlineColor: "blue",
								placeholder: "#cecbce",
								background: Colors.secondaryColor,
							},
						}}
					/>
					<TextInput
						mode='outlined'
						label='Password'
						secureTextEntry
						onChangeText={(password) => this.setState({ password })}
						theme={{
							roundness: 15,
							colors: {
								primary: Colors.primaryColor,
								nderlineColor: "blue",
								placeholder: "#cecbce",
								background: Colors.secondaryColor,
							},
						}}
					/>
					<Text style={{ marginTop: 2, marginLeft: 220 }}>Forgot password?</Text>
				</View>
				<View style={styles.linearGradientButton}>
					<LinearGradient
						colors={[Colors.primaryColor, "#6dd5ed"]}
						style={{
							padding: 15,
							alignItems: "center",
							borderRadius: 15,
							height: 60,
							width: 340,
							marginTop: 30,
						}}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<TouchableOpacity
							onPress={() => {
								props.navigation.navigate({ routeName: "HomeScreen" });
							}}
						>
							<Text
								style={{
									backgroundColor: "transparent",
									fontSize: 20,
									color: "#fff",
									fontFamily: "open-sans-bold",
								}}
							>
								Login
							</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
				<View style={styles.signupButton}>
					<View style={styles.buttonSignUp}>
						<Text style={{ fontFamily: "open-sans", fontSize: 15, marginTop: 8 }}>New user? </Text>
					</View>
					<View style={styles.buttonSignUp}>
						<Button
							title='Sign up'
							onPress={() => {
								props.navigation.navigate({ routeName: "Signup" });
							}}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
// FEEDBACK: remove the logo on the login page.
// below the snippet, its only for sfh logo. (keep it in just a case)
/* <View style={{ marginBottom: 20 }}>
	<Image
		source={require("../assets/sfh-logo-white-removebg.png")}
		style={{ width: 150, height: 125 }}
	/>
</View>; */

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F8F8F8",
		padding: 20,
	},
	inputContainer: {
		width: 340,
		height: 100,
		fontSize: 18,
		marginVertical: 40,
		marginTop: 10,
		marginBottom: 50,
	},
	buttonContainer: {
		flexDirection: "row",
		marginBottom: 10,
	},
	button: {
		width: 100,
	},
	linearGradientButton: {
		marginBottom: 50,
	},
	signupButton: {
		marginTop: 25,
		flexDirection: "row",
	},
	buttonSignUp: {
		flexDirection: "row",
	},
});
