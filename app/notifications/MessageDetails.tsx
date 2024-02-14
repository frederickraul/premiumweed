'use client';

import useNotification from '@/app/hooks/useNotifications';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdMailOpen } from 'react-icons/io';
import { MdOutlineMailOutline, MdOutlineMarkAsUnread, MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';

interface MessageProps {
  notification?: any;
  currentUser?: SafeUser;
  onClick:()=>void;
}

const MessageDetails: React.FC<MessageProps> = ({
  notification,
  currentUser,
  onClick
}) => {
  const notificationId = notification?.itemId

  const route = useRouter();
  const noti = useNotification({notificationId, currentUser});

  let notiLink = "#";
  let ItemLink = (<a className="font-bold text-blue-500" href={`/listings`}></a>);

  switch(notification.type){
    case "question":
      ItemLink=(<b>.</b>);
      notiLink="/customersQA";
      break;
    case "answer":
      notiLink = `/myQA`;
      ItemLink =(
        <a className="font-bold text-blue-500" href={`/myQA/`}>
          {notification.itemName}.
        </a>);
      break;
    case "favoriteListing":
      notiLink = `/listings/`+notification.itemId;
      ItemLink =(
        <a className="font-bold text-blue-500" href={`/listings/`+notification.itemId}>
          {notification.itemName}.
        </a>);
      break;
    case "favoriteProduct":
      notiLink = `/listings/`+notification?.item2Id+'/menu/'+notification.itemId;
      ItemLink =(
        <a className="font-bold text-blue-500" href={notiLink}>
          {notification.itemName}.
        </a>);
      break;
  }

  
  return (
    <div 
        key={notification.id} 
        onClick={()=>{
          if(notification.status == 0){
            if(notification.type !=="question"){
              noti.setRead(notification.id);
            }
            route.push(notiLink)
          }
         
        }}
        className="
          flex 
          items-center 
          justify-between
          px-4 
          py-3 
          border-b 
          hover:bg-gray-100 
          -mx-2 
          cursor-pointer">
        <div className='flex'>
          <div className='flex items-center justify-center mr-2'>
            {notification.status == 1 ?
            <MdOutlineMarkEmailRead className='text-green-600' size={25}/>
          :
          <MdOutlineMarkEmailUnread className='text-orange-400' size={25}/>}
          </div>
            <img 
            className="
              h-8 
              w-8 
              rounded-full 
              object-cover 
              mx-1" 
              src={notification?.sender?.image ? notification?.sender.image : "/images/placeholder.jpg"} 
              alt="avatar" />
          <p className="text-gray-600 text-sm mx-2">
            <a className="font-bold" href="#">{notification?.sender?.name} </a>  
              {notification?.content} 
              {ItemLink}
          
          </p>
        </div>
        <span className='text-neutral-700 ml-1'>
          <ReactTimeAgo date={new Date(notification?.createdAt)} locale="en-US" timeStyle="twitter" />
        </span>
    </div>
  )
}

export default MessageDetails