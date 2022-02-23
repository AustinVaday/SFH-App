import React, { useState, useEffect, useRef } from "react";
import {
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import { getThumbnailAsync } from "expo-video-thumbnails";
import { openURL } from "expo-linking";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

import { useIsFocused } from "@react-navigation/core";

import {
  CameraContainer,
  VideoCamera,
  TopBarContainer,
  NoImages,
  ProgressBarContainer,
  CameraControlButtonsContainer,
  CloseIcon,
  IconContainer,
  FrontOrRearIcon,
  FlashOffIcon,
  FlashIcon,
  BottomBarContainer,
  LibraryIcon,
  Spacer,
  RecordIcon,
  AnimationWrapper,
  AllowCameraAccessSection,
  EnablePermissionsButton,
} from "./styles/camera.styles";

export const CameraScreen = ({ navigation }) => {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [cameraIsRecording, setCameraIsRecording] = useState(false);
  
  const cameraRef = useRef(null);
  const recordAnimation = useRef(null);
  const progressBar = useRef(new Animated.Value(0.01));

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");
    })();
  }, []);

  useEffect(() => {
    if (cameraIsRecording) {
      Animated.timing(progressBar.current, {
        toValue: 100,
        duration: 10000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        setCameraIsRecording(false);
        cameraRef.current.stopRecording();
      });
    }
  }, [cameraIsRecording]);

  const barWidth = progressBar.current.interpolate({
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

  const onPressRecordVideo = async () => {
    if (cameraRef) {
      if (!cameraIsRecording) {
        try {
          const options = {
            maxDuration: 10,
            quality:
              Platform.OS === "ios"
                ? Camera.Constants.VideoQuality["480"]
                : Camera.Constants.VideoQuality["480p"],
          };
          const videoRecordPromise = cameraRef.current?.recordAsync(options);
          setCameraIsRecording(true);
          recordAnimation.current?.play();
          if (videoRecordPromise) {
            const data = await videoRecordPromise;
            const source = data.uri;
            await generateThumbnail(source).then((sourceThumb) => {
              recordAnimation.current?.reset();
              progressBar.current.stopAnimation();
              progressBar.current.setValue(0.01);
              navigation.navigate("Preview", { source, sourceThumb });
            });
          }
        } catch (error) {
          console.warn(error);
        }
      } else {
        setCameraIsRecording(false);
        cameraRef.current.stopRecording();
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

  if (hasCameraPermissions === false || hasAudioPermissions === false) {
    return (
      <SafeArea>
        <CloseIcon
          isPermissions={true}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowCameraAccessSection>
          <NoImages source={require("../../../assets/images/no-images.png")} />
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
    <CameraContainer>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      {isFocused ? (
        <VideoCamera
          type={cameraType}
          style={{ aspectRatio: 9 / 16 }}
          ratio={"16:9"}
          flashMode={cameraFlash}
          ref={(camera) => (cameraRef.current = camera)}
        />
      ) : null}

      <ProgressBarContainer
        style={{
          top: insets.top + 10,
        }}
      >
        <AnimationWrapper>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill],
              {
                backgroundColor: colors.brand.primary,
                width: barWidth,
                borderRadius: 10,
              })
            }
          />
        </AnimationWrapper>
      </ProgressBarContainer>

      {!cameraIsRecording && (
        <TopBarContainer style={{ top: insets.top + 30 }}>
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
        </TopBarContainer>
      )}

      <BottomBarContainer style={{ bottom: insets.bottom + 10 }}>
        <IconContainer>
          {!cameraIsRecording && (
            <LibraryIcon onPress={() => navigation.navigate("Library")} />
          )}
        </IconContainer>
        <IconContainer>
          <Pressable onPress={onPressRecordVideo}>
            <RecordIcon
              ref={recordAnimation}
              source={require("../../../assets/lottie/live-icon.json")}
            />
          </Pressable>
        </IconContainer>
        <Spacer />
      </BottomBarContainer>
    </CameraContainer>
  );
};
