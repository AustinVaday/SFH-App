import styled from "styled-components/native";
import { Icon, ListItem } from "react-native-elements";

export const NewConversationBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const FollowingListSection = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const UserRow = styled(ListItem).attrs({
  containerStyle: { paddingTop: 4, paddingBottom: 4 },
})``;

export const FollowingIcon = styled(Icon).attrs((props) => ({
  name: "account-group",
  type: "material-community",
  size: 100,
  color: props.theme.colors.icon.lightgray,
}))``;
