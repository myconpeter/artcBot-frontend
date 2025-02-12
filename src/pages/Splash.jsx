import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useNewUserMutation } from '../redux/api/UserEndPoint'
import { useNavigate } from 'react-router-dom'

const Splash = () => {
  const [triggerNewAccount, { data, isLoading, isSuccess }] = useNewUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    const existingToken = sessionStorage.getItem('token')
    console.log(`User Token on Load: ${existingToken}`) // ✅ Debugging

    if (!existingToken) {
      const Payload = {
        Name: WebApp.initDataUnsafe.user?.first_name + ' ' + WebApp.initDataUnsafe.user?.last_name,
        Username: WebApp.initDataUnsafe.user?.username,
        TgId: WebApp.initDataUnsafe.user?.id,
        role: 'user',
        referBy: WebApp.initDataUnsafe.start_param,
        init: WebApp.initData,
      }

      console.log('New user detected, creating account:', Payload)
      triggerNewAccount(Payload) // ✅ Trigger new account creation
    } else {
      console.log('Existing user, navigating to /mine')
      navigate('/mine', { replace: true }) // ✅ Navigate immediately if token exists
    }
  }, []) // ✅ Runs only on mount

  useEffect(() => {
    if (isSuccess && data?.data?.token) {
      console.log('API Response Data:', data) // ✅ Debugging API response

      // ✅ Save the token first
      sessionStorage.setItem('token', data.data.token)
      console.log(`Token Stored: ${data.data.token}`)

      // ✅ Force page to wait before reloading
      setTimeout(() => {
        if (data?.data?.user?.NewComer) {
          console.log('Redirecting to /new-comer') // ✅ Debugging navigation
          navigate('/new-comer', { replace: true })
        } else {
          console.log('Redirecting to /mine') // ✅ Debugging navigation
          navigate('/mine', { replace: true })
        }

        // ✅ Force reload after navigation
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }, 500) // Short delay before navigating
    }
  }, [isSuccess, data]) // ✅ Runs when API response is received

  return (
    <div className='bg-blue-400 min-h-screen flex justify-center items-center'>
      <h1 className='text-3xl'>Loading...</h1>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  )
}

export default Splash
