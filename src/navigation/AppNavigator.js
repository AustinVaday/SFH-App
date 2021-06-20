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
import TrendingScreen from "../screens/TrendingScreen";
import ViewGuestProfileScreen from "../screens/ViewGuestProfileScreen";
import ViewPostingScreen from "../screens/ViewPostingScreen";
import ListSearchResultsScreen from "../screens/ListSearchResultsScreen";
import PostingScreen from "../screens/PostingScreen";
import FollowListScreen from "../screens/FollowListScreen";
import UploadScreen from "../screens/UploadScreen";
import LibraryScreen from "../screens/LibraryScreen";



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

const TrendingNavigator = createStackNavigator({
  Trending: {
    screen: TrendingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ViewPosting: {
    screen: ViewPostingScreen,
  },
});

const CameraNavigator = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Library: {
    screen: LibraryScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Upload: {
    screen: UploadScreen,
    navigationOptions: {
      headerBackTitleVisible: false
    },
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
    navigationOptions: {
      headerShown: false,
    },
  },
  Setting: {
    screen: SettingScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
  ViewPosting: {
    screen: ViewPostingScreen,
  },
  FollowList: {
    screen: FollowListScreen,
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
        inactiveTintColor: Colors.thirdColor,
      },
    },
  },
  Trending: {
    screen: TrendingNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="line-chart" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.thirdColor,
      },
    },
  },
  Camera: {
    screen: CameraNavigator,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="plus-square" size={30} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false,
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.thirdColor,
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
        inactiveTintColor: Colors.thirdColor,
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
        inactiveTintColor: Colors.thirdColor,
      },
    },
  },
});

export default AppTabNavigator;
