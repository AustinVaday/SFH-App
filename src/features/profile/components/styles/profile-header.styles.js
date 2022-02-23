import styled from "styled-components/native";
import { Pressable } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const StatsContainer = styled.View`
  padding-top: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
`;

export const PostsStatContainer = styled(Pressable)`
  flex: 0.75;
  align-items: center;
`;

export const FollowingStatContainer = styled(Pressable)`
  flex: 1;
  align-items: center;
`;

export const FollowersStatContainer = styled(Pressable)`
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

export const BioContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const InfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.colors.ui.lightergray};
  border-top-width: 0.2px;
  border-bottom-width: 0.2px;
  padding: ${(props) => props.theme.space[2]};
`;

export const ProfileStatsContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const UserAvatarContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const TopInfoContainer = styled.View`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
`;

export const IdentifyContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EarIcon = styled(Ionicons).attrs({
  name: "ear-outline",
  size: 20,
})`
  padding-right: ${(props) => props.theme.space[1]};
`;

export const LanguagesContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LanguageIcon = styled(MaterialIcons).attrs({
  name: "language",
  size: 20,
})`
  padding-right: ${(props) => props.theme.space[1]};
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
