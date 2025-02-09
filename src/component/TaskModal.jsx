const TaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-lg w-96'>
        <h3 className='font-bold text-lg'>New Task</h3>

        <form className='mt-4'>
          <label className='block mb-2'>
            <span className='text-gray-700'>Title</span>
            <input type='text' required className='w-full border p-2 rounded' placeholder='Task title...' />
          </label>

          <label className='block mb-2'>
            <span className='text-gray-700'>Points</span>
            <input type='number' required className='w-full border p-2 rounded' placeholder='Points...' />
          </label>

          <div className='flex justify-between mt-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
              Save
            </button>
            <button type='button' onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
