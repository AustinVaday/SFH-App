import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    //const colorValue = liked ? "#fb7777" : "#BABBBA";
    const likeValue = liked ? this.props.users + 1 : this.props.users;
    //const iconValue = liked ? "heart" : "heart-o";
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

//<Icon name={iconValue} size={30} color={colorValue} />

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 10,
    position: "absolute",
  },
  likeNumberStyle: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    marginLeft: 8,
  },
  iconImage: {
    width: 35,
    height: 28,
  },
});
