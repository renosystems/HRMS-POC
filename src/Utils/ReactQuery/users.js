import { useFetch } from "./Fetcher";
import { apiRoutes } from "../Api/Api";

export const useGetUsers = () => {
  const context = useFetch(apiRoutes.getUsers, undefined, {});
  return { ...context, data: context.data?.users };
};

export const useGetUser = (id) => {
  const context = useFetch(apiRoutes.getUser, { id }, {});
  return { ...context, data: context.data?.user };
};
