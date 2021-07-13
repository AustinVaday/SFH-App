import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {
  TextInput,
  HelperText,
  ActivityIndicator,
  Colors,
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

const SignUpButtonSection = styled.View`
  padding-top: ${(props) => props.theme.space[1]};
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const SignUpText = styled(Text)`
  color: white;
  font-family: ${(props) => props.theme.fonts.body_400};
  font-size: ${(props) => props.theme.fontSizes.button};
`;

const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Required")
    .min(6, "FullName must contain at least 6 characters"),
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

export const FormRegister = () => {
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);

  const onSignUp = async (values, actions) => {
    const { email, password } = values;
    try {
      onRegister(email, password);
    } catch (error) {
      actions.setFieldError("general", error.message);
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ fullname: "", email: "", password: "" }}
      onSubmit={(values, actions) => onSignUp(values, actions)}
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
              onChangeText={handleChange("fullname")}
              value={values.fullname}
              onBlur={handleBlur("fullname")}
              label="Full Name"
              style={{ height: 50 }}
              theme={{
                roundness: 15,
                colors: {
                  primary: colors.brand.primary,
                  nderlineColor: "blue",
                  placeholder: "#cecbce",
                  background: "white",
                },
              }}
            />
            <HelperText type="error" visible={errors}>
              {touched.fullname && errors.fullname}
            </HelperText>
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
                  primary: colors.brand.primary,
                  nderlineColor: "blue",
                  placeholder: "#cecbce",
                  background: "white",
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
                  primary: colors.brand.primary,
                  nderlineColor: "blue",
                  placeholder: "#cecbce",
                  background: "white",
                },
              }}
            />
            <HelperText type="error" visible={errors}>
              {touched.password && errors.password}
            </HelperText>
          </TextInputsSection>
          <SignUpButtonSection>
            {!isLoading ? (
              <GradientButton
                text={<SignUpText>Sign up</SignUpText>}
                gradientBegin={colors.brand.primary}
                gradientEnd="#6dd5ed"
                gradientDirection="vertical"
                height={50}
                radius={15}
                onPressAction={handleSubmit}
              />
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </SignUpButtonSection>
        </ScrollView>
      )}
    </Formik>
  );
};
