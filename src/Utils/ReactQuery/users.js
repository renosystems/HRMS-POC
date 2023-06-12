import { useFetch, useLoadMore } from "./Fetcher";
import { apiRoutes } from "../Api/Api";
import { pathToUrl } from "../pathToUrl";

export const useGetUsers = () => {
  const context = useLoadMore(apiRoutes.getUsers);
  return { ...context, data: context.data?.users };
};

export const useGetUser = (id) => {
  const context = useFetch(pathToUrl(apiRoutes.getUser, { id }));
  return { ...context, data: context.data?.user };
};
