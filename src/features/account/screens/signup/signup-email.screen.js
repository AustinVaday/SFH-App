import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Text } from "../../../../components/typography/text.components";
import { Spacer } from "../../../../components/spacer/spacer.components";
import { colors } from "../../../../infrastructure/theme/colors";

import { firebase } from "../../../../utils/firebase";

import {
  SignupBackground,
  EmailInput,
  FormSection,
  NextButton,
  NextText,
} from "./styles/signup-email.styles";

const validationSchema = object().shape({
  email: string().label("Email").required("").email("Enter a valid email"),
});

export const SignupEmailScreen = ({ navigation, route }) => {
  const [error, setError] = useState("");

  const handleSubmit = (values, errors) => {
    if (!(values.email !== "" && errors.email === undefined && error === "")) {
      return;
    }

    const emailMethod =
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD;

    firebase
      .auth()
      .fetchSignInMethodsForEmail(values.email)
      .then((signInMethods) => {
        if (signInMethods.indexOf(emailMethod) !== -1) {
          setError("The email address is already registered.");
          return;
        } else {
          navigation.navigate("SignupPassword", {
            email: values.email,
          });
        }
      });
  };

  return (
    <SignupBackground>
      <Formik initialValues={{ email: "" }} validationSchema={validationSchema}>
        {({ values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <EmailInput
              label="Email"
              placeholder="abc123@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
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
                    if (error !== "") {
                      setError("");
                    }
                    setFieldValue("email", "");
                  },
                }
              }
            />

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

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
