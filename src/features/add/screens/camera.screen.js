import React, { useState, useEffect, useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { getThumbnailAsync } from "expo-video-thumbnails";
import { openURL } from "expo-linking";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import { useIsFocused } from "@react-navigation/core";

import {
  CameraBackground,
  CameraSafeArea,
  TopButtonsSection,
  CameraControlButtonsContainer,
  CloseIcon,
  FrontOrRearIcon,
  FlashOffIcon,
  FlashIcon,
  BottomButtonsSection,
  BottomButtonsContainer,
  LibraryIcon,
  Spacer,
  RecordIcon,
  AnimationWrapper,
  AllowCameraAccessSection,
  EnablePermissionsButton,
} from "../styles//camera.styles";

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

  if (hasCameraPermissions === false) {
    return (
      <SafeArea>
        <CloseIcon
          isPermissions={true}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowCameraAccessSection>
          <Text variant="permissions_title">
            Please Allow Access to Your Camera
          </Text>
          <Text variant="permissions_message">
            Grant camera access to shoot a video
          </Text>
          <EnablePermissionsButton
            title="Enable Camera Access"
            onPress={() => openURL("app-settings:")}
          />
        </AllowCameraAccessSection>
      </SafeArea>
    );
  }

  return (
    <CameraBackground
      type={cameraType}
      ratio={"16:9"}
      flashMode={cameraFlash}
      ref={(camera) => (cameraRef.current = camera)}
    >
      <CameraSafeArea>
        {!cameraIsRecording ? (
          <>
            <TopButtonsSection>
              <CloseIcon
                isPermissions={false}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <CameraControlButtonsContainer>
                <FrontOrRearIcon
                  cameraType={cameraType}
                  onPress={changeCameraType}
                />
                {cameraFlash === Camera.Constants.FlashMode.off && (
                  <FlashOffIcon onPress={changeCameraFlash} />
                )}
                {cameraFlash === Camera.Constants.FlashMode.torch && (
                  <FlashIcon onPress={changeCameraFlash} />
                )}
              </CameraControlButtonsContainer>
            </TopButtonsSection>
            <BottomButtonsSection>
              <BottomButtonsContainer>
                <LibraryIcon onPress={() => navigation.goBack()} />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setCameraIsRecording(true);
                    recordVideo();
                  }}
                >
                  <RecordIcon
                    key="animation"
                    source={require("../../../assets/lottie/live-icon.json")}
                  />
                </TouchableWithoutFeedback>
                <Spacer />
              </BottomButtonsContainer>
            </BottomButtonsSection>
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
            <BottomButtonsSection>
              <TouchableWithoutFeedback
                onPress={() => {
                  setCameraIsRecording(false);
                  setProgress(0);
                  cameraRef.current.stopRecording();
                }}
              >
                <RecordIcon
                  key="animation"
                  autoPlay
                  loop
                  source={require("../../../assets/lottie/live-icon.json")}
                />
              </TouchableWithoutFeedback>
            </BottomButtonsSection>
          </>
        )}
      </CameraSafeArea>
    </CameraBackground>
  );
};
