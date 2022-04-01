import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import { Text } from "../../../components/typography/text.components";
import { Spacer } from "../../../components/spacer/spacer.components";
import { LoadingIndicator } from "../../../components/loading/loading-indicator.components";

import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../../services/redux/actions/favorites.actions";

import {
  FavoritesBackground,
  ListEmptyBackground,
  Thumbnail,
  CardContainer,
  BottomBarContainer,
  Card,
  LoadingIndicatorContainer,
} from "./styles/favorites.styles";

export const FavoritesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const favorites = useSelector(
    (state) => state.favorites.currentUserFavorites
  );
  const fetched = useSelector(
    (state) => state.favorites.isCurrentUserFavoritesFetched
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchFavorites(setLoading));
    } else {
      setLoading(false);
    }
  }, []);

  const listEmptyComponent = () => {
    return (
      <ListEmptyBackground>
        <Text variant="list_empty_title">No Favorites</Text>
        <Spacer size="large" />
        <Text variant="list_empty_message">
          Favorite any video you want and re-watch here later. Favorites will
          appear here.
        </Text>
      </ListEmptyBackground>
    );
  };

  const renderItem = ({ item: word }) => {
    return (
      <CardContainer>
        <Card>
          <Thumbnail
            source={{ uri: word.videoThumbnail }}
            onPress={() => navigation.navigate("ViewWord", { word })}
          />
          <BottomBarContainer>
            <Text variant="profile_tab_word_title">{word.title}</Text>
          </BottomBarContainer>
        </Card>
      </CardContainer>
    );
  };

  return (
    <FavoritesBackground>
      {loading ? (
        <LoadingIndicatorContainer>
          <LoadingIndicator />
        </LoadingIndicatorContainer>
      ) : (
        <FlatList
          data={favorites}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          bounces={favorites.length === 0 ? false : true}
          contentContainerStyle={
            favorites.length === 0 && {
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }
          }
        />
      )}
    </FavoritesBackground>
  );
};
