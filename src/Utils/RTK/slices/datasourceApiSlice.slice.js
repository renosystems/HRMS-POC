import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataSourcesApiSlice = createApi({
  reducerPath: "datasourceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["DataSources"],
  endpoints: (builder) => ({
    getDatasources: builder.query({
      query: () => "/data-source",
      providesTags: ["Datasources"],
    }),
    getDatasource: builder.query({
      query: (dataSourceId) => `/data-source/${dataSourceId}`,
      providesTags: ["Datasources"],
    }),
    AddNewDatasource: builder.mutation({
      query: (dataSource) => ({
        url: `/data-source`,
        method: "POST",
        body: dataSource,
      }),
      invalidatesTags: ["Datasources"],
    }),
    updateDatasource: builder.mutation({
      query: (dataSource) => ({
        url: `/data-source/${dataSource.id}`,
        method: "PATCH",
        body: dataSource.data,
      }),
      invalidatesTags: ["Datasources"],
    }),
    deleteDatasource: builder.mutation({
      query: (dataSourceId) => ({
        url: `/data-source/${dataSourceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Datasources"],
    }),
  }),
});

export const {
  useGetDatasourcesQuery,
  useGetDatasourceQuery,
  useAddNewDatasourceMutation,
  useUpdateDatasourceMutation,
  useDeleteDatasourceMutation,
} = dataSourcesApiSlice;
