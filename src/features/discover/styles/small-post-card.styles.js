import styled from "styled-components/native";
import { Image } from "react-native-elements";

export const PostCardBackground = styled.View`
  width: 100%;
  align-self: center;
`;

export const BottomCardContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const PostImage = styled(Image)`
  width: 100%;
  height: 200px;
`;
