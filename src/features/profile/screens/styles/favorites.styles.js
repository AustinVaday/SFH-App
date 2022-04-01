import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { Image } from "react-native-elements";

export const FavoritesBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ListEmptyBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const Thumbnail = styled(Image)`
  width: 100%;
  height: 150px;
`;

export const Card = styled.View`
  width: 100%;
  align-self: center;
`;

export const BottomBarContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  bottom: 0;
  position: absolute;
`;

export const CardContainer = styled.View`
  padding: 1px;
  width: 33.3%;
`;

export const LoadingIndicatorContainer = styled(ScrollView).attrs({
  scrollEnabled: false,
  contentContainerStyle: { flexGrow: 1 },
})``;
