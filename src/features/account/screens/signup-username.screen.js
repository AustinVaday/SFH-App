import React from "react";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import { Spacer } from "../../../components/spacer/spacer.components";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../services/redux/actions/auth.actions";

import {
  SignupBackground,
  UsernameInput,
  FormSection,
  SignupButton,
  SignupText,
} from "../styles/signup-username.styles";

const validationUsername = /^\w[\w.]{0,18}\w$/;
const validationLetter = /^(?=.*[a-zA-Z])/;

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label("Username")
    .required("")
    .min(2, "")
    .matches(validationUsername, "")
    .matches(validationLetter, "Numbers only are not allowed"),
});

export const SignupUsernameScreen = ({ route }) => {
  const { email, password, displayName } = route.params;

  const isLoading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const handleSubmit = (values, errors) => {
    if (!(values.username !== "" && errors.username === undefined)) {
      return;
    }

    onSignUp(values);
  };

  const onSignUp = async (values) => {
    const { username } = values;

    try {
      dispatch(register(email, password, displayName, username));
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
    <SignupBackground>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <UsernameInput
              label="Username"
              placeholder="username123"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={50}
              autoFocus={true}
              blurOnSubmit={false}
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                values.username !== "" && {
                  type: "material-community",
                  name: "close-circle",
                  size: 20,
                  color: colors.icon.gray,
                  onPress: () => setFieldValue("username", ""),
                }
              }
            />
            {errors.username && (
              <Text variant="signup_invalid">{errors.username}</Text>
            )}

            <Text variant="signup_info">
              Username contains only letters and/or numbers. Underscores or
              periods are allowed.
            </Text>

            <Spacer size="large" />

            <SignupButton
              enableButton={
                values.username !== "" && errors.username === undefined
              }
              title={
                <SignupText
                  enableButton={
                    values.username !== "" && errors.username === undefined
                  }
                >
                  Signup
                </SignupText>
              }
              loading={isLoading}
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
