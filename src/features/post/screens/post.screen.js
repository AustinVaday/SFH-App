import React, { useState, createRef } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import {
  Button,
  Modal,
  Portal,
  Provider,
  TextInput,
  Surface,
} from "react-native-paper";
import { Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";

import { CommonActions, useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { createPost } from "../../../services/redux/actions/post.actions";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";

const { width, height } = Dimensions.get("window");

const VideoPreview = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
`;

const PostText = styled(Text)`
  color: white;
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please fill out the title"),
  description: Yup.string().label("Description"),
});

export const PostScreen = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [requestRunning, setRequestRunning] = useState(false);

  const titleRef = createRef();
  const descriptionRef = createRef();

  const dispatch = useDispatch();

  const { source, sourceThumb } = props.route.params;

  const navigation = useNavigation();

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

    dispatch(
      createPost(
        values.title,
        values.description,
        source,
        sourceThumb
      )
    )
      .then(() =>
        navigation.dispatch(
          CommonActions.reset({ index: 1, routes: [{ name: "Home" }] })
        )
      )
      .catch(() => setRequestRunning(false));
  };

  if (requestRunning) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: 'center',}}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <Provider>
      <SafeArea>
        <Portal>
          <Modal
            dismissable={true}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <VideoPlayer
              videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: source,
                },
              }}
              inFullscreen={true}
              width={width}
              height={height / 2}
            />
          </Modal>
        </Portal>
        <ScrollView>
          <VideoPreview>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setVisible(true)}
            >
              <Surface style={{ elevation: 3 }}>
                <Video
                  resizeMode="stretch"
                  source={{ uri: source }}
                  style={{
                    width: width / 3,
                    height: width / 3,
                  }}
                />
              </Surface>
            </TouchableOpacity>
          </VideoPreview>
          <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={validationSchema}
          >
            {({ handleChange, values, errors, touched }) => (
              <View>
                <TextInput
                  value={values.title}
                  label="Title"
                  theme={{ colors: { primary: colors.brand.primary } }}
                  style={{ marginBottom: 10, backgroundColor: "white" }}
                  multiline={false}
                  onChangeText={handleChange("title")}
                  ref={titleRef}
                  maxLength={20}
                  returnKeyType="done"
                  onSubmitEditing={() =>
                    descriptionRef.current && descriptionRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
                <TextInput
                  value={values.description}
                  label="Description (optional)"
                  theme={{ colors: { primary: colors.brand.primary } }}
                  style={{ backgroundColor: "white" }}
                  multiline={true}
                  maxLength={100}
                  placeholderTextColor={"#888"}
                  onChangeText={handleChange("description")}
                  ref={descriptionRef}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
                {console.log(values.description)}
                <Button
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    top: 80,
                    backgroundColor: colors.brand.primary,
                    borderRadius: 25,
                  }}
                  contentStyle={{ height: 50, width: width / 2 }}
                  mode="contained"
                  onPress={() => handleSubmit(values, errors)}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={colors.brand.secondary} />
                  ) : (
                    <PostText>Post</PostText>
                  )}
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeArea>
    </Provider>
  );
};
