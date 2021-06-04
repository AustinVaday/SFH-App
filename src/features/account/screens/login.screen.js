import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { TextInput } from "react-native-paper";
import * as firebase from "firebase/app";
import "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from "react-native-dropdownalert";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(5, "Password should be at least 5 characters "),
});

// TODO create the network information based on its quality and implement the type of modals for password
// create the Network Information
const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// to unsubscribe to these update, just use:
unsubscribe();
// TODO END -> network information

export const LoginScreen = ({ navigation }) => {
  // create the component for alert (dropdown)
  const _fetchData = async () => {
    try {
      // alertWithType parameters: type, title, message, payload, interval.
      // payload object that includes a source property overrides the image source prop. (optional: object)
      // interval takes precedence over the closeInterval prop. (optional: number)
      this.dropDownAlertRef.alertWithType("info", "Info", "Start fetch data.");
      await fetch("https://httpbin.org/get");
      this.dropDownAlertRef.alertWithType(
        "success",
        "Success",
        "Finish fetch data"
      );
    } catch (error) {
      this.dropDownAlertRef.alertWithType("error", "Error", error);
    }
  };

  const onSignIn = async (values, actions) => {
    const { email, password } = values;
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (response.user) {
        navigation.navigate("Home");
      }
    } catch (error) {
      // this code will hold the error handler to avoid the error message: "the password is invalid or the user does have a password"
      actions.setFieldError("general", error.message); //console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  // TODO create the function to cleanup the memory to avoid memory leak.
  /* 
    ! DOCUMENTATION: Using a hook for useEffect() that adds the ability to perform side effects from a function component
    ! Same above. It servers the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in classes. 
    ! In my progress, I am trying to figure out why it still keeps componentMount, not using effect hooks.
    * Highlight of my progress, I complete the task for modals in the terminal as comment. However, I still work on the modals as pop in the actual phone
  */

  useEffect(() => {
    _fetchData();
    const subscription = props.source.subscribe();
    console.log("Here");
    return () => {
      subscription.unsubscribe();
    };
  }, [props.source]);

  return (
    <SafeAreaView style={styles.screen}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => onSignIn(values, actions)}
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
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 35,
                }}
              >
                Welcome
              </Text>
              <Text
                style={{
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
                    primary: colors.brand.primary,
                    nderlineColor: "blue",
                    placeholder: "#cecbce",
                    background: colors.brand.secondary,
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
                    primary: colors.brand.primary,
                    nderlineColor: "blue",
                    placeholder: "#cecbce",
                    background: colors.brand.secondary,
                  },
                }}
              />
              <Text style={{ color: "red" }}>
                {touched.password && errors.password}
              </Text>
              <Text style={{ color: "red" }}>{errors.general}</Text>
              <TouchableOpacity
                style={{ marginLeft: 220 }}
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text>Forgot password?</Text>
              </TouchableOpacity>

              <View style={{ marginTop: 80 }}>
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={[colors.brand.primary, "#6dd5ed"]}
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
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                New user?
              </Text>
              <Button
                title="Sign up"
                style={{
                  fontSize: 16,
                }}
                onPress={() => {
                  navigation.navigate({ routeName: "Register" });
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

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
    backgroundColor: colors.brand.secondary,
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
