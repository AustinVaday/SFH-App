import styled from "styled-components/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

export const ListEmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp("45%")}px;
`;

export const CommentInputBar = styled(BottomSheetTextInput)`
  background-color: ${(props) => props.theme.colors.input.cultured};
  padding-left: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text.black};
  flex: 1;
`;

export const CommentBarContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) =>
    props.isKeyboardOpen
      ? props.androidNotchFixed !== 0
        ? 5 + props.androidNotchFixed
        : 5
      : props.insetsBottom === 0
      ? 5
      : props.insetsBottom}px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.bg.cultured};
`;

export const AvatarContainer = styled.View`
  padding-right: ${(props) => props.theme.space[2]};
`;

export const SendButtonContainer = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
`;

export const CommentTextIcon = styled(MaterialCommunityIcons).attrs(
  (props) => ({
    name: "comment-text-outline",
    size: 100,
    color: props.theme.colors.icon.lightgray,
  })
)``;

export const SendButton = styled(Icon).attrs((props) => ({
  name: "sc-telegram",
  type: "evilicon",
  size: 32,
  color: props.theme.colors.icon.primary,
}))``;
