import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Image, SearchBar, Icon } from "react-native-elements";
import Modal from "react-native-modal";

export const DiscoverBackground = styled.View`
  flex: 1;
  background-color: white;
`;

export const ModalScreen = styled(Modal)`
  flex: 1;
  margin: 0;
  background-color: white;
`;

export const UserRow = styled(TouchableOpacity)`
  flex: 1;
  background-color: white;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const PostTitleRow = styled(TouchableOpacity)`
  flex: 1;
  background-color: white;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const SearchIcon = styled(Icon).attrs(() => ({
  type: "ionicon",
  name: "ios-search",
}))``;

export const ArrowForwardIcon = styled(Icon).attrs(() => ({
  type: "ionicon",
  name: "ios-arrow-forward",
  containerStyle: { paddingLeft: 10 },
}))``;

export const UserImage = styled(Image)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

export const Searchbar = styled(SearchBar).attrs((props) => ({
  placeholder: "Search",
  cancelButtonProps: {
    color: props.theme.colors.text.primary,
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainerStyle: {
    backgroundColor: props.theme.colors.input.lightergray,
    borderRadius: 5,
    height: 30,
  },
}))``;
