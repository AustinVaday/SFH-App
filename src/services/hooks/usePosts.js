import { useQueries } from "react-query";
import { getPostById } from "../user/index";
import { POST_KEY } from "./queryKeys";

export const usePosts = (posts) => {
  const results = useQueries(
    posts.map((post) => {
      return {
        queryKey: [POST_KEY, post.postId],
        queryFn: () => getPostById(post.postId),
      };
    })
  );
  const isLoading = results.some((result) => result.isLoading);

  return results;
};
