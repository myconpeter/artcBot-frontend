import { MdDelete } from 'react-icons/md'
import TaskModal from '../component/TaskModal'
import { useState } from 'react'

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const data = [
    { id: 1, name: 'John Doe', username: 'john doe', points: 120 },
    { id: 2, name: 'Jane Smith', username: 'jane smith', points: 200 },
    { id: 3, name: 'Mike Johnson', username: 'mike j', points: 95 },
  ]
  return (
    <div className=''>
      <div className='flex items-center justify-around'>
        <h1 className='text-2xl text-center'>All Tasks</h1>
        <button className='bg-blue-500 p-2 rounded-2xl text-white font-bold mt-1' onClick={() => setIsModalOpen(true)}>
          Add New Task
        </button>
      </div>

      <div className='overflow-x-auto mt-5'>
        <table className='w-screen border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-blue-500 text-white'>
              <th className='border border-gray-300 px-4 py-2'>ID</th>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Username</th>
              <th className='border border-gray-300 px-4 py-2'>Points</th>
              <th className='border border-gray-300 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className='border border-gray-300 px-4 py-2'>{user.id}</td>
                <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
                <td className='border border-gray-300 px-4 py-2'>{user.username}</td>
                <td className='border border-gray-300 px-4 py-2'>{user.points}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Include the TaskModal Component */}
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default TaskPage
