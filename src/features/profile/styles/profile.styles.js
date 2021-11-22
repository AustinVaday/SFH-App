import styled from "styled-components/native";
import { Pressable } from "react-native";
import { Button, Header } from "react-native-elements";

export const ProfileBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-grow: 1;
`;

export const ProfileStats = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

export const PostsStatContainer = styled(Pressable)`
  padding-left: ${(props) => props.theme.space[4]};
  flex: 1;
  align-items: center;
`;

export const FollowingStatContainer = styled(Pressable)`
  flex: 1;
  align-items: center;
`;

export const FollowersStatContainer = styled(Pressable)`
  padding-right: ${(props) => props.theme.space[4]};
  flex: 1;
  align-items: center;
`;

export const EditProfileButtonContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  width: 70%;
  align-self: center;
`;

export const ProfileHeaderBackground = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ProfileInfo = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const NameAndIdentifyContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatarContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const GuestUserButtonsSection = styled.View`
  flex-direction: row;
  align-self: center;
  padding: ${(props) => props.theme.space[2]};
`;

export const FollowingButton = styled(Button).attrs((props) => ({
  type: "outline",
  buttonStyle: {
    height: 50,
    width: 150,
    borderColor: props.theme.colors.icon.primary,
  },
  containerStyle: {
    paddingRight: 5,
  },
}))``;

export const FollowButton = styled(Button).attrs((props) => ({
  type: "solid",
  buttonStyle: {
    height: 50,
    width: 150,
    backgroundColor: props.theme.colors.icon.primary,
  },
  containerStyle: {
    paddingRight: 5,
  },
}))``;

export const MessageButton = styled(Button).attrs((props) => ({
  type: "outline",
  buttonStyle: {
    height: 50,
    width: 150,
    borderColor: props.theme.colors.icon.primary,
  },
  containerStyle: {
    paddingLeft: 5,
  },
}))``;

export const EditProfileButton = styled(Button).attrs((props) => ({
  type: "outline",
  buttonStyle: {
    height: 50,
    borderColor: props.theme.colors.icon.primary,
  },
  containerStyle: {
    paddingLeft: 5,
  },
}))``;

export const Navbar = styled(Header).attrs((props) => ({
  leftComponent: props.guestUser && {
    icon: "chevron-thin-left",
    type: "entypo",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.goBack(),
  },
  rightComponent: !props.guestUser && {
    icon: "dots-horizontal",
    type: "material-community",
    color: props.theme.colors.icon.black,
    onPress: () => props.navigation.navigate("Settings"),
  },
  containerStyle: {
    backgroundColor: props.theme.colors.bg.secondary,
  },
}))``;
