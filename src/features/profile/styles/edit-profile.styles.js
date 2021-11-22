import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

export const EditProfileBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ArrowDownIcon = styled(Ionicons).attrs((props) => ({
  name: "md-arrow-down",
  size: 20,
  color: props.theme.colors.icon.gray,
}))``;
