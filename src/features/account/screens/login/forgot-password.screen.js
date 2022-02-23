import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { colors } from "../../../../infrastructure/theme/colors";
import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";

import { passwordReset } from "../../../../services/firebase/auth";

import {
  ForgotPasswordBackground,
  FormSection,
  SendButton,
  EmailInput,
  SendText,
} from "./styles/forgot-password.styles";

const validationSchema = object().shape({
  email: string().label("Email").email().required(),
});

export const ForgotPasswordScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, errors) => {
    if (!(values.email !== "" && errors.email === undefined)) {
      return;
    }

    setLoading(true);

    handlePasswordReset(values);
  };

  const handlePasswordReset = (values) => {
    const { email } = values;

    passwordReset(email, setError, setLoading, navigation);
  };

  return (
    <ForgotPasswordBackground>
      <Formik initialValues={{ email: "" }} validationSchema={validationSchema}>
        {({ values, errors, setFieldValue, handleBlur }) => (
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
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
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

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

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
              loading={loading}
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
