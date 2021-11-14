import { useQuery } from "react-query";
import { getUserById } from "../user/index";
import { USER_KEY } from "./queryKeys";

export const useUser = (userId, options = {}) => {
  return useQuery([USER_KEY, userId], () => getUserById(userId), options);
};
