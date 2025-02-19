const TaskSkeleton = () => {
  return (
    <div className='relative mt-4'>
      <div className='flex items-center gap-20 justify-evenly'>
        <div className='flex items-center gap-10'>
          <div className='skeleton bg-white w-8 h-8 rounded-full shimmer'></div>
          <div className=''>
            <p className='text-sm text-white capitalize font-medium skeleton w-28 h-5 bg-white shimmer'></p>
            <p className='text-xs text-white capitalize bg-opacity-60 mt-2 skeleton w-14 h-3 bg-white shimmer'></p>
          </div>
        </div>

        <div className='w-16 h-6 skeleton bg-white shimmer'></div>
      </div>

      <div className='absolute bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0'></div>
    </div>
  )
}

export default TaskSkeleton
