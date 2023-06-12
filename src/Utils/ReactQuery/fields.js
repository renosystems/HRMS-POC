import { useFetch, useLoadMore } from "./Fetcher";
import { apiRoutes } from "../Api/Api";

export const useGetFields = () => {
  const context = useLoadMore(apiRoutes.getFields);
  return { ...context, data: context.data?.fields };
};

export const useGetField = (id) => {
  const context = useFetch(apiRoutes.getField, { id }, {});
  return { ...context, data: context.data?.field };
};
