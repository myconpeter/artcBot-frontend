import { useTonConnectUI } from '@tonconnect/ui-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { usePremiumTransactionMutation } from '../../redux/api/PartnerTaskEndpoint'

const HandleWalletPayment = ({ item }) => {
  const [tonConnectUI] = useTonConnectUI() // Hook to interact with TonConnect UI
  const navigate = useNavigate()
  const [performTransaction] = usePremiumTransactionMutation()

  const sendTransaction = async () => {
    try {
      if (!tonConnectUI.account) {
        toast.error('Please connect your wallet first!')
        navigate('/wallet', { replace: true })

        // console.log('Oga connect account')
        return
      }

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes expiration
        messages: [
          {
            address: item.address, // Change to the recipient's TON address
            amount: item.amount, // Amount in nanoTON (1 TON = 1,000,000,000 nanoTON)
          },
        ],
      }

      const response = await tonConnectUI.sendTransaction(transaction)

      console.log('Transaction sent:', response)
      await performTransaction({
        boc: response.boc,
        transactionId: response.transactionId,
        taskId: item._id,
      })

      toast.success('Transaction sent successfully!')
    } catch (error) {
      console.error('Transaction failed:', error)
      toast.error('Transaction failed. Please try again.')
    }
  }

  return (
    <div>
      <button className='text-sm font-semibold text-black' onClick={sendTransaction}>
        Send
      </button>
    </div>
  )
}

export default HandleWalletPayment
