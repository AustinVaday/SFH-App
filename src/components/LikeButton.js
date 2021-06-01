import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export default class LikeButton extends React.Component {
  state = {
    liked: false,
  };

  likeImage = async () => {
    const likeState = await !this.state.liked;
    this.setState({ liked: likeState });
  };

  render() {
    const { liked } = this.state;
    const likeValue = liked ? this.props.users + 1 : this.props.users;
    const iconValue = liked
      ? require("../assets/deaf-clap-icon-blue.png")
      : require("../assets/deaf-clap-icon-grey.png");
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.likeImage}>
          <Image source={iconValue} style={styles.iconImage} />
        </TouchableOpacity>
        <Text style={styles.likeNumberStyle}>{likeValue}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 10,
    position: "absolute",
  },
  likeNumberStyle: {
    fontSize: 22,
    marginLeft: 8,
  },
  iconImage: {
    width: 37,
    height: 30,
  },
});
