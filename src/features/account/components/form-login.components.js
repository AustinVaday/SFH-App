import React from "react";
import { ScrollView, Pressable } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/redux/actions/auth.actions";

const TextInputsSection = styled.View`
  padding-top: ${(props) => props.theme.space[5]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const ForgotPasswordSection = styled.View`
  align-items: flex-end;
`;

const LoginButtonSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .label("Password")
    .required("Please enter your password")
    .min(5, "Password should be at least 5 characters"),
});

export const FormLogin = ({ onNavigate }) => {
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const onSignIn = async (values) => {
    const { email, password } = values;

    try {
      dispatch(login(email, password));
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
      (errors.email === undefined && values.email === "") ||
      (errors.password === undefined && values.password === "")
    ) {
      Toast.show({
        type: "error",
        text2: "Please fill out everything.",
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
    } else if (!errors.email && !errors.password) {
      onSignIn(values);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
    >
      {({ handleChange, values, errors, touched, handleBlur }) => (
        <ScrollView scrollEnabled={false} style={{ flexGrow: 0 }}>
          <TextInputsSection>
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
              style={{ height: 50 }}
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
            <ForgotPasswordSection>
              <Button
                onPress={() => {
                  onNavigate("ForgotPassword");
                }}
                color={colors.ui.tertiary}
              >
                <Text
                  variant="text_button"
                  style={{ color: colors.text.brand }}
                >
                  Forgot password?
                </Text>
              </Button>
            </ForgotPasswordSection>
          </TextInputsSection>
          <LoginButtonSection>
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
                    LOGIN
                  </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </LinearGradient>
            </Pressable>
          </LoginButtonSection>
        </ScrollView>
      )}
    </Formik>
  );
};
