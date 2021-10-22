import React, { useState, useEffect } from "react";
import { View, Dimensions, Pressable } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { requestPermissionsAsync, getAssetsAsync } from "expo-media-library";
import { Video } from "expo-av";
import { getThumbnailAsync } from "expo-video-thumbnails";
import BigList from "react-native-big-list";
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
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [selectedGalleryVideo, setSelectedGalleryVideo] = useState(null);
  const [galleryVideos, setGalleryVideos] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await requestPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await getAssetsAsync({
          first: 100,
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });

        // to filter the gallery videos for less than 10 seconds only, removing
        // gallery items if more than 10 seconds
        userGalleryMedia.assets = userGalleryMedia.assets
          .filter((item) => item.duration <= 10)
          .map((item) => {
            return item;
          });

        if (userGalleryMedia.totalCount !== 0) {
          setGalleryVideos(userGalleryMedia.assets);
          setSelectedGalleryVideo(userGalleryMedia.assets[0].uri);
        }
      }
    })();
  }, []);

  if (hasGalleryPermissions === false) {
    return (
      <SafeArea>
        <IconButton
          size={30}
          icon="close"
          underlayColor="transparent"
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
            color={colors.bg.primary}
            labelStyle={{ color: colors.text.brand }}
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

  const handleToSelectVideo = (uri) => {
    if (shouldPlay) {
      setShouldPlay(false);
    }
    setSelectedGalleryVideo(uri);
  };

  const handleSubmit = async () => {
    let sourceThumb = await generateThumbnail(selectedGalleryVideo);
    navigation.navigate("Preview", { source: selectedGalleryVideo, sourceThumb });
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

  const renderItem = ({ item }) => (
    <>
      <Pressable key={item} onPress={() => handleToSelectVideo(item.uri)}>
        <Video
          source={{ uri: item.uri }}
          resizeMode="cover"
          style={{ width: width / 3, height: width / 3 }}
        />
      </Pressable>
    </>
  );

  return (
    <SafeArea>
      <TopTitleSection>
        <IconButton
          size={30}
          icon="close"
          underlayColor="transparent"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text variant="screen_title">New Post</Text>
        <IconButton
          size={30}
          icon="checkbox-marked"
          color={colors.brand.primary}
          underlayColor="transparent"
          onPress={handleSubmit}
        />
      </TopTitleSection>
      <View>
        <Pressable onPress={handlePlayAndPause}>
          <Video
            source={{ uri: selectedGalleryVideo }}
            isMuted={true}
            shouldPlay={shouldPlay}
            resizeMode="cover"
            isLooping
            style={{ width: width, height: width }}
          />
          <PlayIconButton
            name={shouldPlay ? null : "play"}
            size={85}
            color={colors.icon.primary}
          />
        </Pressable>
        <CameraIconButton
          size={30}
          icon="camera"
          color={colors.icon.primary}
          underlayColor="black"
          onPress={() => {
            navigation.navigate("Camera");
          }}
        />
      </View>
      <BigList
        data={galleryVideos}
        renderItem={renderItem}
        itemHeight={130}
        keyExtractor={(item) => item.uri}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeArea>
  );
};
