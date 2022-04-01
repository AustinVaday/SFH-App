import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";

import { checkAvailableUsername } from "../../../../services/firebase/auth";

import {
  VALIDATE_USERNAME,
  VALIDATE_USERNAME_LETTER,
  USERNAME_MAX_LENGTH,
} from "../../../../utils/constants";

import {
  SignupBackground,
  UsernameInput,
  FormSection,
  SignupButton,
  SignupText,
  RightIconsInputContainer,
  CheckIcon,
  ClearIcon,
} from "./styles/create-username.styles";

const validationSchemaYup = object().shape({
  username: string()
    .label("Username")
    .required("")
    .min(2, "Must be at least 2 characters.")
    .matches(
      VALIDATE_USERNAME,
      "Only numbers, letters, underscores or periods are allowed."
    )
    .matches(VALIDATE_USERNAME_LETTER, "Numbers only are not allowed."),
});

export const CreateUsernameScreen = ({ route, navigation }) => {
  const { displayName } = route.params;

  const [usernameValidation, setUsernameValidation] = useState({
    isValidate: false,
    isTyping: false,
    error: "",
    loading: false,
  });
  const [searchTimer, setSearchTimer] = useState(null);

  const handleSubmit = (values, errors) => {
    if (
      !(
        values.username !== "" &&
        errors.username === undefined &&
        usernameValidation.isValidate
      )
    ) {
      return;
    }

    onSignUp(values);
  };

  const onSignUp = (values) => {
    const { username } = values;

    navigation.navigate("Introduction", { displayName, username });
  };

  return (
    <SignupBackground>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={validationSchemaYup}
      >
        {({ values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <UsernameInput
              label="Username"
              placeholder="username123"
              autoCapitalize="none"
              returnKeyType="done"
              autoCorrect={false}
              maxLength={USERNAME_MAX_LENGTH}
              autoFocus={true}
              blurOnSubmit={false}
              value={values.username}
              onChangeText={(newText) => {
                setUsernameValidation({ isTyping: true, error: "" });

                if (searchTimer) {
                  clearTimeout(searchTimer);
                }

                setFieldValue("username", newText).then((validationErrors) => {
                  if (newText !== "") {
                    setSearchTimer(
                      setTimeout(() => {
                        setUsernameValidation({ loading: true, error: "" });
                        checkAvailableUsername(newText.toLowerCase())
                          .then((validate) => {
                            if (
                              validate &&
                              validationErrors.username === undefined
                            ) {
                              setUsernameValidation({
                                isValidate: validate,
                                isTyping: false,
                                error: "",
                                loading: false,
                              });
                            } else if (
                              !validate &&
                              validationErrors.username === undefined
                            ) {
                              setUsernameValidation({
                                isValidate: validate,
                                isTyping: false,
                                error:
                                  "The username is taken by another account.",
                                loading: false,
                              });
                            } else {
                              setUsernameValidation({
                                isValidate: false,
                                isTyping: false,
                                error: validationErrors.username,
                                loading: false,
                              });
                            }
                          })
                          .catch((error) => {
                            Toast.show({
                              type: "infoError",
                              props: {
                                message: error.message,
                              },
                              visibilityTime: 3000,
                              topOffset: 45,
                            });

                            setUsernameValidation({
                              isValidate: false,
                              isTyping: false,
                              error: "",
                              loading: false,
                            });
                          });
                      }, 1000)
                    );
                  }
                });
              }}
              onBlur={handleBlur("username")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {usernameValidation.loading ? (
                    <ActivityIndicator size="small" color="#999999" />
                  ) : (
                    usernameValidation.isValidate && <CheckIcon />
                  )}
                  <Spacer size="medium" position="left" />
                  {values.username !== "" && (
                    <ClearIcon
                      onPress={() => {
                        setFieldValue("username", "");
                        setUsernameValidation({ isValidate: false, error: "" });
                      }}
                    />
                  )}
                </RightIconsInputContainer>
              }
            />

            {usernameValidation.error !== "" && (
              <Text variant="input_invalid">{usernameValidation.error}</Text>
            )}

            <Text variant="signup_info">
              Username contains only letters or mixed with numbers. No numbers
              only allowed. Underscores or periods are allowed.
            </Text>

            <Spacer size="large" />

            <SignupButton
              enableButton={
                values.username !== "" &&
                errors.username === undefined &&
                usernameValidation.isValidate &&
                !usernameValidation.isTyping
              }
              title={
                <SignupText
                  enableButton={
                    values.username !== "" &&
                    errors.username === undefined &&
                    usernameValidation.isValidate &&
                    !usernameValidation.isTyping
                  }
                >
                  Signup
                </SignupText>
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
