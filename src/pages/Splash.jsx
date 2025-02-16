import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useNewUserMutation } from '../redux/api/UserEndPoint'
import { useNavigate } from 'react-router-dom'

const Splash = () => {
  const [triggerNewAccount, { data, isLoading, isSuccess, status }] = useNewUserMutation()
  const navigate = useNavigate()
  WebApp.setHeaderColor('#000')

  if (data?.data?.token) {
    sessionStorage.setItem('token', data?.data?.token)
  }

  if (data?.data?.token) {
    sessionStorage.setItem('token', data?.data?.token)
  }

  useEffect(() => {
    const Payload = {
      Name: WebApp.initDataUnsafe.user?.first_name + ' ' + WebApp.initDataUnsafe.user?.last_name,
      Username: WebApp.initDataUnsafe.user?.username || `guest_${WebApp.initDataUnsafe.user?.id}`,
      TgId: WebApp.initDataUnsafe.user?.id,
      TelegramPremiumUser: WebApp.initDataUnsafe.user?.is_premium || false,
      role: 'user',
      referBy: WebApp.initDataUnsafe.start_param,
      init: WebApp.initData,
    }

    // Trigger account creation only once on mount
    triggerNewAccount(Payload)
  }, [])

  useEffect(() => {
    if (data?.data?.token) {
      sessionStorage.setItem('token', data.data.token)

      const token = sessionStorage.getItem('token')
      console.log('dataaa', data)

      if (!isLoading && token && isSuccess) {
        if (data?.data?.user?.NewComer) {
          navigate('/new-comer', { replace: true })
        } else {
          navigate('/mine', { replace: true })
        }
      }
    }
  }, [status])

  return (
    <div className='bg-blue-400 min-h-screen flex justify-center items-center'>
      <h1 className='text-3xl'>okk.</h1>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  )
}

export default Splash
