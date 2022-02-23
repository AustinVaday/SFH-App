import styled from "styled-components/native";
import { Image } from "react-native-elements";

export const FeedBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListEmptyContainer = styled.View`
  padding-top: 25%;
`;

export const PostCardContainer = styled.View`
  flex: 1;
`;

export const PostsEmptyImage = styled(Image)`
  width: 300px;
  height: 250px;
`;
