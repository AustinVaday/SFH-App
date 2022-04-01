import { useQuery } from "react-query";
import { getFavoriteByWordId } from "../firebase/favorites";
import { FAVORITE_KEY } from "./queryKeys";

export const useFavorite = (wordId, options = {}) => {
  return useQuery([FAVORITE_KEY, wordId], () => getFavoriteByWordId(wordId), options);
};