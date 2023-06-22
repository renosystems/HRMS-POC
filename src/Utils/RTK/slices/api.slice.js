import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/departments",
      providesTags: ["Department"],
    }),
    getDepartment: builder.query({
      query: (depId) => `/departments/${depId}`,
      providesTags: ["Department"],
    }),
    AddNewDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `/departments/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation({
      query: (depId) => ({
        url: `/departments/${depId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentQuery,
  useAddNewDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = apiSlice;
