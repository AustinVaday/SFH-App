import styled from "styled-components/native";
import { Video } from "expo-av";
import { Icon } from "react-native-elements";

export const VideoDisplay = styled(Video).attrs({
  resizeMode: "cover",
})`
  flex: 1;
`;

export const PlayIcon = styled(Icon).attrs((props) => ({
  type: "font-awesome-5",
  name: "play",
  size: 50,
  color: props.theme.colors.icon.foggedglass,
  containerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
}))``;
