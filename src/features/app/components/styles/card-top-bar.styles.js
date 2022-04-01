import styled from "styled-components/native";
import { Platform } from "react-native";
import { colors } from "../../../../infrastructure/theme/colors";
import { Icon, ListItem } from "react-native-elements";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

export const CardTopBarContainer = styled.View`
  padding-right: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1;
  padding-left: ${(props) => (props.isViewWord ? 0 : 15)}px;
  padding-top: ${(props) => (props.isViewWord ? props.insets.top : 0)}px;
`;

export const UsernameAndDateTextsContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const SettingsButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const BackButton = styled(Icon).attrs({
  size: 35,
  name: "chevron-left",
  type: "ionicons",
  color: colors.icon.secondary,
  containerStyle: { marginRight: 10 },
})``;

export const SettingsButton = styled(Icon).attrs({
  name: Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical",
  type: "material-community",
  underlayColor: "transparent",
  color: colors.icon.secondary,
  size: 30,
  iconStyle: {
    margin: 10,
  },
})``;

export const ReportIcon = styled(Ionicons).attrs({
  name: "flag-outline",
  size: 24,
  color: colors.icon.black,
})``;

export const EditIcon = styled(AntDesign).attrs({
  name: "edit",
  size: 24,
  color: colors.icon.black,
})``;

export const DeleteIcon = styled(AntDesign).attrs({
  name: "delete",
  size: 24,
  color: colors.icon.black,
})``;

export const UnfollowIcon = styled(AntDesign).attrs({
  name: "deleteuser",
  size: 24,
  color: colors.icon.black,
})``;

export const FollowIcon = styled(AntDesign).attrs({
  name: "adduser",
  size: 24,
  color: colors.icon.black,
})``;

export const FavoriteIcon = styled(FontAwesome).attrs((props) => ({
  name: props.favorited ? "bookmark" : "bookmark-o",
  size: 24,
  color: colors.icon.black,
}))`
  padding-left: 5px;
  padding-right: 1px;
`;

export const SettingsListItem = styled(ListItem).attrs({
  containerStyle: {
    padding: 14,
  },
})``;
