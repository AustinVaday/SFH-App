import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

export default class UploadScreen extends Component {
  state = {
    title: "",
    caption: "",
    isSubmitting: false,
  };

  render() {
    const {
      navigation: {
        state: {
          params: { url },
        },
      },
    } = this.props;

    const { title, caption } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <ScrollView>
          <View style={styles.formRow}>
            <View style={styles.videoContainer}>
              <Video
                resizeMode="contain"
                source={{ uri: url }}
                style={styles.video}
              />
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
          <TouchableOpacity onPressOut={this._submit}>
            <View style={styles.uploadBtn}>
              {this._isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.uploadText}>Upload photo</Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  videoContainer: {
    height: 200,
    flex: 1,
  },
  video: {
    flex: 1,
  },
  formRow: {
    flexDirection: "row",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
  form: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
  uploadBtn: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 80,
    width: width / 2,
    height: 50,
    backgroundColor: "#3E99EE",
    borderRadius: 25,
    overflow: "hidden",
  },
  uploadText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
