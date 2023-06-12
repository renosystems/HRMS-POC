import { useFetch } from "./Fetcher";
import { useDelete, usePatch, usePost, usePut } from "./Mutation";
import { pathToUrl } from "../pathToUrl";
import { apiRoutes } from "../Api/Api";

export const useGetDepartments = () => {
  const context = useFetch(apiRoutes.getDepartments, undefined, {});
  return { ...context, data: context.data?.departments };
};

export const useGetDepartment = (id) => {
  const context = useFetch(pathToUrl(apiRoutes.getDepartment, { id }));
  return { ...context, data: context.data?.department };
};

export const usePatchDepartment = (id) =>
  usePatch(pathToUrl(apiRoutes.updateDepartment, { id }));

export const useDeleteDepartment = (id) =>
  useDelete(pathToUrl(apiRoutes.updateDepartment, { id }));

export const usePostDepartment = () => usePost(apiRoutes.updateDepartment);

export const usePutDepartment = (id) =>
  usePut(pathToUrl(apiRoutes.updateDepartment, { id }));
