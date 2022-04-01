import React, { useState, createRef } from "react";
import { ScrollView, Pressable, Keyboard } from "react-native";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import { object, string } from "yup";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../../components/typography/text.components";
import useLoader from "../../../services/hooks/loader/useLoader";

import { createWord } from "../../../services/firebase/words";

import {
  UploadWordBackground,
  UploadButton,
  TitleInput,
  DescriptionInput,
  Form,
  InputsContainer,
  VideoContainer,
  FullPreviewVideo,
  PreviewThumbnail,
  ModalScreen,
  BackIconContainer,
  BackIcon,
} from "./styles/upload-word.styles";

const validationSchema = object().shape({
  title: string().required("Please fill out the title"),
  description: string().label("Description"),
});

export const UploadWordScreen = ({ navigation, route }) => {
  const { source, sourceThumb } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  const [loader, showLoader, hideLoader] = useLoader();

  const titleRef = createRef();
  const descriptionRef = createRef();

  const insets = useSafeAreaInsets();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSubmit = (values, errors) => {
    setIsSubmitting(true);
    if (errors.title === undefined && values.title === "") {
      Toast.show({
        type: "infoError",
        props: {
          message: "Please fill out everything.",
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      setIsSubmitting(false);
    } else if (values.title === "" || errors.title !== undefined) {
      Toast.show({
        type: "infoError",
        props: {
          message: errors.title,
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      setIsSubmitting(false);
    } else if (!errors.title && !errors.description) {
      submit(values);
    }
  };

  const submit = async (values) => {
    setIsSubmitting(false);
    showLoader();

    createWord(values.title, values.description, source, sourceThumb)
      .then(() => {
        hideLoader();

        Toast.show({
          type: "infoSuccess",
          props: {
            message: "Your word is uploaded successfully.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });

        navigation.pop(3);
      })
      .catch(() => hideLoader());
  };

  return (
    <UploadWordBackground style={{ paddingBottom: insets.bottom }}>
      {loader}
      <ModalScreen
        isVisible={visible}
        swipeDirection={["up", "down", "left", "right"]}
        onSwipeComplete={toggleOverlay}
        swipeThreshold={200}
      >
        <FullPreviewVideo
          shouldPlay={true}
          isLooping={true}
          source={{
            uri: source,
          }}
        />
        <BackIconContainer style={{ top: insets.top + 10 }}>
          <BackIcon onPress={toggleOverlay} />
        </BackIconContainer>
        <StatusBar style="light" />
      </ModalScreen>

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors }) => (
          <Form>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <VideoContainer>
                <Pressable onPress={toggleOverlay}>
                  <PreviewThumbnail source={{ uri: sourceThumb }} />
                </Pressable>
              </VideoContainer>
              <InputsContainer>
                <TitleInput
                  ref={titleRef}
                  value={values.title}
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={true}
                />
                <DescriptionInput
                  ref={descriptionRef}
                  value={values.description}
                  placeholder="Description (optional)"
                  onChangeText={handleChange("description")}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={true}
                />
              </InputsContainer>
            </ScrollView>
            <UploadButton
              loading={isSubmitting}
              title={<Text variant="uploadword_word_button">Upload</Text>}
              onPress={() => handleSubmit(values, errors)}
            />
          </Form>
        )}
      </Formik>

      <StatusBar style="auto" />
    </UploadWordBackground>
  );
};
