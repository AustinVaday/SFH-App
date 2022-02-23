import React, { useState, createRef } from "react";
import { ScrollView, Pressable, Keyboard } from "react-native";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import Toast from "react-native-toast-message";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";

import { createPost } from "../../../services/firebase/posts";

import { Text } from "../../../components/typography/text.components";

import useLoader from "../../../services/hooks/loader/useLoader";

import {
  UploadPostBackground,
  NavBar,
  PostButton,
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
} from "./styles/upload-post.styles";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out the title"),
  description: Yup.string().label("Description"),
});

export const UploadPostScreen = ({ navigation, route }) => {
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
        visibilityTime: 2000,
        topOffset: 45,
      });
      setIsSubmitting(false);
    } else if (values.title === "" || errors.title !== undefined) {
      Toast.show({
        type: "infoError",
        props: {
          message: errors.title,
        },
        visibilityTime: 2000,
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

    createPost(values.title, values.description, source, sourceThumb)
      .then(() => {
        hideLoader();
        navigation.dispatch(
          CommonActions.reset({ index: 1, routes: [{ name: "Home" }] })
        );
      })
      .catch(() => hideLoader());
  };

  return (
    <UploadPostBackground style={{ paddingBottom: insets.bottom }}>
      {loader}
      <NavBar
        nav={navigation}
        centerComponent={<Text variant="navbar_title">Post</Text>}
      />

      <ModalScreen
        isVisible={visible}
        swipeDirection={["up", "down", "left", "right"]}
        onSwipeComplete={toggleOverlay}
        swipeThreshold={200}
      >
        <FullPreviewVideo
          shouldPlay={true}
          isLooping={true}
          onReadyForDisplay={() => console.log("ready")}
          onLoadStart={() => console.log("start")}
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
        {({ handleChange, values, errors, touched }) => (
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
            <PostButton
              loading={isSubmitting}
              title={<Text variant="uploadpost_post_button">Post</Text>}
              onPress={() => handleSubmit(values, errors)}
            />
          </Form>
        )}
      </Formik>

      <StatusBar style="auto" />
    </UploadPostBackground>
  );
};
