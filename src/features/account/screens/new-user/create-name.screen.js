import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";

import { Spacer } from "../../../../components/spacer/spacer.components";
import { colors } from "../../../../infrastructure/theme/colors";
import { Text } from "../../../../components/typography/text.components";

import {
  VALIDATE_DISPLAYNAME,
  DISPLAYNAME_MAX_LENGTH,
} from "../../../../utils/constants";

import {
  SignupBackground,
  NameInput,
  FormSection,
  NextButton,
  NextText,
} from "./styles/create-name.styles";

const validationSchema = object().shape({
  displayName: string()
    .label("DisplayName")
    .required("")
    .matches(VALIDATE_DISPLAYNAME, "Invalid")
    .min(1, "Display name must contain at least 1 character"),
});

export const CreateNameScreen = ({ navigation }) => {
  const handleSubmit = (values, errors) => {
    if (!(values.displayName !== "" && errors.displayName === undefined)) {
      return;
    }

    navigation.navigate("CreateUsername", {
      displayName: values.displayName.trim(),
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
              returnKeyType="next"
              blurOnSubmit={false}
              autoFocus={true}
              maxLength={DISPLAYNAME_MAX_LENGTH}
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
              <Text variant="input_invalid">
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
