import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.components";
import { SafeArea } from "../../../components/utilities/safe-area.components";

const PostCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const CameraTopButtonsSection = styled.View`
  padding-top: ${(props) => props.theme.space[5]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
`;

const CameraButtons = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const CameraBottomButtonsSection = styled.View`
  padding-bottom: ${(props) => props.theme.space[5]};
  padding-right: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  margin-top: auto;
  justify-content: space-evenly;
`;

const PreviewTitle = styled(Text)`
  color: white;
  font-size: 25px;
`;

const PreviewTopButtonsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [videoTaken, setVideoTaken] = useState(false);
  const [cameraIsRecording, setCameraIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const changeType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const changeFlash = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.auto);
    } else if (flash === Camera.Constants.FlashMode.auto) {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

  const takeVideo = async () => {
    if (cameraRef) {
      const takenVideo = await cameraRef.current.recordAsync();
      setVideo(takenVideo.uri);
      setVideoTaken(true);
    }
  };

  const rejectVideo = () => {
    setVideo(null);
    setVideoTaken(false);
  };

  const approveVideo = async () => {
    navigation.navigate("Post", { url: video });
    setVideo(null);
    setVideoTaken(false);
  };

  return (
    <>
      {videoTaken ? (
        <SafeArea style={{ backgroundColor: "black" }}>
          <PreviewTopButtonsSection>
            <IconButton
              size={40}
              icon="close"
              color="white"
              onPress={rejectVideo}
            />
            <PreviewTitle>Preview</PreviewTitle>
            <IconButton
              size={40}
              icon="checkbox-marked"
              color={colors.brand.primary}
              onPress={approveVideo}
            />
          </PreviewTopButtonsSection>
          <Video
            source={{ uri: video }}
            resizeMode="cover"
            isLooping
            useNativeControls
            style={{ flex: 1 }}
          />
        </SafeArea>
      ) : (
        <PostCamera
          type={type}
          flashMode={flash}
          ref={(camera) => (cameraRef.current = camera)}
        >
          {!cameraIsRecording ? (
            <>
              <CameraTopButtonsSection>
                <IconButton
                  size={40}
                  icon="close"
                  color="white"
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
                <CameraButtons>
                  <IconButton
                    size={40}
                    icon={
                      type === Camera.Constants.Type.back
                        ? "camera-front"
                        : "camera-rear"
                    }
                    color="white"
                    onPress={changeType}
                  />
                  {flash === Camera.Constants.FlashMode.off && (
                    <IconButton
                      size={40}
                      icon={"flash-off"}
                      color="white"
                      onPress={changeFlash}
                    />
                  )}
                  {flash === Camera.Constants.FlashMode.on && (
                    <IconButton
                      size={40}
                      icon={"flash"}
                      color="white"
                      onPress={changeFlash}
                    />
                  )}
                  {flash === Camera.Constants.FlashMode.auto && (
                    <IconButton
                      size={40}
                      icon={"flash-auto"}
                      color="white"
                      onPress={changeFlash}
                    />
                  )}
                </CameraButtons>
              </CameraTopButtonsSection>
              <CameraBottomButtonsSection>
                <IconButton
                  size={45}
                  icon={"filmstrip-box-multiple"}
                  color="white"
                  onPress={() => navigation.navigate("Library")}
                />
                <IconButton
                  size={70}
                  icon={"record"}
                  color="red"
                  style={{ borderWidth: 10, borderColor: "white" }}
                  onPress={() => {
                    setCameraIsRecording(true);
                    takeVideo();
                  }}
                />
                <View style={{ padding: 40 }} />
              </CameraBottomButtonsSection>
            </>
          ) : (
            <CameraBottomButtonsSection>
              <IconButton
                size={70}
                icon={"stop"}
                color="red"
                style={{ borderWidth: 10, borderColor: "white" }}
                onPress={() => {
                  setCameraIsRecording(false);
                  cameraRef.current.stopRecording();
                }}
              />
            </CameraBottomButtonsSection>
          )}
        </PostCamera>
      )}
    </>
  );
};
