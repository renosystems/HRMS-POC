import { useFetch } from "../Utils/ReactQuery/Fetcher";
import {
  useDelete,
  usePatch,
  usePost,
  usePut,
} from "../Utils/ReactQuery/Mutation";
import { pathToUrl } from "../Utils/pathToUrl";
import { apiRoutes } from "../Utils/Api/Api";

export const useGetDepartments = () => {
  const context = useFetch(apiRoutes.getDepartments, undefined, {});
  return context;
};

export const useGetDepartment = (id) => {
  const context = useFetch(pathToUrl(apiRoutes.getDepartment, { id }));
  return context;
};

export const usePatchDepartment = (id) =>
  usePatch(pathToUrl(apiRoutes.updateDepartment, { id }));

export const useDeleteDepartment = (id) =>
  useDelete(pathToUrl(apiRoutes.updateDepartment, { id }));

export const usePostDepartment = () => usePost(apiRoutes.updateDepartment);

export const usePutDepartment = (id) =>
  usePut(pathToUrl(apiRoutes.updateDepartment, { id }));
