import { useQuery } from "react-query";
import { getWordByUserId } from "../firebase/words";
import { WORD_KEY } from "./queryKeys";

export const useWord = (wordId, options = {}) => {
  return useQuery([WORD_KEY, wordId], () => getWordByUserId(wordId), options);
};