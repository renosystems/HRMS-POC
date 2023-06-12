import { useFetch, useLoadMore } from "./Fetcher";
import { apiRoutes } from "../Api/Api";
import { pathToUrl } from "../pathToUrl";

export const useGetFields = () => {
  const context = useLoadMore(apiRoutes.getFields);
  return { ...context, data: context.data?.fields };
};

export const useGetField = (id) => {
  const context = useFetch(pathToUrl(apiRoutes.getField, { id }));
  return { ...context, data: context.data?.field };
};
