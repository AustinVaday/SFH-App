import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Spacer } from "../../../components/spacer/spacer.components";
import { colors } from "../../../infrastructure/theme/colors";

import {
  SignupBackground,
  EmailInput,
  FormSection,
  NextButton,
  NextText,
} from "../styles/signup-email.styles";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .required("Please enter your email")
    .email("Enter a valid email"),
});

export const SignupEmailScreen = ({ navigation }) => {
  const handleSubmit = (values, errors) => {
    if (!(values.email !== "" && errors.email === undefined)) {
      return;
    }

    navigation.navigate("SignupPassword", {
      email: values.email,
    });
  };

  return (
    <SignupBackground>
      <Formik initialValues={{ email: "" }} validationSchema={validationSchema}>
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
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

            <NextButton
              enableButton={values.email !== "" && errors.email === undefined}
              title={
                <NextText
                  enableButton={
                    values.email !== "" && errors.email === undefined
                  }
                >
                  Next
                </NextText>
              }
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </SignupBackground>
  );
};
