import styled from "styled-components/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button } from "react-native-elements";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../../../../infrastructure/theme/colors";

export const ConversationBackground = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const MessageInputSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.ui.cultured};
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ViewKeyboardAvoiding = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === "ios" ? "padding" : "height",
})`
  flex: 1;
`;

export const MessageInput = styled(Input).attrs((props) => ({
  inputStyle: { paddingLeft: 10, fontSize: 16 },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderRadius: 5,
    backgroundColor: props.theme.colors.input.cultured,
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 0,
    paddingRight: 0,
    paddingLeft: 10,
  },
  renderErrorMessage: false,
}))``;

export const ReportIcon = styled(Feather).attrs({
  name: "flag",
  size: 24,
  color: colors.icon.black,
})``;

export const BlockIcon = styled(MaterialIcons).attrs({
  name: "block",
  size: 24,
  color: colors.icon.black,
})``;

export const SendButton = styled(Button).attrs((props) => ({
  type: "clear",
  icon: {
    name: "send",
    type: "font-awesome",
    size: 25,
    color:
      props.input !== ""
        ? props.theme.colors.icon.primary
        : props.theme.colors.icon.muted,
  },
}))``;

export const ConversationSettingsIcon = styled(MaterialCommunityIcons).attrs(
  (props) => ({
    name: "dots-horizontal",
    size: 24,
    color: props.theme.colors.icon.black,
  })
)``;
