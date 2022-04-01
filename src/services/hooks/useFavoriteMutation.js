import { useMutation, useQueryClient } from "react-query";
import { changeFavoriteState } from "../../services/firebase/favorites";
import { FAVORITE_KEY } from "./queryKeys";

export const useFavoriteMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(changeFavoriteState, {
    ...options,
    onMutate: (variables) => {
      queryClient.setQueryData([FAVORITE_KEY, variables.wordId], !variables.isFavorite);
    },
  });
};
