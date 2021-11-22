import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";

import {
  SignupBackground,
  PasswordInput,
  FormSection,
  NextButton,
  RightIconsInputContainer,
  ClearIcon,
  SeeIcon,
  NextText,
  RequirementRow,
  RequirementsList,
  MarkedIcon,
  ItemText,
} from "../styles/signup-password.styles";

const validationLetter = /^(?=.*[a-zA-Z])/;
const validationNumber = /^(?=.*[0-9])/;
const validationSpecialChar = /^(?=.*[!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*])/;
const validationAll = /^[a-zA-Z0-9!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*]+$/;

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .label("Password")
    .required("Please enter your password")
    .matches(validationAll, "Invalid")
    .matches(validationLetter)
    .matches(validationNumber)
    .matches(validationSpecialChar)
    .min(8, "Password should be at least 8 characters"),
});

export const SignupPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;

  const [hidePassword, setHidePassword] = useState(true);

  const handleSubmit = (values, errors) => {
    if (!(values.password !== "" && errors.password === undefined)) {
      return;
    }

    navigation.navigate("SignupName", {
      email: email,
      password: values.password,
    });
  };

  return (
    <SignupBackground>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <PasswordInput
              label="Password"
              placeholder="Set strong password"
              secureTextEntry={hidePassword}
              clearTextOnFocus={true}
              value={values.password}
              maxLength={50}
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
            {errors.password === "Invalid" && (
              <Text variant="signup_invalid">Invalid character</Text>
            )}

            <Spacer size="large" />

            <Text variant="pw_requirement_title">Your password requires:</Text>
            <RequirementsList>
              <RequirementRow>
                <MarkedIcon check={validationLetter.test(values.password)} />
                <ItemText check={validationLetter.test(values.password)}>
                  At least one letter
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon check={validationNumber.test(values.password)} />
                <ItemText check={validationNumber.test(values.password)}>
                  At least one number
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={validationSpecialChar.test(values.password)}
                />
                <ItemText check={validationSpecialChar.test(values.password)}>
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

            <Spacer size="large" />

            <NextButton
              enableButton={
                values.password !== "" && errors.password === undefined
              }
              title={
                <NextText
                  enableButton={
                    values.password !== "" && errors.password === undefined
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
