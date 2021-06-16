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
import NetInfo from "@react-native-community/netinfo";
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

const ForgotPasswordSection = styled.View`
  align-items: flex-end;
`;

const LoginButtonSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[4]};
`;

const SignUpSection = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const LoginText = styled(Text)`
  color: white;
  font-family: ${(props) => props.theme.fonts.body_medium};
  font-size: ${(props) => props.theme.fontSizes.button};
`;

const WelcomeText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_bold};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const ContinueLoginText = styled(Text)`
  color: #bdc3d4;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const NewUserText = styled(Text)`
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

// create the Network Information
const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// to unsubscribe to these update, just use:
unsubscribe();

export const LoginScreen = ({ navigation }) => {
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
    <SafeArea>
      <TopTextSection>
        <WelcomeText>Welcome</WelcomeText>
        <ContinueLoginText>Log in to continue!</ContinueLoginText>
      </TopTextSection>
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
          <ScrollView scrollEnabled={false}>
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
              <ForgotPasswordSection>
                <Button
                  color="white"
                  labelStyle={{
                    fontSize: 10,
                    color: colors.brand.primary,
                  }}
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  Forgot password?
                </Button>
              </ForgotPasswordSection>
            </TextInputsSection>
            <LoginButtonSection>
              {!isLoading ? (
                <GradientButton
                  text={<LoginText>Login</LoginText>}
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
            </LoginButtonSection>
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
      <SignUpSection>
        <NewUserText>Don't have an account?</NewUserText>
        <Button
          color="white"
          uppercase={false}
          labelStyle={{
            fontSize: 12,
            color: colors.brand.primary,
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Sign up
        </Button>
      </SignUpSection>
    </SafeArea>
  );
};
