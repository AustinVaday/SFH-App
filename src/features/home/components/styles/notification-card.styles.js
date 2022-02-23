import styled from "styled-components/native";
import { Image, Button } from "react-native-elements";

export const PostImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

export const FollowButton = styled(Button).attrs({
  type: "solid",
})`
  width: 90px;
`;
