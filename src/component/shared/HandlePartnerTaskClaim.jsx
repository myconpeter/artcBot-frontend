import { useState } from 'react'
import { useClaimPartnerTaskRewardMutation } from '../../redux/api/PartnerTaskEndpoint'
import ReadClaimModal from '../../component/model/ReadClaimModal'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const HandlePartnerTaskClaim = ({ item }) => {
  const navigate = useNavigate()
  const [isClaim, setClaim] = useState(false)
  const [isProgressForClaim, setProgressForClaim] = useState(false)
  //   const [isReadClaim, setReadClaim] = useState(false)

  const [triggerClaimRewards] = useClaimPartnerTaskRewardMutation()

  const Claim = async () => {
    setProgressForClaim(true)
    const data = await triggerClaimRewards({ taskId: item?._id })

    setProgressForClaim(false)
    setClaim(false)

    if (['connect', 'transaction'].includes(item?.category)) {
      if (data?.error?.data?.status === 400) {
        toast.error(data?.error?.data?.errorMessage)
      }
    }
  }

  //   window.Telegram.WebApp.showAlert(item.category)

  return (
    <div className=''>
      {/* <ReadClaimModal readClaim={isReadClaim} setClaim={setReadClaim} item={item} /> */}
      {isProgressForClaim ? (
        <div className='h-5 w-5 border-4 border-white border-dashed rounded-full animate-spin'></div>
      ) : isClaim ? (
        <button className='text-sm font-semibold  text-white' onClick={Claim}>
          Claim
        </button>
      ) : item?.category === 'connect' ? (
        <button onClick={Claim} className='text-sm font-semibold text-black'>
          Check
        </button>
      ) : (
        <button className='text-sm font-semibold text-black' onClick={() => setReadClaim(true)}>
          Connect
        </button>
      )}
    </div>
  )
}

export default HandlePartnerTaskClaim
