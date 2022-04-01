import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

import { Card } from "../components/card.components";

import { ViewWordBackground } from "./styles/view-word.styles";

export const ViewWordScreen = ({ route, navigation }) => {
  const videoRef = useRef([]);
  const isFocused = useIsFocused();

  const { word } = route.params;

  useEffect(() => {
    if (!isFocused) {
      let cell = videoRef.current[word.id];

      cell.stop();
    } else {
      let cell = videoRef.current[word.id];

      if (cell) {
        cell.play();
      }
    }
  }, [isFocused]);

  return (
    <ViewWordBackground>
      <Card
        isViewWord={true}
        word={word}
        ref={(wordRef) => (videoRef.current[word.id] = wordRef)}
        navigation={navigation}
      />
      <StatusBar style="light" />
    </ViewWordBackground>
  );
};
