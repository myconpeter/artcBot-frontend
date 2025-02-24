import { usePointTrackingQuery } from '../redux/api/ExtraTaskEndpoint'
// import AirdropSheed from '../components/ui/wallet-connect/AirdropSheed'
import ConnectWallet from '../component/ui/wallet-connect/ConnectWallet'
import ArcticBgTwo from '../component/background/ArcticBgTwo'

const Wallet = () => {
  const { data } = usePointTrackingQuery(undefined)
  return (
    <div className='relative flex flex-col  h-screen w-screen overflow-hidden text-white'>
      <ArcticBgTwo />
      <ConnectWallet />
      {/* <AirdropSheed data={data?.data} /> */}
    </div>
  )
}

export default Wallet
