import { useFetch } from "./Fetcher";
import { apiRoutes } from "../Api/Api";

export const useGetProfile = () => {
  const context = useFetch(apiRoutes.getProfile, undefined, { retry: false });
  //We use the retry: false setting here because we don’t want to retry this request. If it fails, we believe that the user is unauthorized and do the redirect.
  return { ...context, data: context.data?.user };
};
