import Avatar from '@/app/components/app/Avatar'
import { defaultImage } from '@/app/const'
import { week } from '@/app/const/week'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Badge from '../../Text/Badge'

const SearchList = (props: { foundedElements: any }) => {
  const { foundedElements } = props;
  const [elements, setElements] = useState<any>();

  const route = useRouter();

  useEffect(() => {
    if (foundedElements) {
      setElements(foundedElements);
    }
  }, [foundedElements])

  if (!elements) {
    return
  }

  return (
    <div className='
      w-full 
      rounded-md
      font-medium 
      
      relative
'>
      <div className='absolute 
      overflow-auto 
      max-h-54 
      bg-white dark:bg-black w-full shadow-lg dark:shadow-gray-900'>

        {elements?.map((item: any, key: number) => (

          <div key={key} className='cursor-pointer item p-4 flex flex-row items-center relative border-b dark:border-gray-800 ' 
              onClick={()=>{route.push('/dashboard/'+item?.url)}}>
            <div className='h-8 w-8'>
              <Avatar src={item.photo || defaultImage} />
            </div>
            <div className='flex flex-col ml-2'>
              <span className=''>{item?.title}</span>
              <span className='text-xs text-gray-500'>{item?.subtitle}</span>
            </div>
            <div className='absolute right-2 top-2'>
              <Badge text={item?.type}/>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SearchList