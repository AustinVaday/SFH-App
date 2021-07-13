import React, { useState, useEffect } from "react";
import { View, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { requestPermissionsAsync, getAssetsAsync } from "expo-media-library";
import { Video } from "expo-av";
import { openURL } from "expo-linking";
import styled from "styled-components/native";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

const { width } = Dimensions.get("window");

const TopTitleSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const AllowPhotosAccessSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const LibraryScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraRoll } =
        await requestPermissionsAsync();
      setHasPermission(cameraRoll === "granted");
    })();
    (async () => {
      const edges = await getAssetsAsync({
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
    return (
      <SafeArea>
        <IconButton
          size={30}
          icon="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowPhotosAccessSection>
          <Text
            variant="title"
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            Please Allow Access to Your Photos
          </Text>
          <Text
            variant="body"
            style={{ textAlign: "center", paddingBottom: 30 }}
          >
            Grant photos access to select your video
          </Text>
          <Button
            mode="text"
            uppercase={false}
            color={colors.brand.primary}
            onPress={() => openURL("app-settings:")}
          >
            Enable Photos Access
          </Button>
        </AllowPhotosAccessSection>
      </SafeArea>
    );
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
    <SafeArea>
      <TopTitleSection>
        <IconButton
          size={30}
          icon="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text variant="screen_title">New Post</Text>
        <IconButton
          size={30}
          icon="checkbox-marked"
          color={colors.brand.primary}
          onPress={() => {
            navigation.navigate("Post", { url: selectedVideo });
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
    </SafeArea>
  );
};
