import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useNewUserMutation } from '../redux/api/UserEndPoint'
import { useNavigate } from 'react-router-dom'
import ArcticBgOne from '../component/background/ArcticBgOne'

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
    WebApp.ready() // Ensure SDK is initialized
    WebApp.expand() // Expand the Mini App view

    // console.log('initDataUnsafe:', WebApp.initDataUnsafe)

    if (!WebApp.initDataUnsafe || !WebApp.initDataUnsafe.user) {
      console.error('Telegram WebApp user data is undefined!')
      return
    }

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
    // console.log('Sending Payload:', Payload)
    triggerNewAccount(Payload)
  }, [])

  useEffect(() => {
    // console.log('Data from API:', data)
    if (data?.data?.token) {
      sessionStorage.setItem('token', data.data.token)

      const token = sessionStorage.getItem('token')
      // console.log('Token:', token)

      if (!isLoading && token && isSuccess) {
        // console.log('Navigating...')
        if (data?.data?.user?.NewComer) {
          navigate('/new-comer', { replace: true })
        } else {
          navigate('/mine', { replace: true })
        }
      }
    }
  }, [data, isSuccess, isLoading, navigate])

  return (
    <div className='relative flex flex-col justify-center items-center h-screen w-full overflow-hidden text-white'>
      <ArcticBgOne />
    </div>
  )
}

export default Splash
