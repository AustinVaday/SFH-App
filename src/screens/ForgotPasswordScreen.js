import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase/app";
import "firebase/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
});

export default class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log("Password reset email sent successfully");
      this.props.navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.forgotTextStyle}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <View style={{ alignItems: "center" }}>
              <TextInput
                style={{
                  marginTop: 100,
                  width: 340,
                  height: 60,
                  fontSize: 18,
                }}
                mode="outlined"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                label="Enter email"
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
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ marginTop: 10 }}
              >
                <LinearGradient
                  colors={[Colors.primaryColor, "#6dd5ed"]}
                  style={{
                    padding: 15,
                    alignItems: "center",
                    borderRadius: 15,
                    height: 60,
                    width: 340,
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
                    Send
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text
                style={{ color: "red", paddingHorizontal: 40, marginTop: 10 }}
              >
                {errors.general}
              </Text>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
  },
  forgotTextStyle: {
    fontSize: 35,
    fontFamily: "open-sans-bold",
    marginLeft: 25,
    marginVertical: 40,
    alignSelf: "flex-start",
  },
});
