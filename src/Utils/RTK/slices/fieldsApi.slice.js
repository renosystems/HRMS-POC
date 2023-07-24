import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fieldsApiSlice = createApi({
  reducerPath: "fieldsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Field"],
  endpoints: (builder) => ({
    getFields: builder.query({
      query: () => "/custom-field",
      providesTags: ["Field"],
    }),
    getField: builder.query({
      query: (fieldId) => `/custom-field/${fieldId}`,
      providesTags: ["Field"],
    }),
    AddNewField: builder.mutation({
      query: (field) => ({
        url: `/custom-field`,
        method: "POST",
        body: field,
      }),
      invalidatesTags: ["Field"],
    }),
    updateField: builder.mutation({
      query: (field) => ({
        url: `/custom-field/${field.id}`,
        method: "PATCH",
        body: field,
      }),
      invalidatesTags: ["Field"],
    }),
    deleteField: builder.mutation({
      query: (fieldId) => ({
        url: `/custom-field/${fieldId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Field"],
    }),
  }),
});

export const {
  useGetFieldsQuery,
  useGetFieldQuery,
  useAddNewFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation,
} = fieldsApiSlice;
