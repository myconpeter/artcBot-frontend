import BaseApi from './BaseApi'

const PartnerTaskEndpoint = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreatePartnerTask: builder.mutation({
      query: (arg) => ({
        url: '/task/create-new-task',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['admin_task'],
    }),

    UpdatePartnerTask: builder.mutation({
      query: (arg) => ({
        url: '/partner/update-task-admin',
        method: 'PUT',
        body: arg,
      }),
      invalidatesTags: ['admin_task'],
    }),
    DeletePartnerTask: builder.mutation({
      query: (arg) => ({
        url: '/partner/delete-task-admin',
        method: 'DELETE',
        body: { id: arg },
      }),
      invalidatesTags: ['admin_task'],
    }),
    GetAllPartnerTask: builder.query({
      query: () => ({
        url: '/partner/get-all-task', // admin
        method: 'GET',
      }),
      providesTags: ['admin_task'],
    }),

    GetIncompletePartnerTaskList: builder.query({
      query: () => ({
        url: '/partner/all-partner-task',
        method: 'GET',
      }),
      providesTags: ['task'],
    }),
    ClaimPartnerTaskReward: builder.mutation({
      query: (arg) => ({
        url: '/partner/claim_partner_task-rewards',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['task'],
    }),
    PremiumTransaction: builder.mutation({
      query: (arg) => ({
        url: '/partner/premium-transaction',
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['task'],
    }),
  }),
})

export const {
  useGetIncompletePartnerTaskListQuery,
  useClaimPartnerTaskRewardMutation,
  usePremiumTransactionMutation,
} = PartnerTaskEndpoint
