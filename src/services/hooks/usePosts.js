import { useQueries } from "react-query";
import { getPostByUserId } from "../firebase/posts";
import { POST_KEY } from "./queryKeys";

export const usePosts = (posts) => {
  const results = useQueries(
    posts.map((post) => {
      return {
        queryKey: [POST_KEY, post.postId],
        queryFn: () => getPostByUserId(post.postId),
      };
    })
  );
  const isLoading = results.some((result) => result.isLoading);

  return results;
};
