import React, { useState, createRef } from "react";
import { ScrollView, Pressable, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { Overlay } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { createPost } from "../../../services/redux/actions/post.actions";

import { Text } from "../../../components/typography/text.components";

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
  PreviewVideo,
  UploadingBackground,
  LoadingIndicator,
} from "../styles/upload-post.styles";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out the title"),
  description: Yup.string().label("Description"),
});

export const UploadPostScreen = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [requestRunning, setRequestRunning] = useState(false);

  const titleRef = createRef();
  const descriptionRef = createRef();

  const dispatch = useDispatch();

  const { source, sourceThumb } = route.params;

  const insets = useSafeAreaInsets();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSubmit = (values, errors) => {
    setIsSubmitting(true);
    if (errors.title === undefined && values.title === "") {
      Toast.show({
        type: "error",
        text2: "Please fill out everything.",
        topOffset: 45,
      });
      setIsSubmitting(false);
    } else if (values.title === "" || errors.title !== undefined) {
      Toast.show({
        type: "error",
        text1: "Title",
        text2: errors.title,
        topOffset: 45,
      });
      setIsSubmitting(false);
    } else if (!errors.title && !errors.description) {
      submit(values);
    }
  };

  const submit = async (values) => {
    setIsSubmitting(false);
    setRequestRunning(true);

    dispatch(createPost(values.title, values.description, source, sourceThumb))
      .then(() =>
        navigation.dispatch(
          CommonActions.reset({ index: 1, routes: [{ name: "Home" }] })
        )
      )
      .catch(() => setRequestRunning(false));
  };

  if (requestRunning) {
    return (
      <UploadingBackground>
        <LoadingIndicator />
      </UploadingBackground>
    );
  }

  return (
    <UploadPostBackground style={{ paddingBottom: insets.bottom }}>
      <NavBar
        nav={navigation}
        centerComponent={<Text variant="navbar_title">Post</Text>}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <FullPreviewVideo
          shouldPlay={true}
          source={{
            uri: source,
          }}
        />
      </Overlay>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VideoContainer>
          <Pressable onPress={() => setVisible(true)}>
            <PreviewVideo source={{ uri: source }} />
          </Pressable>
        </VideoContainer>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <InputsContainer>
                <TitleInput
                  ref={titleRef}
                  value={values.title}
                  placeholder="Title"
                  onChangeText={handleChange("title")}
                  returnKeyType="done"
                  onSubmitEditing={() =>
                    descriptionRef.current && descriptionRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
                <DescriptionInput
                  ref={descriptionRef}
                  value={values.description}
                  placeholder="Description (optional)"
                  onChangeText={handleChange("description")}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </InputsContainer>
              <PostButton
                loading={isSubmitting}
                title={<Text variant="uploadpost_post_button">Post</Text>}
                onPress={() => handleSubmit(values, errors)}
              />
            </Form>
          )}
        </Formik>
      </ScrollView>
    </UploadPostBackground>
  );
};
