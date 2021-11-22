import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Video } from "expo-av";

export const PostVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  height: ${Dimensions.get("window").height / 1.24}px;
`;
