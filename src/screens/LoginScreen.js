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
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password should be at least 6 characters "),
});

export default class LoginScreen extends React.Component {
  onSignIn = async (values) => {
    const { email, password } = values;
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => this.onSignIn(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                    fontSize: 35,
                  }}
                >
                  Welcome
                </Text>
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                    fontSize: 25,
					color: "#bdc3d4",
                  }}
                >
                  Log in to continue!
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
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
                <Text style={{ color: "red" }}>
                  {touched.email && errors.email}
                </Text>
                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
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
                <Text style={{ color: "red" }}>
                  {touched.password && errors.password}
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 220 }}
                  onPress={() => {
                    this.props.navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text>Forgot password?</Text>
                </TouchableOpacity>
              
              <View style={{marginTop: 80}}>
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={[Colors.primaryColor, "#6dd5ed"]}
                    style={{
                      padding: 15,
                      alignItems: "center",
                      borderRadius: 15,
                      height: 60,
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
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
                  </LinearGradient>
                </TouchableOpacity>
              </View>
			  </View>
              <View style={styles.signupButtonContainer}>
                <Text
                  style={{
                    fontFamily: "open-sans",
                    fontSize: 16,
                    marginTop: 8,
                  }}
                >
                  New user?
                </Text>
                <Button
                  title="Sign up"
                  style={{
                    fontFamily: "open-sans",
                    fontSize: 16,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate({ routeName: "Signup" });
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
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
    backgroundColor: Colors.secondaryColor,
    padding: 20,
  },
  inputContainer: {
    width: 340,
    fontSize: 18,
    marginTop: 190,
  },
  signupButtonContainer: {
    marginTop: 170,
    marginLeft: 90,
    flexDirection: "row",
  },
});
