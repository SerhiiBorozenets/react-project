import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {csrfToken} from "../components/helpers/helpers";

export const apiProjects = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v1/"}),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => 'projects.json',
      providesTags: ['Projects'],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: `projects`,
        method: 'POST',
        body: project,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: (project) => ({
        url: `projects/${project.slug}`,
        method: 'PATCH',
        body: project,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Projects'],
    }),
    removeProject: builder.mutation({
      query: (slug) => ({
        url: `projects/${slug}`,
        method: 'DELETE',
        body: slug,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Projects'],
    }),
  })
})

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useRemoveProjectMutation
} = apiProjects
