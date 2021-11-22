import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";

import { useDispatch } from "react-redux";
import { passwordReset } from "../../../services/redux/actions/auth.actions";

import {
  ForgotPasswordBackground,
  FormSection,
  SendButton,
  EmailInput,
  SendText,
} from "../styles/forgot-password.styles";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email"),
});

export const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, errors) => {
    if (!(values.email !== "" && errors.email === undefined)) {
      return;
    }

    // handlePasswordReset(values);
  };

  const handlePasswordReset = async (values) => {
    const { email } = values;

    try {
      dispatch(passwordReset(email));
      navigation.navigate("Login");
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
    <ForgotPasswordBackground>
      <Formik initialValues={{ email: "" }} validationSchema={validationSchema}>
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <Text variant="forgot_password_title">Forgot Password</Text>
            <Spacer position="top" size="medium" />
            <Text variant="forgot_password_message">
              Enter your email and we will send you a link to get back into your
              account.
            </Text>

            <Spacer size="huge" />

            <EmailInput
              label="Email"
              placeholder="abc123@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus={true}
              blurOnSubmit={false}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
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

            <SendButton
              enableButton={values.email !== "" && errors.email === undefined}
              title={
                <SendText
                  enableButton={
                    values.email !== "" && errors.email === undefined
                  }
                >
                  Send
                </SendText>
              }
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </ForgotPasswordBackground>
  );
};
