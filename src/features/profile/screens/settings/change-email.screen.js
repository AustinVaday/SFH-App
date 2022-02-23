import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Text } from "../../../../components/typography/text.components";
import { Spacer } from "../../../../components/spacer/spacer.components";
import { colors } from "../../../../infrastructure/theme/colors";
import useLoader from "../../../../services/hooks/loader/useLoader";

import { changeEmail } from "../../../../services/firebase/auth";

import {
  ChangeEmailBackground,
  EmailInput,
  PasswordInput,
  FormSection,
  ChangeEmailButton,
  ChangeEmailText,
  RightIconsInputContainer,
  SeeIcon,
  ClearIcon,
} from "./styles/change-email.styles";

const validationSchema = object().shape({
  newEmail: string().label("Email").required("").email("Enter a valid email"),
  password: string().label("Password").required(""),
});

export const ChangeEmailScreen = ({ navigation, route }) => {
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [loader, showLoader, hideLoader] = useLoader();

  const handleSubmit = (values, errors) => {
    const { newEmail, password } = values;

    if (newEmail === "" && password === "") {
      return;
    } else if (errors?.newEmail !== undefined) {
      setError("Invalid formatting email.");
      return;
    }

    changeEmail(newEmail, password, navigation, setError, showLoader, hideLoader);
  };

  return (
    <ChangeEmailBackground>
      {loader}
      <Formik
        initialValues={{ newEmail: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <EmailInput
              label="New Email"
              placeholder="New email"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              autoFocus={true}
              blurOnSubmit={false}
              value={values.newEmail}
              onChangeText={(newText) => {
                setFieldValue("newEmail", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("email")}
              onSubmitEditing={() => {
                handleSubmit(values, errors);
              }}
              rightIcon={
                values.newEmail !== "" && {
                  type: "material-community",
                  name: "close-circle",
                  size: 20,
                  color: colors.icon.gray,
                  onPress: () => {
                    if (error !== "") {
                      setError("");
                    }
                    setFieldValue("newEmail", "");
                  },
                }
              }
            />

            <Spacer size="large" />

            <PasswordInput
              label="Current Password"
              placeholder="Current password"
              secureTextEntry={hidePassword}
              returnKeyType="done"
              blurOnSubmit={false}
              value={values.password}
              onChangeText={(newText) => {
                setFieldValue("password", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("password")}
              onSubmitEditing={() => {
                handleSubmit(values);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {values.password !== "" && (
                    <ClearIcon
                      onPress={() => {
                        setFieldValue("password", "");
                        if (error !== "") {
                          setError("");
                        }
                      }}
                    />
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

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

            <Spacer size="large" />

            <ChangeEmailButton
              enableButton={values.newEmail !== "" && values.password !== ""}
              title={
                <ChangeEmailText
                  enableButton={
                    values.newEmail !== "" && values.password !== ""
                  }
                >
                  Change
                </ChangeEmailText>
              }
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </ChangeEmailBackground>
  );
};
