import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
console.log('Base URL:', import.meta.env.DEV === true ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_SERVER_URL)
const t =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3YjE3MWQ2ZDViNGJjMzQ2MzkyM2NlYyIsIk5hbWUiOiJNaWNoYWVsIFBldGVyIiwiVXNlcm5hbWUiOiJNeWNvbnBldGVyIiwiVGdJZCI6NTE0MjU1ODEyNiwicm9sZSI6InVzZXIiLCJSZWZlckNvZGUiOiJNeWNvbnBldGVyIiwiV2FsbGV0IjoiTm90IENvbm5lY3RlZCIsIk1pbmluZ0Ftb3VudCI6MCwiUmVmZXJyYWxQb2ludCI6MCwiUmVmZXJyYWxDb3VudCI6MCwiTWluaW5nUHJlbWl1bVVzZXIiOmZhbHNlLCJUZWxlZ3JhbVByZW1pdW1Vc2VyIjpmYWxzZSwiTmV3Q29tZXIiOmZhbHNlLCJyZWZlckJ5IjoiIiwiY3JlYXRlZEF0IjoiMjAyNS0wMi0xNlQwNTowNDoyMi41MzRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMi0xNlQwNTowNToxMy45NzhaIiwiX192IjowfSwiaWF0IjoxNzM5NjgyNjg1LCJleHAiOjE3NDAyODc0ODV9.a-aARZuLY1kjzdWqJZLmtnxb5rT8HI4iUyzvHXLBPX0'
const BaseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Farming', 'combo', 'User', 'admin_user', 'admin_task', 'task', 'extra_task', 'setting'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.DEV === true ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_SERVER_URL}`,
    prepareHeaders(headers) {
      const token = sessionStorage.getItem('token')

      headers.set('Authorization', `Bearer ${token || t}`)
    },
  }),
  endpoints: () => ({}),
})

export default BaseApi
