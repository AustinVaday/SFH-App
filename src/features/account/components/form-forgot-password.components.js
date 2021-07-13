import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {
  TextInput,
  HelperText,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import { Formik } from "formik";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const TextInputsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const SendButtonSection = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
`;

const SendText = styled(Text)`
  color: white;
  font-family: ${(props) => props.theme.fonts.body_400};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
});

export const FormForgotPassword = ({ onNavigate }) => {
  const { onPasswordReset, error, isLoading } = useContext(
    AuthenticationContext
  );

  const handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      onPasswordReset(email);
      onNavigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, actions) => {
        handlePasswordReset(values, actions);
      }}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        values,
        handleSubmit,
        errors,
        touched,
        handleBlur,
      }) => (
        <ScrollView scrollEnabled={false} style={{ flexGrow: 0 }}>
          <TextInputsSection>
            <TextInput
              mode="outlined"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              label="Enter email"
              style={{ height: 50 }}
              theme={{
                roundness: 15,
                colors: {
                  primary: colors.brand.primary,
                  nderlineColor: "blue",
                  placeholder: "#cecbce",
                  background: "white",
                },
              }}
            />
            <HelperText type="error" visible={errors}>
              {touched.email && errors.email}
            </HelperText>
          </TextInputsSection>

          <SendButtonSection>
            {!isLoading ? (
              <GradientButton
                text={<SendText>Send</SendText>}
                gradientBegin={colors.brand.primary}
                gradientEnd="#6dd5ed"
                gradientDirection="vertical"
                height={50}
                radius={15}
                onPressAction={handleSubmit}
              />
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </SendButtonSection>

          <Text style={{ color: "red", paddingHorizontal: 40, marginTop: 10 }}>
            {errors.general}
          </Text>
        </ScrollView>
      )}
    </Formik>
  );
};
