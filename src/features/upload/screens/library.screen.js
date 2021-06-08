import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import styled from "styled-components/native";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const { width } = Dimensions.get("window");

const LibrarySafeArea = styled(SafeArea)`
  background-color: black;
`;

const TopTitleSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NewPostText = styled(Text)`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const CameraIconButton = styled(IconButton)`
  background-color: black;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PlayIconButton = styled(Icon)`
  position: absolute;
  bottom: 40%;
  align-self: center;
`;

export const LibraryScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraRoll } =
        await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraRoll === "granted");
    })();
    (async () => {
      const edges = await MediaLibrary.getAssetsAsync({
        first: 10,
        mediaType: "video",
      });
      setVideos(edges.assets);
      setSelectedVideo(edges.assets[0].uri);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to library</Text>;
  }

  const handlePlayAndPause = () => {
    if (shouldPlay) {
      setShouldPlay(false);
    } else {
      setShouldPlay(true);
    }
  };

  const renderItem = ({ item }) => (
    <>
      {selectedVideo == item.uri ? (
        <Video
          source={{ uri: selectedVideo }}
          resizeMode="cover"
          style={{
            width: width / 3,
            height: width / 3,
            borderWidth: 5,
            borderColor: colors.brand.primary,
          }}
        />
      ) : (
        <TouchableOpacity key={item} onPress={() => setSelectedVideo(item.uri)}>
          <Video
            source={{ uri: item.uri }}
            resizeMode="cover"
            style={{ width: width / 3, height: width / 3 }}
          />
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <LibrarySafeArea>
      <StatusBar translucent backgroundColor="white" barStyle="light-content" />
      <TopTitleSection>
        <IconButton
          size={35}
          icon="close"
          color="white"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <NewPostText>New Post</NewPostText>
        <IconButton
          size={35}
          icon="checkbox-marked"
          color={colors.brand.primary}
          onPress={() => {
            navigation.navigate("Upload", { url: selectedVideo });
          }}
        />
      </TopTitleSection>
      {videos && (
        <>
          <View>
            <TouchableOpacity activeOpacity={1} onPress={handlePlayAndPause}>
              <Video
                source={{ uri: selectedVideo }}
                isMuted={true}
                shouldPlay={shouldPlay}
                resizeMode="cover"
                isLooping
                style={{ width: width, height: width }}
              />
              <PlayIconButton
                name={shouldPlay ? null : "play"}
                size={85}
                color="white"
              />
            </TouchableOpacity>
            <CameraIconButton
              size={30}
              icon="camera"
              color="white"
              onPress={() => {
                navigation.navigate("Camera");
              }}
            />
          </View>
          <FlatList
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item) => item.uri}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </LibrarySafeArea>
  );
};
