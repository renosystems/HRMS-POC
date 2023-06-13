import { useMutation, useQueryClient } from "react-query";
import { api } from "../Api/Api";
const useGenericMutation = (func, url, params, updater) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData([url, params], (oldData) => {
        return updater ? (oldData, data) : data;
      });

      return previousData;
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },

    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
      updater();
    },
  });
};

const useDelete = (url, params, updater) => {
  return useGenericMutation((id) => api.delete(url), url, params, updater);
};

const usePost = (url, params, updater) => {
  return useGenericMutation(
    (data) => api.post(url, data),
    url,
    params,
    updater
  );
};

const usePatch = (url, params, updater) => {
  return useGenericMutation(
    (data) => api.patch(url, data),
    url,
    params,
    updater
  );
};

const usePut = (url, params, updater) => {
  return useGenericMutation((data) => api.put(url, data), url, params, updater);
};

export { usePatch, usePost, useDelete, usePut };
