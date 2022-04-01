import React, { useState, useEffect, useLayoutEffect } from "react";
import { Platform } from "react-native";
import {
  requestPermissionsAsync,
  getAssetsAsync,
  getAssetInfoAsync,
} from "expo-media-library";
import { getThumbnailAsync } from "expo-video-thumbnails";
import BigList from "react-native-big-list";
import { openURL } from "expo-linking";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SafeArea } from "../../../components/utilities/safe-area.components";
import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";

import {
  CloseIcon,
  EnablePermissionsButton,
  NextButton,
  VideoImage,
  ImagePressable,
  LibraryBackground,
  DurationTextContainer,
  CheckCircle,
  CheckCircleContainer,
  AllowPhotosAccessSection,
  ListEmptyBackground,
  BackIcon,
  ModalVideo,
  ModalScreen,
  BackIconContainer,
} from "./styles/library.styles";

export const LibraryScreen = ({ navigation }) => {
  const [selectedVideo, setSelectedVideo] = useState({ uri: "", id: "" });
  const [galleryVideos, setGalleryVideos] = useState({
    videos: [],
    permissionStatus: false,
  });
  const [videoModal, setVideoModal] = useState({ visible: false, uri: "" });

  const insets = useSafeAreaInsets();

  const toggleOverlay = () => {
    setVideoModal({ visible: !videoModal.visible });
  };

  useLayoutEffect(() => {
    if (!galleryVideos.permissionStatus) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <NextButton
            title="Next"
            onPress={handleSubmit}
            selected={selectedVideo.uri !== ""}
          />
        ),
      });
    }
  }, [navigation, selectedVideo, galleryVideos.permissionStatus]);

  useEffect(() => {
    (async () => {
      const galleryStatus = await requestPermissionsAsync();

      if (galleryStatus.status === "granted") {
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

        setGalleryVideos({
          videos: userGalleryMedia.assets,
          permissionStatus: true,
        });
      }
    })();
  }, []);

  const handleSubmit = async () => {
    let assetUri = await getAssetInfoAsync(selectedVideo.id);
    let sourceThumb = await generateThumbnail(
      Platform.OS === "android" ? assetUri.uri : assetUri.localUri
    );

    navigation.navigate("UploadWord", {
      source: Platform.OS === "android" ? assetUri.uri : assetUri.localUri,
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

  const onPressSelectVideoHandler = (uri, id) => {
    if (selectedVideo.uri === uri) {
      setSelectedVideo({ uri: "", id: "" });
    } else {
      setSelectedVideo({ uri: uri, id: id });
    }
  };

  const onPressDisplayVideo = async (id) => {
    let userGalleryMedia = await getAssetInfoAsync(id);

    setVideoModal({
      visible: true,
      uri:
        Platform.OS === "android"
          ? userGalleryMedia.uri
          : userGalleryMedia.localUri,
    });
  };

  const renderItem = ({ item, index }) => (
    <ImagePressable
      key={item}
      onPress={() => onPressDisplayVideo(item.id)}
      index={index}
    >
      <VideoImage
        isSelected={selectedVideo.uri === item.uri}
        source={{ uri: item.uri }}
      />
      <DurationTextContainer>
        <Text variant="video_duration">
          {moment
            .utc(moment.duration(item.duration, "seconds").asMilliseconds())
            .format("m:ss")}
        </Text>
      </DurationTextContainer>
      <CheckCircleContainer>
        <CheckCircle
          onPress={() => onPressSelectVideoHandler(item.uri, item.id)}
          isSelected={selectedVideo.uri === item.uri}
        />
      </CheckCircleContainer>
    </ImagePressable>
  );

  if (galleryVideos.permissionStatus === false) {
    return (
      <SafeArea style={{ padding: 16 }}>
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

          <Spacer size="gigantic" />

          <EnablePermissionsButton
            title="Enable Photos Access"
            onPress={() => openURL("app-settings:")}
          />
        </AllowPhotosAccessSection>

        <StatusBar style="auto" />
      </SafeArea>
    );
  }

  return (
    <LibraryBackground>
      {galleryVideos.videos.length === 0 ? (
        <ListEmptyBackground>
          <Text variant="list_empty_title">
            You have no videos under 10 seconds.
          </Text>
          <Spacer size="large" />
          <Text variant="list_empty_message">
            Record under 10 seconds and your videos will appear here.
          </Text>
        </ListEmptyBackground>
      ) : (
        <BigList
          data={galleryVideos.videos}
          renderItem={renderItem}
          itemHeight={130}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ModalScreen
        isVisible={videoModal.visible}
        swipeDirection={["up", "down", "left", "right"]}
        onSwipeComplete={toggleOverlay}
        swipeThreshold={200}
      >
        <ModalVideo
          resizeMode="stretch"
          isLooping={true}
          shouldPlay={true}
          source={{ uri: videoModal.uri }}
        />
        <BackIconContainer style={{ top: insets.top + 10 }}>
          <BackIcon onPress={toggleOverlay} />
        </BackIconContainer>
        <StatusBar style="light" />
      </ModalScreen>

      <StatusBar style="auto" />
    </LibraryBackground>
  );
};
