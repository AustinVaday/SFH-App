import { useQuery } from "react-query";
import { getPostByUserId } from "../firebase/posts";
import { POST_KEY } from "./queryKeys";

export const usePost = (postId, options = {}) => {
  return useQuery([POST_KEY, postId], () => getPostByUserId(postId), options);
};