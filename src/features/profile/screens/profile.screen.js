import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { View, Platform, Dimensions } from "react-native";
import {
  Tabs,
  MaterialTabBar,
  MaterialTabItem,
} from "react-native-collapsible-tab-view";
import { ListItem } from "react-native-elements";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { PostsTab } from "../components/posts-tab.components";
import { SavesTab } from "../components/saves-tab.components";
import { ProfileHeader } from "../components/profile-header.components";
import { Text } from "../../../components/typography/text.components";
import { colors } from "../../../infrastructure/theme/colors";

import { firebase } from "../../../utils/firebase";
import { useSelector } from "react-redux";

import {
  ProfileBackground,
  ReportIcon,
  BlockIcon,
  SettingsIcon,
  UserSettingsIcon,
  TabIcon,
} from "./styles/profile.styles";


const { width } = Dimensions.get("window");

export const ProfileScreen = ({ route, navigation }) => {
  const { uid, isGuest, isOtherUser } = route.params;

  const [userState, setUserState] = useState({ user: null, loading: true });

  const { currentUser } = useSelector((state) => state.user);

  const userSettingsSheetRef = useRef();

  const snapPoints = useMemo(() => ["20%"], []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isOtherUser ? (
          <UserSettingsIcon
            onPress={() => userSettingsSheetRef.current?.present()}
          />
        ) : (
          !isGuest && (
            <SettingsIcon onPress={() => navigation.navigate("Settings")} />
          )
        ),
      headerTitle: () => (
        <Text variant="navbar_title">{userState.user?.username}</Text>
      ),
    });
  }, [navigation, userState]);

  useEffect(() => {
    if (uid === currentUser.id) {
      setUserState({ user: currentUser, loading: false });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const id = snapshot.id;
            setUserState({ user: { id, ...snapshot.data() }, loading: false });
          }
        });
    }
  }, [currentUser]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );

  const renderUserSettings = useCallback(() => {
    return (
      <>
        <ListItem onPress={() => console.log("Report")}>
          <ReportIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Report</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={() => console.log("Block")}>
          <BlockIcon />
          <ListItem.Content>
            <Text variant="bottomsheet_item">Block</Text>
          </ListItem.Content>
        </ListItem>
      </>
    );
  }, []);

  const Header = () => {
    return (
      <ProfileHeader
        user={userState.user}
        isOtherUser={isOtherUser}
        navigation={navigation}
      />
    );
  };

  if (userState.loading) {
    return <View />;
  }

  return (
    <ProfileBackground>
      <Tabs.Container
        renderHeader={Header}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            activeColor={colors.icon.primary}
            inactiveColor={colors.icon.lightgray}
            indicatorStyle={{ width: width / 4, left: width / 8 }}
            TabItemComponent={(itemProps) => (
              <MaterialTabItem
                {...itemProps}
                label={<TabIcon name={itemProps.label} />}
              />
            )}
          />
        )}
        lazy={true}
        cancelLazyFadeIn={true}
        initialTabName="Posts"
        headerContainerStyle={{
          shadowOpacity: 0,
          borderBottomWidth: 0.2,
          borderColor: colors.ui.lightergray,
        }}
      >
        <Tabs.Tab name="Posts" label="file-tray-full-outline">
          <PostsTab user={userState.user} isOtherUser={isOtherUser} navigation={navigation} />
        </Tabs.Tab>
        <Tabs.Tab name="Saves" label="bookmark-outline">
          <SavesTab isOtherUser={isOtherUser} navigation={navigation} />
        </Tabs.Tab>
      </Tabs.Container>

      <BottomSheetModal
        ref={userSettingsSheetRef}
        key="user-settings-sheet-modal"
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        children={renderUserSettings}
      />
    </ProfileBackground>
  );
};
