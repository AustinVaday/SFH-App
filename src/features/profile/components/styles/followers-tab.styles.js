import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Button, Image } from "react-native-elements";
import { Tabs } from "react-native-collapsible-tab-view";

export const ListEmptyBackground = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: ${Dimensions.get("window").height / 2}px;
`;

export const FollowersList = styled(Tabs.FlatList)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const FollowButton = styled(Button).attrs({
  type: "solid",
})`
  width: 90px;
`;

export const FollowingButton = styled(Button).attrs({
  type: "outline",
})`
  width: 90px;
`;

export const UserImage = styled(Image)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;
