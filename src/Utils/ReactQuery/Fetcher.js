import { useQuery, useInfiniteQuery } from "react-query";
import { api } from "../Api/Api";

const fetcher = ({ queryKey, pageParam }) => {
  const [url, params] = queryKey;
  return api
    .get(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
};

const useFetch = (url, params, config) => {
  const context = useQuery(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

const useLoadMore = (url, params) => {
  const context = useInfiniteQuery(
    [url, params],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? false;
      },
    }
  );

  return context;
};

export { useFetch, useLoadMore };
