import { useFetch } from "./Fetcher";
import { apiRoutes } from "../Api/Api";
import { pathToUrl } from "../pathToUrl";

export const useGetForms = () => {
  const context = useFetch(apiRoutes.getForms, undefined, {});
  return { ...context, data: context.data?.forms };
};

export const useGetForm = (id) => {
  const context = useFetch(pathToUrl(apiRoutes.getForm, { id }));
  return { ...context, data: context.data?.form };
};
