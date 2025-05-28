import Loader from '@/app/components/dashboard/common/Loader'
import React from 'react'

const LoadingMessages = () => {
  return (
    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
              <Loader/>
            </div>
  )
}

export default LoadingMessages