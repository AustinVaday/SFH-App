import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import { Formik } from "formik";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

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
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(5, "Password should be at least 5 characters "),
});

export const FormLogin = ({ onNavigate }) => {
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const onSignIn = async (values, actions) => {
    const { email, password } = values;
    try {
      onLogin(email, password);
    } catch (error) {
      // this code will hold the error handler to avoid the error message: "the
      // password is invalid or the user does have a password"
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
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
        <ScrollView scrollEnabled={false} style={{ flexGrow: 0 }}>
          <TextInputsSection>
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={{ height: 50 }}
              theme={{
                roundness: 15,
                colors: {
                  primary: colors.text.brand,
                  placeholder: colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
            <HelperText type="error" visible={errors}>
              {touched.email && errors.email}
            </HelperText>
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
                  primary: colors.text.brand,
                  placeholder: colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
            <HelperText type="error" visible={errors}>
              {touched.password && errors.password}
            </HelperText>
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
            {!isLoading ? (
              <GradientButton
                text={<Text variant="contained_button">Login</Text>}
                gradientBegin={colors.brand.primary}
                gradientEnd="#6dd5ed"
                gradientDirection="vertical"
                height={50}
                radius={15}
                onPressAction={handleSubmit}
              />
            ) : (
              <ActivityIndicator
                animating={true}
                color={colors.brand.primary}
              />
            )}
          </LoginButtonSection>
        </ScrollView>
      )}
    </Formik>
  );
};
