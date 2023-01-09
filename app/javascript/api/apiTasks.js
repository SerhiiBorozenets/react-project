import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {csrfToken} from "../components/helpers/helpers";

export const apiTasks = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({baseUrl: "/api/v1/"}),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getProjectTasks: builder.query({
      query: (params) => ({
        url: `projects/${params.slug}`
      }),
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation({
      query: ({ task, project_id }) => ({
        url: `tasks`,
        method: 'POST',
        body: {
          task,
          project_id
        },
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: 'PATCH',
        body: task,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
        body: id,
        headers: { 'X-CSRF-Token': csrfToken },
      }),
      invalidatesTags: ['Tasks'],
    }),
  })
})

export const {
  useGetProjectTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation
} = apiTasks
