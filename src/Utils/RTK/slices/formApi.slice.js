import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formApiSlice = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Form"],
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => "/form",
      providesTags: ["Form"],
    }),
    getForm: builder.query({
      query: (id) => `/Form/${id}`,
      providesTags: ["Form"],
    }),
    AddNewForm: builder.mutation({
      query: (form) => ({
        url: `/form`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Form"],
    }),
    updateForm: builder.mutation({
      query: (form) => ({
        url: `/form/${form.id}`,
        method: "PATCH",
        body: form,
      }),
      invalidatesTags: ["Form"],
    }),
    deleteForm: builder.mutation({
      query: (id) => ({
        url: `/form/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Form"],
    }),
    publishForm: builder.mutation({
      query: (id) => ({
        url: `/form/${id}/publish`,
        method: "POST",
      }),
      invalidatesTags: ["Form"],
    }),
    archiveForm: builder.mutation({
      query: (id) => ({
        url: `/form/${id}/archive`,
        method: "POST",
      }),
      invalidatesTags: ["Form"],
    }),
    addApprovalCycle: builder.mutation({
      query: (id) => ({
        url: `/forms/${id}/approval-cycle`,
        method: "POST",
      }),
      invalidatesTags: ["Form"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useAddNewFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation,
  useArchiveFormMutation,
  usePublishFormMutation,
  useAddApprovalCycleMutation,
} = formApiSlice;
