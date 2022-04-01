import React, { useState, useEffect, useRef } from "react";
import { FlatList, View, Platform, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BigList from "react-native-big-list";

import { Text } from "../../../components/typography/text.components";
import { Card } from "../components/card.components";
import { DiscoverListLoader } from "../components/discover-list-loader.components";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchDiscoverWords,
  refreshDiscoverWords,
} from "../../../services/redux/actions/words.actions";
import { queryUsersAndKeywords } from "../../../services/firebase/users";

import {
  DiscoverBackground,
  ModalScreen,
  UserRow,
  WordTitleRow,
  SearchIcon,
  ArrowForwardIcon,
  UserImage,
  Searchbar,
  RefreshLoadingIcon,
} from "./styles/discover.styles";

const REFRESHINGHEIGHT = 80;

export const DiscoverScreen = ({ navigation }) => {
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [extraPaddingTop, setExtraPaddingTop] = useState(0);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const discoverWords = useSelector((state) => state.words.discoverWords);
  const currentUser = useSelector((state) => state.user.currentUser);

  const lottieViewRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDiscoverWords(setLoading));
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      if (isRefreshing) {
        setExtraPaddingTop(50);
        lottieViewRef.current.play();
      } else {
        setExtraPaddingTop(0);
      }
    }
  }, [isRefreshing]);

  const onScroll = (event) => {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  };

  const onRelease = () => {
    if (offsetY <= -REFRESHINGHEIGHT && !isRefreshing) {
      onHandleRefresh();
    }
  };

  const onHandleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      dispatch(refreshDiscoverWords(setIsRefreshing));
    }, 2000);
  };

  const listHeaderComponent = () => {
    return <Text variant="discover_list_title">Recent Videos</Text>;
  };

  const listEmptyComponent = () => {
    return <Text variant="list_empty_title">No Videos</Text>;
  };

  const renderSearchResultItem = ({ item }) => {
    return item.type === "user" ? (
      <UserRow
        onPress={() =>
          navigation.navigate("GuestProfile", {
            uid: item.id,
            isGuest: true,
            isOtherUser: currentUser.id !== item.id,
          })
        }
      >
        <Text variant="search_username">{item.username}</Text>
        <UserImage source={{ uri: item.profilePhoto }} />
      </UserRow>
    ) : (
      <WordTitleRow
        onPress={() =>
          navigation.navigate("ResultsSearch", {
            keyword: item.title,
          })
        }
      >
        <Text variant="search_username">{item.title}</Text>
        <SearchIcon />
        <ArrowForwardIcon />
      </WordTitleRow>
    );
  };

  const renderVideoThumbnailItem = ({ item }) => {
    return <Card word={item} />;
  };

  let progress = 0;
  if (offsetY < 0 && !isRefreshing) {
    progress = offsetY / -REFRESHINGHEIGHT;
  }

  return (
    <DiscoverBackground style={{ paddingTop: insets.top }}>
      <Searchbar
        value={textInput}
        onChangeText={(text) => {
          if (searchTimer) {
            clearTimeout(searchTimer);
          }
          setTextInput(text);
          setSearchTimer(
            setTimeout(() => {
              queryUsersAndKeywords(text).then(setSearchResults);
            }, 500)
          );
        }}
        onFocus={() => setTextInputFocussed(true)}
        platform="ios"
        onCancel={() => setTextInputFocussed(false)}
        showCancel={textInputFocussed}
      />

      {loading ? (
        <DiscoverListLoader />
      ) : (
        <>
          <View>
            <RefreshLoadingIcon
              ref={lottieViewRef}
              style={{
                height: REFRESHINGHEIGHT,
              }}
              progress={progress}
              source={require("../../../assets/lottie/pull-refresh-loading.json")}
            />
          </View>

          <FlatList
            data={discoverWords}
            renderItem={renderVideoThumbnailItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            ListHeaderComponent={
              discoverWords.length !== 0 && listHeaderComponent
            }
            ListEmptyComponent={listEmptyComponent}
            contentContainerStyle={[
              discoverWords.length === 0 && {
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              },
              {
                backgroundColor: "white",
              },
            ]}
            onScroll={onScroll}
            onResponderRelease={onRelease}
            style={{ paddingTop: extraPaddingTop }}
            refreshControl={
              Platform.OS === "android" && (
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onHandleRefresh}
                />
              )
            }
          />
        </>
      )}

      <ModalScreen
        isVisible={textInputFocussed}
        hasBackdrop={false}
        coverScreen={false}
        animationInTiming={1}
        animationOutTiming={1}
        style={{ marginTop: insets.top + 55 }}
      >
        <BigList
          data={searchResults}
          renderItem={renderSearchResultItem}
          keyExtractor={(item) => item.id}
          itemHeight={60}
        />
      </ModalScreen>
    </DiscoverBackground>
  );
};
