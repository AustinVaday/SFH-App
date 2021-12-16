import React, { useState } from "react";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/redux/actions/auth.actions";

import {
  LoginBackground,
  EmailInput,
  PasswordInput,
  ForgotPasswordButton,
  FormSection,
  LoginButton,
  LoginText,
  RightIconsInputContainer,
  SeeIcon,
  ClearIcon,
} from "../styles/login.styles";

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
    .min(6, "Password should be at least 5 characters"),
});

export const LoginScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handleSubmit = (values, errors) => {
    onSignIn(values);
  };

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

  return (
    <LoginBackground>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
        }) => (
          <FormSection>
            <EmailInput
              touched={touched.email}
              errors={errors.email}
              label="Email"
              placeholder="abc123@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus={true}
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              rightIcon={
                values.email !== "" && {
                  type: "material-community",
                  name: "close-circle",
                  size: 20,
                  color: colors.icon.gray,
                  onPress: () => setFieldValue("email", ""),
                }
              }
            />

            <Spacer size="large" />

            <PasswordInput
              touched={touched.password}
              errors={errors.password}
              label="Password"
              placeholder="Set strong password"
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {values.password !== "" && (
                    <ClearIcon onPress={() => setFieldValue("password", "")} />
                  )}
                  <Spacer size="medium" position="left" />
                  <SeeIcon
                    hidePassword={hidePassword}
                    onPress={() => {
                      if (hidePassword) {
                        setHidePassword(false);
                      } else {
                        setHidePassword(true);
                      }
                    }}
                  />
                </RightIconsInputContainer>
              }
            />

            <Spacer size="medium" />

            <ForgotPasswordButton
              title={
                <Text variant="forgot_password_button">Forgot password?</Text>
              }
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            />

            <Spacer size="large" />

            <LoginButton
              enableButton={touched.email && !errors.email && !errors.password}
              title={
                <LoginText
                  enableButton={
                    touched.email && !errors.email && !errors.password
                  }
                >
                  Login
                </LoginText>
              }
              loading={isLoading}
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </LoginBackground>
  );
};
