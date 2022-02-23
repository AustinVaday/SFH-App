import styled from "styled-components/native";
import { Video } from "expo-av";

export const PostContainer = styled.View`
  flex: 1;
`;

export const PostVideo = styled(Video).attrs({
  resizeMode: Video.RESIZE_MODE_COVER,
  posterStyle: {
    resizeMode: "cover",
    height: "100%",
  },
})`
  flex: 1;
`;
