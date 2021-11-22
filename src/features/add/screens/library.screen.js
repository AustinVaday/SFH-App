import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {
  requestPermissionsAsync,
  getAssetsAsync,
  getAssetInfoAsync,
} from "expo-media-library";
import { getThumbnailAsync } from "expo-video-thumbnails";
import BigList from "react-native-big-list";
import { openURL } from "expo-linking";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import {
  CloseIcon,
  EnablePermissionsButton,
  SmallVideo,
  NavBar,
  PreviewVideoContainer,
  LibraryBackground,
  PreviewVideo,
  PlayIcon,
  CameraIcon,
  AllowPhotosAccessSection,
} from "../styles/library.styles";

export const LibraryScreen = ({ navigation }) => {
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [selectedGalleryVideo, setSelectedGalleryVideo] = useState(null);
  const [galleryVideos, setGalleryVideos] = useState(null);
  const [getLocalUri, setGetLocalUri] = useState("");

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

  const handlePlayAndPause = () => {
    if (shouldPlay) {
      setShouldPlay(false);
    } else {
      setShouldPlay(true);
    }
  };

  const handleToSelectVideo = async (uri, id) => {
    if (shouldPlay) {
      setShouldPlay(false);
    }
    setGetLocalUri(id);
    setSelectedGalleryVideo(uri);
  };

  const handleSubmit = async () => {
    const assetLocalUri = await getAssetInfoAsync(getLocalUri);
    let sourceThumb = await generateThumbnail(assetLocalUri.localUri);
    navigation.navigate("Preview", {
      source: assetLocalUri.localUri,
      sourceThumb,
    });
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
    <Pressable
      key={item}
      onPress={() => handleToSelectVideo(item.uri, item.id)}
    >
      <SmallVideo source={{ uri: item.uri }} />
    </Pressable>
  );

  if (hasGalleryPermissions === false) {
    return (
      <SafeArea>
        <CloseIcon
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AllowPhotosAccessSection>
          <Text variant="permissions_title">
            Please Allow Access to Your Photos
          </Text>
          <Text variant="permissions_message">
            Grant photos access to select your video
          </Text>
          <EnablePermissionsButton
            title="Enable Photos Access"
            onPress={() => openURL("app-settings:")}
          />
        </AllowPhotosAccessSection>
      </SafeArea>
    );
  }

  return (
    <LibraryBackground>
      <NavBar
        nav={navigation}
        rightComponent={{
          size: 30,
          icon: "checkbox-marked",
          type: "material-community",
          color: colors.icon.primary,
          onPress: handleSubmit,
        }}
        centerComponent={<Text variant="navbar_title">New Post</Text>}
      />
      <PreviewVideoContainer>
        <Pressable onPress={handlePlayAndPause}>
          <PreviewVideo
            source={{ uri: selectedGalleryVideo }}
            isMuted={true}
            shouldPlay={shouldPlay}
            isLooping
          />
          <PlayIcon shouldPlay={shouldPlay} />
        </Pressable>
        <CameraIcon
          onPress={() => {
            navigation.navigate("Camera");
          }}
        />
      </PreviewVideoContainer>
      <BigList
        data={galleryVideos}
        renderItem={renderItem}
        itemHeight={130}
        keyExtractor={(item) => item.uri}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </LibraryBackground>
  );
};
