import styled from "styled-components/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export const ListEmptySection = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp("45%")}px;
`;

export const CommentInputBar = styled(BottomSheetTextInput)`
  background-color: #f1f1f2;
  padding-left: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  border-radius: 5px;
  color: black;
  flex: 1;
`;

export const CommentBarContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
  border-top-width: 1px;
  border-top-color: #f1f1f2;
`;

export const AvatarContainer = styled.View`
  padding-right: ${(props) => props.theme.space[2]};
`;

export const SendIconContainer = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
`;
