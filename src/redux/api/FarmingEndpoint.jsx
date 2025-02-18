import BaseApi from './BaseApi'

const FarmingEndpoint = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    StartFarming: builder.mutation({
      query: () => ({
        url: '/mine/start-farming',
        method: 'POST',
      }),
      invalidatesTags: ['Farming'],
    }),
    ClaimFarming: builder.mutation({
      query: ({ userId, amount }) => ({
        url: '/mine/claim-farming',
        method: 'POST',
        body: { userId, amount }, // Correctly passing userId & amount
      }),
      invalidatesTags: ['Farming', 'User'],
    }),

    GetFarmingStatus: builder.query({
      query: () => ({
        url: '/farm/get-farming-status',
        method: 'GET',
      }),
      providesTags: ['Farming'],
    }),
  }),
})

export const { useStartFarmingMutation, useClaimFarmingMutation, useGetFarmingStatusQuery } = FarmingEndpoint
