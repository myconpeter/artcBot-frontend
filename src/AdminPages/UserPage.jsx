import { MdDelete } from 'react-icons/md'

const UserPage = () => {
  const data = [
    { id: 1, name: 'John Doe', username: 'johndoe', points: 120 },
    { id: 2, name: 'Jane Smith', username: 'janesmith', points: 200 },
    { id: 3, name: 'Mike Johnson', username: 'mikej', points: 95 },
  ]
  return (
    <div className=''>
      <h1 className='text-2xl text-center'>All Users</h1>

      <div className='overflow-x-auto'>
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
    </div>
  )
}

export default UserPage
