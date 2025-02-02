import WalletAnimation from '../assets/icon/walletAnimation.gif'
import Ton from '../assets/icon/ton.png'
import Telegram from '../assets/icon/telegram.png'

const Wallet = () => {
  return (
    <div className='bg-cover bg-[#BEDBED] flex flex-col   bg-center h-screen w-full'>
      <div>
        <img src={WalletAnimation} alt='wallet' className='absolute -top-40' />

        <div className='flex flex-col items-center relative top-32'>
          <p className='font-bold text-black text-4xl'>Connect wallet</p>
          <p className='text-2xl mt-3'>You can now connect your wallet!</p>
        </div>
      </div>

      <div className='flex justify-center items-center '>
        <div className='bg-[#D9EEFB] mt-40 w-[95%] py-10 px-1 flex flex-col gap-4 rounded-2xl shadow-2xl shadow-gray-300'>
          <div className='relative bg-white p-6 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <img src={Ton} alt='ton' className=' h-10 w-10' />
            <p className='text-2xl'>TonKeeper</p>
          </div>

          <div className='relative bg-white p-6 w-[80%]  flex gap-4 ml-5 items-center rounded-2xl shadow-lg shadow-gray-500'>
            <img src={Telegram} alt='ton' className=' h-10 w-10' />
            <p className='text-2xl'>TG wallet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
