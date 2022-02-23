import React, { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { Text } from "../../../../components/typography/text.components";

import { reauthenticateUserWithEmail } from "../../../../services/firebase/auth";

import {
  CurrentPasswordBackground,
  CurrentPasswordInput,
  FormSection,
  NextButton,
  RightIconsInputContainer,
  ClearIcon,
  SeeIcon,
  NextText,
} from "./styles/current-password.styles";

const validationSchema = object().shape({
  currentPassword: string().label("Current Password").required(""),
});

export const CurrentPasswordScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);

  const handleSubmit = (values, errors) => {
    const { currentPassword } = values;

    if (currentPassword === "") {
      setError("Please fill the current password.");
      return;
    } else {
      setLoading(true);

      reauthenticateUserWithEmail(currentPassword)
        .then(() => {
          setLoading(false);
          navigation.navigate("ChangePassword", { currentPassword });
        })
        .catch((error) => {
          setLoading(false);
          setError("Incorrect password.");
        });
    }
  };

  return (
    <CurrentPasswordBackground>
      <Formik
        initialValues={{ currentPassword: "" }}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleBlur }) => (
          <FormSection>
            <CurrentPasswordInput
              label="Current Password"
              placeholder="Current password"
              secureTextEntry={hideCurrentPassword}
              blurOnSubmit={false}
              autoFocus={true}
              value={values.currentPassword}
              onChangeText={(newText) => {
                setFieldValue("currentPassword", newText);

                if (error !== "") {
                  setError("");
                }
              }}
              onBlur={handleBlur("currentPassword")}
              onSubmitEditing={() => {
                handleSubmit(values);
              }}
              rightIcon={
                <RightIconsInputContainer>
                  {values.currentPassword !== "" && (
                    <ClearIcon
                      onPress={() => {
                        setFieldValue("currentPassword", "");
                        if (error !== "") {
                          setError("");
                        }
                      }}
                    />
                  )}
                  <Spacer size="medium" position="left" />
                  <SeeIcon
                    hideCurrentPassword={hideCurrentPassword}
                    onPress={() => {
                      if (hideCurrentPassword) {
                        setHideCurrentPassword(false);
                      } else {
                        setHideCurrentPassword(true);
                      }
                    }}
                  />
                </RightIconsInputContainer>
              }
            />

            {error !== "" && <Text variant="input_invalid">{error}</Text>}

            <Spacer size="large" />

            <NextButton
              enableButton={values.currentPassword !== ""}
              title={
                <NextText enableButton={values.currentPassword !== ""}>
                  Next
                </NextText>
              }
              loading={loading}
              onPress={() => {
                handleSubmit(values, errors);
              }}
            />
          </FormSection>
        )}
      </Formik>
    </CurrentPasswordBackground>
  );
};
