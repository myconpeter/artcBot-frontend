import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
console.log('Base URL:', import.meta.env.DEV === true ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_SERVER_URL)

const BaseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Farming', 'combo', 'User', 'admin_user', 'admin_task', 'task', 'extra_task', 'setting'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.DEV === true ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_SERVER_URL}`,
    prepareHeaders(headers) {
      const token = sessionStorage.getItem('token')

      headers.set('Authorization', `Bearer ${token}`)
    },
  }),
  endpoints: () => ({}),
})

export default BaseApi
