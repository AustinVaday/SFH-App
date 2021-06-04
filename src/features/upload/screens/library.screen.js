import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import { colors } from "../../../infrastructure/theme/colors";

const { width } = Dimensions.get("window");

export const LibraryScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [pickedVideo, setPickedVideo] = useState(null);
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
        mediaType: 'video',
      });
      setVideos(edges.assets);
      setPickedVideo(edges.assets[0].uri);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to library</Text>;
  }

  // state = {
  //   hasLibraryPermissions: null,
  //   videos: null,
  //   pickedVideo: null,
  //   shouldPlay: false,
  // };

  // componentDidMount  = async () => {
  //   await this.getPermissionsAsync();
  //   const edges = await MediaLibrary.getAssetsAsync({
  //     first: 10,
  //     mediaType: [MediaLibrary.MediaType.video],
  //   });
  //   this.setState({
  //     videos: edges.assets,
  //     pickedVideo: edges.assets[0].uri,
  //   });
  // }

  // getPermissionsAsync = async () => {
  //   const { status: cameraRoll } = await MediaLibrary.requestPermissionsAsync();
  //   this.setState({
  //     hasLibraryPermissions: cameraRoll === "granted",
  //   });
  // };

  const handlePlayAndPause = () => {
    if (shouldPlay) {
      setShouldPlay(false);
    }
    else {
      setShouldPlay(true);
    }
  };

  // const _pickVideo = (video) => {
  //   setPickedVideo(video);
  // };

  const _renderItem = ({ item }) => (
    <>
      {pickedVideo == item.uri ? (
        <Video
          source={{ uri: pickedVideo }}
          resizeMode="cover"
          style={styles.smallSelectedVideo}
        />
      ) : (
        <TouchableOpacity key={item} onPress={() => setPickedVideo(item.uri)}>
          <Video
            source={{ uri: item.uri }}
            resizeMode="cover"
            style={styles.smallVideo}
          />
        </TouchableOpacity>
      )}
    </>
  );
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "black" }} />
      <StatusBar translucent backgroundColor="white" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.libraryActions}>
          <TouchableOpacity onPressOut={() => navigation.navigate("Home")}>
            <MaterialIcons name={"close"} size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.libraryTitle}>Library</Text>
          <TouchableOpacity
            onPressOut={() =>
              navigation.navigate("Upload", { url: pickedVideo })
            }
          >
            <MaterialIcons
              name={"check-box"}
              size={40}
              color={colors.brand.primary}
            />
          </TouchableOpacity>
        </View>
        {videos && (
          <>
            <TouchableOpacity activeOpacity={1} onPressOut={handlePlayAndPause}>
              <Video
                source={{ uri: pickedVideo }}
                isMuted={true}
                shouldPlay={shouldPlay}
                resizeMode="cover"
                isLooping
                style={{ width: width, height: width }}
              />
              <View style={styles.controlVideo}>
                <MaterialIcons
                  name={shouldPlay ? null : "play-arrow"}
                  size={85}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <View style={styles.action}>
                <MaterialIcons name="videocam" color="white" size={30} />
              </View>
            </TouchableOpacity>
          </>
        )}
        {videos && (
          <View style={styles.videos}>
            <FlatList
              data={videos}
              renderItem={_renderItem}
              keyExtractor={(item) => item.uri}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  videos: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  smallVideo: {
    width: width / 3,
    height: width / 3,
  },
  smallSelectedVideo: {
    width: width / 3,
    height: width / 3,
    borderWidth: 5,
    borderColor: colors.brand.primary,
  },
  action: {
    backgroundColor: "black",
    borderRadius: 30,
    color: "white",
    padding: 10,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  controlVideo: {
    position: "absolute",
    bottom: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  libraryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  libraryTitle: {
    color: "white",
    fontSize: 25,
  },
});
