import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

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
    navigationOptions: {
      headerShown: false,
    },
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
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "gray",
      },
    },
  },
  Treading: {
    screen: TreadingNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="line-chart" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "gray",
      },
    },
  },
  Camera: {
    screen: CameraNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="plus-square" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "gray",
      },
    },
  },
  Inbox: {
    screen: InboxNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="inbox" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "gray",
      },
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user-circle-o" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: "gray",
      },
    },
  },
});

export default AppTabNavigator;
