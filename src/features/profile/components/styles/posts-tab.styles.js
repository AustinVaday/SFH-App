import styled from "styled-components/native";
import { Image } from "react-native-elements";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ListEmptyBackground = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp("25%")}px;
`;

export const PostThumbnail = styled(Image)`
  width: 100%;
  height: 150px;
`;

export const PostContainer = styled.View`
  width: 100%;
  align-self: center;
`;

export const BottomSection = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const PostBackground = styled.View`
  padding: 1px;
  width: 33.3%;
`;
