import { useForm } from 'react-hook-form'
import { useClaimTaskRewardsMutation } from '../../redux/api/TaskEndpoint'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const ReadClaimModal = ({ setClaim, readClaim, item }) => {
  const { register, handleSubmit } = useForm()
  const [TriggerTaskRewards, { status, isLoading, data, error }] = useClaimTaskRewardsMutation()

  const HandleUpdateUserInfo = (e) => {
    TriggerTaskRewards({
      ...e,
      taskId: item?._id,
    })
    setClaim(false)
  }

  useEffect(() => {
    let toastId

    if (!isLoading) {
      if (status === 'fulfilled') {
        toast.success(data?.message, { id: toastId })
      } else if (status === 'rejected') {
        if (error?.data) {
          toast.error(error.data?.errorMessage, { id: toastId })
        } else {
          toast.error(error?.message || 'An error occurred', { id: toastId })
        }
      }
    }
  }, [status, isLoading, data, error])

  return (
    <div>
      <dialog id='my_modal_1' className='modal modal-bottom sm:modal-middle' open={readClaim}>
        <div className='modal-box bg-black border-t'>
          <form onSubmit={handleSubmit(HandleUpdateUserInfo)}>
            <h3 className='font-bold text-lg font-tektur text-white'>Claim Rewards!</h3>
            <div className='my-5'>
              <span className='label-text font-tektur text-white'>Context?</span>
              <p className='whitespace-pre-line font-poppins text-xs text-white'>{item?.context}</p>
            </div>
            <div className='my-5'>
              <span className='label-text font-tektur text-white'>Question?</span>
              <p className='text-sm font-ubuntu text-white'>{item?.question}</p>
            </div>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text font-tektur text-white'>Answer*</span>
              </div>
              <textarea
                placeholder='Write the answer...'
                {...register('answer')}
                className='textarea bg-transparent textarea-bordered w-full font-tektur text-white'
              />
            </label>

            <div className='flex justify-between items-center gap-3 mt-3'>
              <button type='submit' className='bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1'>
                Submit
              </button>
              <button
                type='button'
                onClick={() => setClaim(false)}
                className='bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default ReadClaimModal
