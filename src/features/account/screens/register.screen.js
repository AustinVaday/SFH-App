import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {
  TextInput,
  HelperText,
  Button,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import { Formik } from "formik";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const TopTextSection = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

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

const SignInSection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const SignUpText = styled(Text)`
  color: white;
  font-family: ${(props) => props.theme.fonts.body_medium};
  font-size: ${(props) => props.theme.fontSizes.button};
`;

const CreateAccountText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_bold};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const SignUpStartedText = styled(Text)`
  color: #bdc3d4;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const AlreadyAccountText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: black;
`;

const OrSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;

const OrText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_medium};
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
  align-self: center;
  width: 50px;
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

export const RegisterScreen = ({ navigation }) => {
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
    <SafeArea>
      <TopTextSection>
        <CreateAccountText>Create Account</CreateAccountText>
        <SignUpStartedText>Sign up to get started!</SignUpStartedText>
      </TopTextSection>
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
          <ScrollView scrollEnabled={false}>
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
            <OrSection>
              <HorizontalLine />
              <OrText>OR</OrText>
              <HorizontalLine />
            </OrSection>
            <Spacer size="medium" />
            <FacebookAndGoogleButtons />
          </ScrollView>
        )}
      </Formik>
      <SignInSection>
        <AlreadyAccountText>Already have an account?</AlreadyAccountText>
        <Button
          color="white"
          uppercase={false}
          labelStyle={{
            fontSize: 14,
            color: colors.brand.primary,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Button>
      </SignInSection>
    </SafeArea>
  );
};
