import { useFetch } from "./Fetcher";
import { useDelete, usePatch, usePost, usePut } from "./Mutation";
import { pathToUrl } from "../pathToUrl";
import { apiRoutes } from "../Api/Api";

export const useGetDepartments = () => {
  const context = useFetch(apiRoutes.getDepartments, undefined, {});
  return { ...context, data: context.data?.departments };
};

export const useGetDepartment = (id) => {
  const context = useFetch(apiRoutes.getDepartment, { id }, {});
  return { ...context, data: context.data?.department };
};

export const usePatchDepartment = (id) =>
  usePatch(pathToUrl(apiRoutes.updateDepartment, { id }));

export const useDeleteDepartment = (id) =>
  useDelete(pathToUrl(apiRoutes.updateDepartment, { id }));

export const usePostDepartment = (id) =>
  usePost(pathToUrl(apiRoutes.updateDepartment, { id }));

export const usePutDepartment = (id) =>
  usePut(pathToUrl(apiRoutes.updateDepartment, { id }));
