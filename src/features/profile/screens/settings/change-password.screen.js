import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";
import useLoader from "../../../../services/hooks/loader/useLoader";

import { changePassword } from "../../../../services/firebase/auth";

import {
  VALIDATE_PASSWORD_LETTER,
  VALIDATE_PASSWORD_NUMBER,
  VALIDATE_PASSWORD_SPECIAL_CHAR,
  VALIDATE_PASSWORD_ALL,
  PASSWORD_MAX_LENGTH,
} from "../../../../utils/constants";

import {
  ChangePasswordBackground,
  NewPasswordInput,
  FormSection,
  ChangeButton,
  RightIconsInputContainer,
  ClearIcon,
  SeeIcon,
  ChangeText,
  RequirementRow,
  RequirementsList,
  MarkedIcon,
  ItemText,
} from "./styles/change-password.styles";

const validationSchema = object().shape({
  newPassword: string()
    .label("New Password")
    .required("Please enter your password")
    .matches(VALIDATE_PASSWORD_ALL, "Invalid")
    .matches(VALIDATE_PASSWORD_LETTER)
    .matches(VALIDATE_PASSWORD_NUMBER)
    .matches(VALIDATE_PASSWORD_SPECIAL_CHAR)
    .min(8, "Password should be at least 8 characters"),
});

export const ChangePasswordScreen = ({ navigation, route }) => {
  const { currentPassword } = route.params;

  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [error, setError] = useState("");

  const [loader, showLoader, hideLoader] = useLoader();

  const handleSubmit = (values, errors) => {
    const { newPassword } = values;

    // When user clicks return type in keyboard, checks if any empty values or errors.
    // If it does, it returns nothing.
    if (
      !(newPassword !== "" && errors.newPassword === undefined && error === "")
    ) {
      return;
    } else if (newPassword === currentPassword) {
      setError(
        "You set the same password as current password. Please try different."
      );
    } else {
      showLoader();

      changePassword(newPassword, navigation, hideLoader);
    }
  };

  return (
    <ChangePasswordBackground>
      {loader}
      <Formik
        initialValues={{ newPassword: "" }}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <NewPasswordInput
              label="New Password"
              placeholder="Set strong password"
              returnKeyType="done"
              secureTextEntry={hideNewPassword}
              clearTextOnFocus={true}
              value={values.newPassword}
              maxLength={PASSWORD_MAX_LENGTH}
              autoFocus={true}
              blurOnSubmit={false}
              onChangeText={(newText) => {
                setFieldValue("newPassword", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("newPassword")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {values.newPassword !== "" && (
                    <ClearIcon
                      onPress={() => {
                        setFieldValue("newPassword", "");
                        if (error !== "") {
                          setError("");
                        }
                      }}
                    />
                  )}
                  <Spacer size="large" position="left" />
                  <SeeIcon
                    hide={hideNewPassword}
                    onPress={() => {
                      if (hideNewPassword) {
                        setHideNewPassword(false);
                      } else {
                        setHideNewPassword(true);
                      }
                    }}
                  />
                </RightIconsInputContainer>
              }
            />
            {errors.newPassword === "Invalid" && (
              <Text variant="input_invalid">Invalid character</Text>
            )}

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

            <Spacer size="medium" />

            <Text variant="pw_requirement_title">Your password requires:</Text>
            <RequirementsList>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_LETTER.test(values.newPassword)}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_LETTER.test(values.newPassword)}
                >
                  At least one letter
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_NUMBER.test(values.newPassword)}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_NUMBER.test(values.newPassword)}
                >
                  At least one number
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={VALIDATE_PASSWORD_SPECIAL_CHAR.test(
                    values.newPassword
                  )}
                />
                <ItemText
                  check={VALIDATE_PASSWORD_SPECIAL_CHAR.test(
                    values.newPassword
                  )}
                >
                  At least one special character
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon check={values.newPassword.length >= 8} />
                <ItemText check={values.newPassword.length >= 8}>
                  Minimum 8 characters
                </ItemText>
              </RequirementRow>
            </RequirementsList>

            <Spacer size="large" />

            <ChangeButton
              enableButton={
                values.newPassword !== "" && errors.newPassword === undefined
              }
              title={
                <ChangeText
                  enableButton={
                    values.newPassword !== "" &&
                    errors.newPassword === undefined
                  }
                >
                  Change
                </ChangeText>
              }
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </ChangePasswordBackground>
  );
};
