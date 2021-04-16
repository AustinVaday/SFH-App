import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

export default class UploadScreen extends Component {
  state = {
    title: "",
    caption: "",
    isSubmitting: false,
    modal: false,
  };

  _onTitleChange = (text) => {
    this.setState({
      title: text,
    });
  };

  _onCaptionChange = (text) => {
    this.setState({
      caption: text,
    });
  };

  _submit = async () => {
    const { title, caption } = this.state;
    const { navigation } = this.props;

    if (title && caption) {
      this.setState({
        isSubmitting: true,
      });
      const uploadResult = null;
      if (!uploadResult) {
        navigation.goBack(null);
        navigation.goBack(null);
        navigation.goBack(null);
      }
    } else {
      Alert.alert("All fields are required");
    }
  };

  render() {
    const {
      navigation: {
        state: {
          params: { url },
        },
      },
    } = this.props;

    const { title, caption, modal } = this.state;

    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={modal}
          transparent={true}
          presentationStyle="overFullScreen"
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.93)" }}
            onPress={() => {
              this.setState({ modal: false });
            }}
          >
            <View />
          </TouchableOpacity>
          <SafeAreaView
            style={{
              marginVertical: "50%",
              position: "absolute",
              justifyContent: "center",
            }}
          >
            <VideoPlayer
              videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: url,
                },
              }}
              inFullscreen={true}
              width={width}
              height={height / 2}
            />
          </SafeAreaView>
        </Modal>

        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <ScrollView>
          <View style={styles.formRow}>
            <View style={styles.videoContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({ modal: true });
                }}
              >
                <Video
                  resizeMode="contain"
                  source={{ uri: url }}
                  style={styles.video}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={title}
              placeholder={"Title"}
              style={styles.input}
              multiline={true}
              placeholderTextColor={"#888"}
              onChangeText={this._onTitleChange}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={caption}
              placeholder={"Caption"}
              style={styles.input}
              multiline={true}
              placeholderTextColor={"#888"}
              onChangeText={this._onCaptionChange}
            />
          </View>
          <Button
            style={styles.uploadBtn}
            contentStyle={{ height: 50, width: width / 2 }}
            mode="contained"
            onPress={this._submit}
          >
            {this.state.isSubmitting ? (
              <ActivityIndicator color={Colors.primaryColor} />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  videoContainer: {
    flex: 1,
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: width / 2,
    height: width / 6,
  },
  formRow: {
    flexDirection: "row",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
  input: {
    flex: 1,
  },
  uploadBtn: {
    alignSelf: "center",
    justifyContent: "center",
    top: 80,
    backgroundColor: Colors.primaryColor,
    borderRadius: 25,
  },
});
