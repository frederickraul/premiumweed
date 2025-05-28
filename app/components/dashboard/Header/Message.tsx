'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Message = (props: { message: any, timeago:any }) => {
  const { message, timeago } = props;
  
  return (
      <li>
        <Link
          className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          href="/dashboard/messages"
        >
          <div className="h-13 w-full max-w-13 overflow-hidden rounded-full">
            <Image
              width={112}
              height={112}
              className='h-full w-full object-cover object-center'
              src={message?.sender?.image}
              alt="User"
             
            />
          </div>

          <div>
            <h6 className="text-sm font-medium text-black dark:text-white">
            {message?.sender?.name}
            </h6>
            <p className="text-sm">{message?.content}</p>
            <span className='text-xs flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400'>
             <span>
              {timeago}
              </span> 
            </span>
          </div>
        </Link>
      </li>
  )
}

export default Message