import { useFetch } from "./Fetcher";
import { apiRoutes } from "../Api/Api";

export const useGetDepartments = () => {
  const context = useFetch(apiRoutes.getDepartments, undefined, {});
  return { ...context, data: context.data?.departments };
};

export const useGetDepartment = (id) => {
  const context = useFetch(apiRoutes.getDepartment, { id }, {});
  return { ...context, data: context.data?.department };
};
