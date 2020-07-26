import React from "react";
import { View, TouchableOpacity, StyleSheet, Share } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ShareButton extends React.Component {
  onShare() {
    try {
      const result = Share.share({
        url: this.props.users,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onShare()}>
          <Icon name="share" size={30} color="#BABBBA" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 150,
    marginTop: 3,
  },
});
