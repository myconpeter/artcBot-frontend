import { useState } from 'react'
import { useClaimTaskRewardsMutation } from '../../redux/api/TaskEndpoint'
import ReadClaimModal from '../../component/model/ReadClaimModal'
import toast from 'react-hot-toast'

const HandleTaskClaimLogic = ({ item }) => {
  const [isClaim, setClaim] = useState(false)
  const [isProgressForClaim, setProgressForClaim] = useState(false)
  const [isReadClaim, setReadClaim] = useState(false)

  const [triggerClaimRewards] = useClaimTaskRewardsMutation()

  const Claim = async () => {
    setProgressForClaim(true)
    const data = await triggerClaimRewards({ taskId: item?._id })

    setProgressForClaim(false)
    setClaim(false)

    if (['invite', 'boost', 'earn'].includes(item?.category)) {
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
        <button className='text-lg font-semibold  text-blue-400' onClick={Claim}>
          Claim
        </button>
      ) : item?.category !== 'read' ? (
        item?.category === 'invite' ? (
          <button className='text-lg font-semibold text-white' onClick={Claim}>
            Check
          </button>
        ) : item?.category === 'earn' ? (
          <button className='text-lg font-semibold text-white' onClick={Claim}>
            Check Income
          </button>
        ) : (
          <a
            href={item.link}
            className='text-lg font-semibold text-white'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => {
              setProgressForClaim(true)
              setTimeout(() => {
                setProgressForClaim(false)
                setClaim(true)
              }, 10000)
            }}
          >
            Start
          </a>
        )
      ) : (
        <button className='text-lg font-semibold text-white' onClick={() => setReadClaim(true)}>
          Start
        </button>
      )}
    </div>
  )
}

export default HandleTaskClaimLogic
