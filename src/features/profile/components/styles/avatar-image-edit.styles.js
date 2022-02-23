import styled from "styled-components/native";
import { Avatar } from "react-native-elements";

export const AvatarImageEditBackground = styled.View`
  align-items: center;
  padding: 20px;
  flex: 1;
`;

export const AvatarEditIcon = styled(Avatar.Accessory).attrs({
  name: "pencil-plus",
  type: "material-community",
  size: 36,
  iconStyle: { fontSize: 20 },
})`
  background-color: ${(props) => props.theme.colors.icon.primary};
  top: 0;
`;
