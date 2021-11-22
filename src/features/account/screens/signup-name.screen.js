import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Spacer } from "../../../components/spacer/spacer.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import {
  SignupBackground,
  NameInput,
  FormSection,
  NextButton,
  NextText,
} from "../styles/signup-name.styles";

const validationName = /^[a-zA-Z]+$/;

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .label("DisplayName")
    .required("Please fill the display name")
    .matches(validationName, "Invalid")
    .min(2, "Display name must contain at least 2 characters"),
});

export const SignupNameScreen = ({ navigation, route }) => {
  const { email, password } = route.params;

  const handleSubmit = (values, errors) => {
    if (!(values.displayName !== "" && errors.displayName === undefined)) {
      return;
    }

    navigation.navigate("SignupUsername", {
      email: email,
      password: password,
      displayName: values.displayName,
    });
  };

  return (
    <SignupBackground>
      <Formik
        initialValues={{ displayName: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <NameInput
              label="Display Name"
              placeholder="Helen Keller"
              blurOnSubmit={false}
              autoFocus={true}
              maxLength={50}
              value={values.displayName}
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                values.email !== "" && {
                  type: "material-community",
                  name: "close-circle",
                  size: 20,
                  color: colors.icon.gray,
                  onPress: () => setFieldValue("displayName", ""),
                }
              }
            />
            {errors.displayName === "Invalid" && (
              <Text variant="signup_invalid">
                No numbers or special characters
              </Text>
            )}

            <Text variant="signup_info">
              Enter a name (e.g. your first name, full name, or nickname)
            </Text>

            <Spacer size="large" />

            <NextButton
              enableButton={
                values.displayName !== "" && errors.displayName === undefined
              }
              title={
                <NextText
                  enableButton={
                    values.displayName !== "" &&
                    errors.displayName === undefined
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
