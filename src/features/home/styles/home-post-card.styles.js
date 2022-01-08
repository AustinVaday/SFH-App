import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Video } from "expo-av";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const PostVideo = styled(Video).attrs({
  resizeMode: "cover",
})`
  flex: 1;
  /* height: ${Dimensions.get("window").height / 1.24}px; */
`;
