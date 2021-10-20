import React from "react";
import { ScrollView, Pressable } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";

import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../../../services/redux/actions/auth.actions";

const TextInputsSection = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const SendButtonSection = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email"),
});

export const FormForgotPassword = ({ onNavigate }) => {
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const handlePasswordReset = async (values) => {
    const { email } = values;

    try {
      dispatch(passwordReset(email));
      onNavigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        topOffset: 45,
      });
    }
  };

  const handleSubmit = (values, errors) => {
    if (errors.email === undefined && values.email === "") {
      Toast.show({
        type: "error",
        text2: "Please fill out the email.",
        topOffset: 45,
      });
    } else if (values.email === "" || errors.email !== undefined) {
      Toast.show({
        type: "error",
        text1: "Email",
        text2: errors.email,
        topOffset: 45,
      });
    } else if (!errors.email) {
      handlePasswordReset(values);
    }
  };

  return (
    <Formik initialValues={{ email: "" }} validationSchema={validationSchema}>
      {({ handleChange, values, errors, touched, handleBlur }) => (
        <ScrollView scrollEnabled={false} style={{ flexGrow: 0 }}>
          <TextInputsSection>
            <TextInput
              mode="outlined"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              label="Enter email"
              style={{ height: 50, paddingBottom: 10 }}
              theme={{
                roundness: 15,
                colors: {
                  primary:
                    touched.email && errors.email
                      ? colors.text.error
                      : colors.text.brand,
                  placeholder:
                    touched.email && errors.email
                      ? colors.ui.error
                      : colors.ui.quinary,
                  background: colors.bg.primary,
                },
              }}
            />
          </TextInputsSection>

          <SendButtonSection>
            <Pressable
              onPress={() => {
                handleSubmit(values, errors);
              }}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.brand.primary, "#6dd5ed"]}
                style={{
                  height: 50,
                  borderRadius: 15,
                  alignItems: "center",
                  padding: 15,
                }}
              >
                {!isLoading ? (
                  <Text variant="contained_button" style={{ fontSize: 15 }}>
                    SEND
                  </Text>
                ) : (
                  <ActivityIndicator animating={true} color="white" />
                )}
              </LinearGradient>
            </Pressable>
          </SendButtonSection>
        </ScrollView>
      )}
    </Formik>
  );
};
