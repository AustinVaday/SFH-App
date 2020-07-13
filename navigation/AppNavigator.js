import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CameraScreen from "../screens/CameraScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import InboxScreen from "../screens/InboxScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";
import TreadingScreen from "../screens/TreadingScreen";
import ViewGuestProfileScreen from "../screens/ViewGuestProfileScreen";
import ViewPostingScreen from "../screens/ViewPostingScreen";
import ListSearchResultsScreen from "../screens/ListSearchResultsScreen";
import PostingScreen from "../screens/PostingScreen";
import FederatedLoginScreen from "../screens/FederatedLoginScreen";

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ViewPosting: {
    screen: ViewPostingScreen,
  },
  ViewGuestProfile: {
    screen: ViewGuestProfileScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  ListSearchResults: {
    screen: ListSearchResultsScreen,
  },
});

const TreadingNavigator = createStackNavigator({
  Treading: {
    screen: TreadingScreen,
  },
  ViewPosting: {
    screen: ViewPostingScreen,
  },
});

const CameraNavigator = createStackNavigator({
  Camera: {
    screen: CameraScreen,
  },
  Posting: {
    screen: PostingScreen,
  },
});

const InboxNavigator = createStackNavigator({
  Inbox: {
    screen: InboxScreen,
  },
  ViewGuestProfile: {
    screen: ViewGuestProfileScreen,
  },
});

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
});

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
  },
  Treading: {
    screen: TreadingNavigator,
  },
  Camera: {
    screen: CameraNavigator,
  },
  Inbox: {
    screen: InboxNavigator,
  },
  Profile: {
    screen: ProfileNavigator,
  },
});

export default AppTabNavigator;
