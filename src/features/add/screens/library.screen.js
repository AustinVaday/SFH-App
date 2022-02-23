import React, { useState, useEffect } from "react";
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

import {
  CloseIcon,
  EnablePermissionsButton,
  NextButton,
  VideoImage,
  NavBar,
  ImagePressable,
  LibraryBackground,
  DurationTextContainer,
  CheckCircle,
  CheckCircleContainer,
  AllowPhotosAccessSection,
  ListEmptyBackground,
  ListEmptyContainer,
  VideosEmptyImage,
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
    let assetLocalUri = await getAssetInfoAsync(selectedVideo.id);
    let sourceThumb = await generateThumbnail(assetLocalUri.localUri);
    navigation.navigate("UploadPost", {
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

  const onPressSelectVideoHandler = (uri, id) => {
    if (selectedVideo.uri === uri) {
      setSelectedVideo({ uri: "", id: "" });
    } else {
      setSelectedVideo({ uri: uri, id: id });
    }
  };

  const renderItem = ({ item, index }) => (
    <ImagePressable
      key={item}
      onPress={() => {
        setVideoModal({ visible: true, uri: item.uri });
      }}
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
        rightComponent={
          <NextButton
            title="Next"
            onPress={handleSubmit}
            selected={selectedVideo.uri !== ""}
          />
        }
        centerComponent={<Text variant="navbar_title">Videos</Text>}
      />

      {galleryVideos.videos.length === 0 ? (
        <ListEmptyBackground>
          <ListEmptyContainer>
            <VideosEmptyImage
              source={require("../../../assets/images/no-images.png")}
            />
            <Text variant="list_empty_title">No Videos Available </Text>
          </ListEmptyContainer>
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
          resizeMode="cover"
          isLooping={true}
          shouldPlay={true}
          onReadyForDisplay={() => console.log("ready")}
          onLoadStart={() => console.log("start")}
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
