import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";
import useLoader from "../../../../services/hooks/loader/useLoader";

import { changePassword } from "../../../../services/firebase/auth";

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

const validationLetter = /^(?=.*[a-zA-Z])/;
const validationNumber = /^(?=.*[0-9])/;
const validationSpecialChar = /^(?=.*[!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*])/;
const validationAll = /^[a-zA-Z0-9!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*]+$/;

const validationSchema = object().shape({
  newPassword: string()
    .label("New Password")
    .required("Please enter your password")
    .matches(validationAll, "Invalid")
    .matches(validationLetter)
    .matches(validationNumber)
    .matches(validationSpecialChar)
    .min(8, "Password should be at least 8 characters"),
});

export const ChangePasswordScreen = ({ navigation, route }) => {
  const { currentPassword } = route.params;

  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [error, setError] = useState("");

  const [loader, showLoader, hideLoader] = useLoader();

  const handleSubmit = (values, errors) => {
    const { newPassword } = values;

    if (!(newPassword !== "" && errors.newPassword === undefined)) {
      console.log("return");
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
              maxLength={30}
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
                  <Spacer size="medium" position="left" />
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
                <MarkedIcon check={validationLetter.test(values.newPassword)} />
                <ItemText check={validationLetter.test(values.newPassword)}>
                  At least one letter
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon check={validationNumber.test(values.newPassword)} />
                <ItemText check={validationNumber.test(values.newPassword)}>
                  At least one number
                </ItemText>
              </RequirementRow>
              <RequirementRow>
                <MarkedIcon
                  check={validationSpecialChar.test(values.newPassword)}
                />
                <ItemText
                  check={validationSpecialChar.test(values.newPassword)}
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
