import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";
import useLoader from "../../../../services/hooks/loader/useLoader";

import { registerWithEmail } from "../../../../services/firebase/auth";

import {
  VALIDATE_PASSWORD_LETTER,
  VALIDATE_PASSWORD_NUMBER,
  VALIDATE_PASSWORD_SPECIAL_CHAR,
  VALIDATE_PASSWORD_ALL,
  PASSWORD_MAX_LENGTH,
} from "../../../../utils/constants";

import {
  SignupBackground,
  PasswordInput,
  FormSection,
  SignupButton,
  RightIconsInputContainer,
  ClearIcon,
  SeeIcon,
  TextButton,
  RequirementRow,
  RequirementsList,
  MarkedIcon,
  ItemText,
} from "./styles/signup-password.styles";

const validationSchema = object().shape({
  password: string()
    .label("Password")
    .required("Please enter your password")
    .matches(VALIDATE_PASSWORD_ALL, "Invalid")
    .matches(VALIDATE_PASSWORD_LETTER)
    .matches(VALIDATE_PASSWORD_NUMBER)
    .matches(VALIDATE_PASSWORD_SPECIAL_CHAR)
    .min(8, "Password should be at least 8 characters"),
});

export const SignupPasswordScreen = ({ route }) => {
  const { email } = route.params;

  const [hidePassword, setHidePassword] = useState(true);

  const [loader, showLoader, hideLoader] = useLoader();

  const handleSubmit = (values, errors) => {
    if (!(values.password !== "" && errors.password === undefined)) {
      return;
    }

    showLoader();

    registerWithEmail(email, values.password, hideLoader);
  };

  return (
    <SignupBackground>
      {loader}
      <Formik
        initialValues={{ password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <PasswordInput
              label="Password"
              placeholder="Set strong password"
              returnKeyType="done"
              secureTextEntry={hidePassword}
              clearTextOnFocus={true}
              value={values.password}
              maxLength={PASSWORD_MAX_LENGTH}
              autoFocus={true}
              blurOnSubmit={false}
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
            {errors.password === "Invalid" && (
              <Text variant="input_invalid">Invalid character</Text>
            )}

            <Spacer size="medium" />

            <Text variant="pw_requirement_title">Your password requires:</Text>
            <RequirementsList>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_LETTER.test(values.password)}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_LETTER.test(values.password)}
                >
                  At least one letter
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_NUMBER.test(values.password)}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_NUMBER.test(values.password)}
                >
                  At least one number
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_SPECIAL_CHAR.test(values.password)}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_SPECIAL_CHAR.test(values.password)}
                >
                  At least one special character
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon check={values.password.length >= 8} />
                <ItemText check={values.password.length >= 8}>
                  Minimum 8 characters
                </ItemText>
              </RequirementRow>
            </RequirementsList>

            <Text variant="signup_info">
              You will receive the email to verify it after creating your
              password.
            </Text>

            <Spacer size="large" />

            <SignupButton
              enableButton={
                values.password !== "" && errors.password === undefined
              }
              title={
                <TextButton
                  enableButton={
                    values.password !== "" && errors.password === undefined
                  }
                >
                  {route.name === "SignupPassword" ? "Signup" : "Link"}
                </TextButton>
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
