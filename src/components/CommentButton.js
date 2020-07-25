import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CommentButton extends React.Component {
  state = {
    commented: false,
  };
  likeImage = async () => {
    const likeState = await !this.state.commented;
    this.setState({ commented: likeState });
  };
  render() {
    const { commented } = this.state;
    const commentValue = commented ? (this.props.users + 1) : this.props.users;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.navigation}>
        <Icon name="comment" size={30} color="#BABBBA" />
        </TouchableOpacity>
        <Text style={styles.likeNumberStyle}>{commentValue}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 120,
  },
  likeNumberStyle: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    marginLeft: 8,
  },
});
