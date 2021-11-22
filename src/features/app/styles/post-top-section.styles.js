import styled from "styled-components/native";
import { Platform } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { Icon } from "react-native-elements";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export const TopPostContainer = styled.View`
  padding-right: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1;
  padding-left: ${(props) => (props.isViewPost ? 0 : 15)}px;
`;

export const UsernameAndDateContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const PostSettingsButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: ${(props) => props.theme.space[2]};
`;

export const BackButton = styled(Icon).attrs({
  size: 35,
  name: "chevron-left",
  type: "ionicons",
  color: colors.icon.secondary,
  containerStyle: { marginRight: 10 },
})``;

export const PostSettingsButton = styled(Icon).attrs({
  name: Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical",
  type: "material-community",
  underlayColor: "transparent",
  color: colors.icon.secondary,
  size: 30,
})``;

export const ReportIcon = styled(Ionicons).attrs({
  name: "flag",
  size: 24,
  color: colors.icon.black
})``;

export const UnfollowIcon = styled(AntDesign).attrs({
  name: "deleteuser",
  size: 24,
  color: colors.icon.black
})``;
