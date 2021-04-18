import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Required")
    .min(6, "FullName must contain at least 6 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(5, "Password should be at least 5 characters "),
});

export default class SignupScreen extends Component {
  onSignUp = async (values) => {
    const { email, password } = values;
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <Formik
          initialValues={{ fullname: "", email: "", password: "" }}
          onSubmit={(values) => this.onSignUp(values)}
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
              <View style={styles.createTextContainer}>
                <Text
                  style={{
                    right: 3,
                    fontSize: 35,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  Create Account
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "open-sans-bold",
                    color: "#bdc3d4",
                  }}
                >
                  Sign up to get started!
                </Text>
              </View>
              <View>
                <TextInput
                  style={{
                    justifyContent: "center",
                    width: 340,
                    height: 60,
                    fontSize: 18,
                    margin: 5,
                  }}
                  mode="outlined"
                  onChangeText={handleChange("fullname")}
                  value={values.fullname}
                  onBlur={handleBlur("fullname")}
                  label="Full Name"
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
              </View>
              <Text style={{ color: "red" }}>
                {touched.fullname && errors.fullname}
              </Text>
              <View>
                <TextInput
                  style={{
                    justifyContent: "center",
                    width: 340,
                    height: 60,
                    fontSize: 18,
                    margin: 5,
                  }}
                  mode="outlined"
                  onChangeText={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  label="Email"
                  keyboardType="email-address"
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
              </View>
              <Text style={{ color: "red" }}>
                {touched.email && errors.email}
              </Text>
              <View>
                <TextInput
                  style={{
                    justifyContent: "center",
                    width: 340,
                    height: 60,
                    fontSize: 18,
                    margin: 5,
                  }}
                  mode="outlined"
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  label="Password"
                  secureTextEntry
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
              </View>
              <Text style={{ color: "red" }}>
                {touched.password && errors.password}
              </Text>
              <View>
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={[Colors.primaryColor, "#6dd5ed"]}
                    style={{
                      padding: 15,
                      alignItems: "center",
                      borderRadius: 15,
                      height: 60,
                      width: 340,
                      marginTop: 90,
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
                <View style={styles.textSignInContainer}>
                  <Text style={{ fontFamily: "open-sans", fontSize: 16}}>
                    I'm already a member,
                  </Text>
                  <Button
                    title="Sign In"
                    titleStyle={{
                      fontSize: 16,
                      bottom: 11,
                      fontFamily: "open-sans",
                    }}
                    type="clear"
                    onPress={() => {
                      this.props.navigation.navigate({ routeName: "Login" });
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
  },
  createTextContainer: {
    paddingRight: 60,
    paddingBottom: 100,
  },
  textSignInContainer: {
    flexDirection: "row",
    paddingTop: 120,
    top: 40,
    left: 60,
  },
});
