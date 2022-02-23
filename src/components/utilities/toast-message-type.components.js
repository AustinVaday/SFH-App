import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

import { colors } from "../../infrastructure/theme/colors";
import { fonts } from "../../infrastructure/theme/fonts";

export const NewMessageToast = (props, onPress) => (
  <Pressable onPress={onPress} style={styles.pressableContainer}>
    <Image
      source={{
        uri: props.avatar,
      }}
      style={styles.avatar}
    />

    <View style={styles.messagesContainer}>
      <Text>{props.name}</Text>
      <Text>{props.message}</Text>
    </View>
  </Pressable>
);

export const InfoToast = (props) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoText}>{props.message}</Text>
  </View>
);

export const InfoErrorToast = (props) => (
  <View style={[styles.infoContainer, { backgroundColor: colors.bg.error }]}>
    <Text style={styles.infoText}>{props.message}</Text>
  </View>
);

export const InfoSuccessToast = (props) => (
  <View style={[styles.infoContainer, { backgroundColor: colors.bg.success }]}>
    <Text style={styles.infoText}>{props.message}</Text>
  </View>
);

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    height: 60,
    width: "90%",
    borderRadius: 6,
    backgroundColor: colors.bg.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: 15,
    borderRadius: 25,
  },
  messagesContainer: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    borderRadius: 3,
    backgroundColor: colors.bg.darkgray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.body_600,
    color: colors.text.secondary,
  },
});
