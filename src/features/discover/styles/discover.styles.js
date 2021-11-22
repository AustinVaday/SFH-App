import styled from "styled-components/native";
import { TouchableOpacity, Dimensions } from "react-native";
import { Image, SearchBar } from "react-native-elements";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const DiscoverBackground = styled.View`
  position: relative;
`;

export const SearchScreen = styled.View`
  position: absolute;
  background-color: white;
  left: 0px;
  z-index: 9999;
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;
  top: ${hp("9%")}px;
`;

export const UserRowCard = styled(TouchableOpacity)`
  flex: 1;
  background-color: white;
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

export const UserImage = styled(Image)`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

export const VideoContainer = styled.View`
  padding: 2px;
  width: 50%;
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
  },
}))``;
