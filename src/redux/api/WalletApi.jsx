import BaseApi from './BaseApi'

const WalletEndpoint = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    ConnectWallet: builder.mutation({
      query: ({ walletData }) => ({
        url: '/wallet/save-wallet',
        method: 'POST',
        body: { walletData }, // Ensure that `walletAddress` matches expected API request body
      }),
      invalidatesTags: ['Wallet'],
    }),
    DisconnectWallet: builder.mutation({
      query: () => ({
        url: '/wallet/remove-wallet',
        method: 'POST',
      }),
      invalidatesTags: ['Wallet', 'User'],
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

export const { useConnectWalletMutation, useDisconnectWalletMutation, useGetFarmingStatusQuery } = WalletEndpoint
