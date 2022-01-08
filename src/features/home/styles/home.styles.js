import styled from "styled-components/native";
import { Image } from "react-native-elements";

export const HomeBackground = styled.View`
flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ListEmptyContainer = styled.View`
  padding-bottom: 150px;
`;

export const PostsEmptyImage = styled(Image)`
  width: 300px;
  height: 250px;
`;
