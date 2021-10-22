import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { getThumbnailAsync } from "expo-video-thumbnails";
import { IconButton, Button } from "react-native-paper";
import { openURL } from "expo-linking";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import LottieView from "lottie-react-native";

import { useIsFocused } from "@react-navigation/core";

const PostCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const CameraTopButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
`;

const CameraButtons = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.space[2]};
  align-items: flex-end;
`;

const CameraBottomButtonsSection = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const PreviewTopButtonsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AnimationWrapper = styled.View`
  flex-direction: row;
  height: 10px;
  width: 90%;
  background-color: rgba(96, 96, 96, 0.5);
  border-radius: 5px;
  align-self: center;
`;

const CameraBottomButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const AllowCameraAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const CameraScreen = ({ navigation }) => {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [cameraIsRecording, setCameraIsRecording] = useState(false);
  const cameraRef = useRef();
  const animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");
    })();
  }, []);

  useInterval(
    () => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        setCameraIsRecording(false);
        setProgress(0);
        cameraRef.current.stopRecording();
      }
    },
    cameraIsRecording ? 100 : null
  );

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  if (hasCameraPermissions === false) {
    return (
      <SafeArea>
        <IconButton
          size={30}
          icon="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowCameraAccessSection>
          <Text
            variant="title"
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            Please Allow Access to Your Camera
          </Text>
          <Text
            variant="body"
            style={{ textAlign: "center", paddingBottom: 30 }}
          >
            Grant camera access to shoot a video
          </Text>
          <Button
            mode="text"
            uppercase={false}
            color={colors.brand.primary}
            onPress={() => openURL("app-settings:")}
          >
            Enable Camera Access
          </Button>
        </AllowCameraAccessSection>
      </SafeArea>
    );
  }

  const changeCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const changeCameraFlash = () => {
    setCameraFlash(
      cameraFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 10,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.current.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate("Preview", { source, sourceThumb });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
        <PostCamera
          type={cameraType}
          ratio={"16:9"}
          flashMode={cameraFlash}
          ref={(camera) => (cameraRef.current = camera)}
        >
          <SafeArea style={{ backgroundColor: "transparent" }}>
            {!cameraIsRecording ? (
              <>
                <CameraTopButtonsSection>
                  <IconButton
                    size={35}
                    icon="close"
                    color="white"
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                  <CameraButtons>
                    <IconButton
                      size={35}
                      icon={
                        cameraType === Camera.Constants.Type.back
                          ? "camera-front"
                          : "camera-rear"
                      }
                      color="white"
                      onPress={changeCameraType}
                    />
                    {cameraFlash === Camera.Constants.FlashMode.off && (
                      <IconButton
                        size={35}
                        icon={"flash-off"}
                        color="white"
                        onPress={changeCameraFlash}
                      />
                    )}
                    {cameraFlash === Camera.Constants.FlashMode.torch && (
                      <IconButton
                        size={35}
                        icon={"flash"}
                        color="white"
                        onPress={changeCameraFlash}
                      />
                    )}
                  </CameraButtons>
                </CameraTopButtonsSection>
                <CameraBottomButtonsSection>
                  <CameraBottomButtonsContainer>
                    <IconButton
                      size={35}
                      icon={"filmstrip-box-multiple"}
                      color="white"
                      onPress={() => navigation.goBack()}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setCameraIsRecording(true);
                        recordVideo();
                      }}
                    >
                      <LottieView
                        key="animation"
                        resizeMode="cover"
                        style={{ width: "35%" }}
                        source={require("../../../assets/lottie/live-icon.json")}
                      />
                    </TouchableWithoutFeedback>
                    <View style={{ padding: 35 }} />
                  </CameraBottomButtonsContainer>
                </CameraBottomButtonsSection>
              </>
            ) : (
              <>
                <AnimationWrapper>
                  <Animated.View
                    style={
                      ([StyleSheet.absoluteFill],
                      {
                        backgroundColor: colors.brand.primary,
                        width,
                        borderRadius: 10,
                      })
                    }
                  />
                </AnimationWrapper>
                <CameraBottomButtonsSection>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCameraIsRecording(false);
                      setProgress(0);
                      cameraRef.current.stopRecording();
                    }}
                  >
                    <LottieView
                      key="animation"
                      autoPlay
                      loop
                      resizeMode="cover"
                      style={{ width: "35%" }}
                      source={require("../../../assets/lottie/live-icon.json")}
                    />
                  </TouchableWithoutFeedback>
                </CameraBottomButtonsSection>
              </>
            )}
          </SafeArea>
        </PostCamera>
    </>
  );
};
