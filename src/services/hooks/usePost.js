import { useQuery } from "react-query";
import { getPostById } from "../user/index";
import { POST_KEY } from "./queryKeys";

export const usePost = (postId, options = {}) => {
  return useQuery([POST_KEY, postId], () => getPostById(postId), options);
};