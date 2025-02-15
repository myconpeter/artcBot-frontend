import BaseApi from './BaseApi'

const UserEndpoint = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    NewUser: builder.mutation({
      query: () => ({
        url: '/user/create-user',
        method: 'POST',
        body: { userData: WebApp.initDataUnsafe.user }, // ✅ Send userData
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    SplashSeen: builder.mutation({
      query: (token) => ({
        url: '/user/splash-seen',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }, // Include token
      }),
    }),
    MyInfo: builder.query({
      query: () => '/user/my-info', // ✅ No body needed for GET
      providesTags: ['User'],
    }),

    BoostingMining: builder.mutation({
      query: (arg) => ({
        url: '/user/boost-mining',
        body: arg,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Farming'],
    }),
    PointTable: builder.query({
      query: (arg) => ({ url: '/point/point-table', body: arg, method: 'GET' }),
      providesTags: ['User', 'task', 'extra_task'],
    }),
    Leaderboard: builder.query({
      query: (arg) => ({ url: '/point/leaderboard', body: arg, method: 'GET' }),
      // providesTags: ["User", "task"]
    }),
    FindReferer: builder.query({
      query: () => '/user/ReferList',
      providesTags: ['User'],
    }),
    AllUserList: builder.query({
      query: () => ({ url: '/user/all-user-admin', method: 'GET' }),
      providesTags: ['admin_user'],
    }),
    UpdateSpacificUser: builder.mutation({
      query: (arg) => ({
        url: '/user/update-user-from-admin',
        method: 'PUT',
        body: arg,
      }),
      invalidatesTags: ['admin_user'],
    }),
  }),
})

export const {
  useSplashSeenMutation,
  useLeaderboardQuery,
  useBoostingMiningMutation,
  useUpdateSpacificUserMutation,
  useNewUserMutation,
  useAllUserListQuery,
  usePointTableQuery,
  useFindRefererQuery,
  useMyInfoQuery,
} = UserEndpoint
