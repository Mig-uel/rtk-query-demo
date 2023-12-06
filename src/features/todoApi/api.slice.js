import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'todoApi',
  // base url for every endpoint
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/' }),
  // assign tag to cache, which mutation invalidates the cache, then auto refetches data
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      // will make a request to <baseurl>/todos
      query: () => 'todos',
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
})

// rtk auto creates hooks based on endpoints names
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice
