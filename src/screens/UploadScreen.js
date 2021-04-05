import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import FadeIn from "react-native-fade-in-image";

const { width, height } = Dimensions.get("window");

class UploadScreen extends Component {
  state = {
    caption: "",
    location: "",
    tags: "",
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
    const {
        caption,
        location,
        tags,
        isSubmitting,
      } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <ScrollView>
          <View style={styles.formRow}>
            <FadeIn style={styles.photoContainer}>
              <Image source={{ uri: url }} style={styles.photo} />
            </FadeIn>
            <TextInput
              value={caption}
              placeholder={"Caption"}
              style={styles.caption}
              multiline={true}
              placeholderTextColor={"#888"}
              onChangeText={this._onCaptionChange}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={location}
              placeholder={"Location"}
              style={styles.input}
              placeholderTextColor={"#888"}
              onChangeText={this._onLocationChange}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={tags}
              placeholder={"Tags (separated by commas)"}
              style={styles.input}
              placeholderTextColor={"#888"}
              autoCapitalize={"none"}
              onChangeText={this._onTagsChange}
              autoCorrect={false}
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
  _onCaptionChange = (text) => {
    this.setState({
      caption: text,
    });
  };
  _onLocationChange = (text) => {
    this.setState({
      location: text,
    });
  };
  _onTagsChange = (text) => {
    this.setState({
      tags: text,
    });
  };
  _submit = async () => {
    const { caption, location, tags } = this.state;
    const {
      submit,
      navigation,
      navigation: {
        state: {
          params: { url },
        },
      },
    } = this.props;
    if (caption && location && tags) {
      this.setState({
        isSubmitting: true,
      });
      const uploadResult = await submit(url, caption, location, tags);
      if (uploadResult) {
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
  photoContainer: {
    height: 80,
    width: 80,
  },
  photo: {
    flex: 1,
  },
  formRow: {
    flexDirection: "row",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
  caption: {
    marginLeft: 20,
    flex: 1,
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
    marginTop: 20,
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

export default UploadScreen;
