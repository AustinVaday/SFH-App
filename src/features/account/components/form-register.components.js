import React from "react";
import { ScrollView, Pressable } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../services/redux/actions/auth.actions";

const TextInputsSection = styled.View`
  padding-top: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const SignUpButtonSection = styled.View`
  padding-top: ${(props) => props.theme.space[1]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .label("DisplayName")
    .required("Please fill the display name")
    .min(2, "Display name must contain at least 2 characters"),
  username: yup
    .string()
    .label("Username")
    .required("Please fill the username")
    .min(6, "Username must contain at least 6 characters"),
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .label("Password")
    .required("Please fill the password")
    .min(6, "Password should be at least 6 characters "),
});

export const FormRegister = () => {
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const onSignUp = async (values) => {
    const { displayName, email, password, username } = values;

    try {
      dispatch(register(email, password, displayName, username));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        topOffset: 45,
      });
    }
  };

  const handleSubmit = (values, errors) => {
    if (
      (errors.displayName === undefined && values.displayName === "") ||
      (errors.username === undefined && values.username === "") ||
      (errors.email === undefined && values.email === "") ||
      (errors.password === undefined && values.password === "")
    ) {
      Toast.show({
        type: "error",
        text2: "Please fill out everything.",
        topOffset: 45,
      });
    } else if (values.displayName === "" || errors.displayName !== undefined) {
      Toast.show({
        type: "error",
        text1: "Display Name",
        text2: errors.displayName,
        topOffset: 45,
      });
    } else if (values.username === "" || errors.username !== undefined) {
      Toast.show({
        type: "error",
        text1: "Username",
        text2: errors.username,
        topOffset: 45,
      });
    } else if (values.email === "" || errors.email !== undefined) {
      Toast.show({
        type: "error",
        text1: "Email",
        text2: errors.email,
        topOffset: 45,
      });
    } else if (values.password === "" || errors.password !== undefined) {
      Toast.show({
        type: "error",
        text1: "Password",
        text2: errors.password,
        topOffset: 45,
      });
    } else if (
      !errors.displayName &&
      !errors.username &&
      !errors.email &&
      !errors.password
    ) {
      onSignUp(values);
    }
  };

  return (
    <Formik
      initialValues={{ displayName: "", username: "", email: "", password: "" }}
      validationSchema={validationSchema}
    >
      {({ handleChange, values, errors, touched, handleBlur }) => (
        <ScrollView scrollEnabled={false} style={{ flexGrow: 0 }}>
          <TextInputsSection>
            <TextInput
              mode="outlined"
              onChangeText={handleChange("displayName")}
              value={values.displayName}
              onBlur={handleBlur("displayName")}
              label="Display Name"
              style={{ height: 50, paddingBottom: 10 }}
              theme={{
                roundness: 15,
                colors: {
                  primary:
                    touched.email && errors.email
                      ? colors.text.error
                      : colors.text.brand,
                  placeholder:
                    touched.displayName && errors.displayName
                      ? colors.ui.error
                      : colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
            <TextInput
              mode="outlined"
              onChangeText={handleChange("username")}
              value={values.username}
              onBlur={handleBlur("username")}
              label="Username"
              style={{ height: 50, paddingBottom: 10 }}
              theme={{
                roundness: 15,
                colors: {
                  primary:
                    touched.username && errors.username
                      ? colors.text.error
                      : colors.text.brand,
                  placeholder:
                    touched.username && errors.username
                      ? colors.ui.error
                      : colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={{ height: 50, paddingBottom: 10 }}
              theme={{
                roundness: 15,
                colors: {
                  primary:
                    touched.email && errors.email
                      ? colors.text.error
                      : colors.text.brand,
                  placeholder:
                    touched.email && errors.email
                      ? colors.ui.error
                      : colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={{ height: 50, paddingBottom: 10 }}
              theme={{
                roundness: 15,
                colors: {
                  primary:
                    touched.password && errors.password
                      ? colors.text.error
                      : colors.text.brand,
                  placeholder:
                    touched.password && errors.password
                      ? colors.ui.error
                      : colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
          </TextInputsSection>
          <SignUpButtonSection>
            <Pressable
              onPress={() => {
                handleSubmit(values, errors);
              }}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.brand.primary, "#6dd5ed"]}
                style={{
                  height: 50,
                  borderRadius: 15,
                  alignItems: "center",
                  padding: 15,
                }}
              >
                {!isLoading ? (
                  <Text variant="contained_button" style={{ fontSize: 15 }}>
                    SIGN UP
                  </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </LinearGradient>
            </Pressable>
          </SignUpButtonSection>
        </ScrollView>
      )}
    </Formik>
  );
};
