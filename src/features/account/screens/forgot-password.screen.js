import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {
  TextInput,
  HelperText,
  ActivityIndicator,
  Colors,
  Button,
} from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import { Formik } from "formik";

import * as yup from "yup";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { Text } from "../../../components/typography/text.components";
import { FacebookAndGoogleButtons } from "../components/fb-and-google-buttons.components";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const TopTextSection = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
`;

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
  font-family: ${(props) => props.theme.fonts.body_medium};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const ForgotPasswordText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_bold};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const MessageText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_bold};
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
`;

const HorizontalLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: black;
`;

const OrSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;

const OrText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body_medium};
  font-size: ${(props) => props.theme.fontSizes.body};
  text-align: center;
  align-self: center;
  width: 50px;
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
});

export const ForgotPasswordScreen = ({ navigation }) => {
  const { onPasswordReset, error, isLoading } = useContext(
    AuthenticationContext
  );

  const handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      onPasswordReset(email);
      navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  return (
    <SafeArea>
      <TopTextSection>
        <ForgotPasswordText>Trouble logging in?</ForgotPasswordText>
        <Spacer position="top" size="large" />
        <MessageText>
          Enter your email and we will send you a link to get back into your
          account.
        </MessageText>
      </TopTextSection>
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
          <ScrollView scrollEnabled={false}>
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

            <Text
              style={{ color: "red", paddingHorizontal: 40, marginTop: 10 }}
            >
              {errors.general}
            </Text>

            <OrSection>
              <HorizontalLine />
              <OrText>OR</OrText>
              <HorizontalLine />
            </OrSection>
            <Spacer size="medium" />
            <FacebookAndGoogleButtons />
          </ScrollView>
        )}
      </Formik>
      <Button
        color="white"
        uppercase={false}
        labelStyle={{
          fontSize: 13,
          color: colors.brand.primary,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back to Login
      </Button>
    </SafeArea>
  );
};
