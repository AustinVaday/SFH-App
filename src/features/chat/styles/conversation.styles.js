import styled from "styled-components/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button } from "react-native-elements";

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

export const SendButton = styled(Button).attrs((props) => ({
  type: "clear",
  icon: {
    name: "send",
    size: 25,
    color:
      props.input !== ""
        ? props.theme.colors.icon.primary
        : props.theme.colors.icon.muted,
  },
}))``;
