import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";
import { colors } from "../../../../infrastructure/theme/colors";

import { login } from "../../../../services/firebase/auth";

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
} from "./styles/login.styles";

const validationSchema = object().shape({
  email: string().label("Email").required(""),
  password: string().label("Password").required(""),
});

export const LoginScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    // When user clicks return type in keyboard, checks if any empty values or errors.
    // If it does, it returns nothing.
    if (values.email === "" && values.password === "") {
      return;
    }

    setLoading(true);

    onSignIn(values);
  };

  const onSignIn = (values) => {
    const { email, password } = values;

    login(email, password, setError, setLoading);
  };

  return (
    <LoginBackground>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, handleBlur }) => (
          <FormSection>
            <EmailInput
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus={true}
              blurOnSubmit={false}
              value={values.email}
              onChangeText={(newText) => {
                setFieldValue("email", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("email")}
              rightIcon={
                values.email !== "" && {
                  type: "material-community",
                  name: "close-circle",
                  size: 20,
                  color: colors.icon.gray,
                  onPress: () => {
                    setFieldValue("email", "");
                    if (error !== "") {
                      setError("");
                    }
                  },
                }
              }
            />

            <Spacer size="large" />

            <PasswordInput
              label="Password"
              placeholder="Password"
              secureTextEntry={hidePassword}
              blurOnSubmit={false}
              value={values.password}
              onChangeText={(newText) => {
                setFieldValue("password", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("password")}
              onSubmitEditing={() => {
                handleSubmit(values);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {values.password !== "" && (
                    <ClearIcon
                      onPress={() => {
                        setFieldValue("password", "");
                        if (error !== "") {
                          setError("");
                        }
                      }}
                    />
                  )}
                  <Spacer size="large" position="left" />
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

            <Spacer size="small" />

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

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
              enableButton={values.email !== "" && values.password !== ""}
              title={
                <LoginText
                  enableButton={values.email !== "" && values.password !== ""}
                >
                  Login
                </LoginText>
              }
              loading={loading}
              onPress={() => {
                handleSubmit(values);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </LoginBackground>
  );
};
