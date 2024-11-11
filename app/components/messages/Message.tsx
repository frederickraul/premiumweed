'use client';

import useNotification from '@/app/hooks/useNotifications';
import { SafeUser } from '@/app/types';
import { Badge } from '@mui/material';

import { useRouter } from 'next/navigation';
import React from 'react';
import ReactTimeAgo from 'react-time-ago';

interface MessageProps {
  notification?: any;
  reloadPage?:any;
  currentUser?: SafeUser;
  onClick:()=>void;
}

const Message: React.FC<MessageProps> = ({
  notification,
  currentUser,
  onClick
}) => {
  const notificationId = notification?.itemId

  const route = useRouter();
  const noti = useNotification({notificationId, currentUser});

  const setRead = async() =>{
          // if(notification.type !=="question"){
          //   noti.setRead(notification.id);
          // }
          onClick();
          await noti.setRead(notification.id);
          await route.push(notiLink);
          await timeout(2000); //for 1 sec delay
          
          
          
   
  }

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

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
      case "message":
        notiLink = `/messages/`+notification?.itemId;
        ItemLink =(
          <a className="font-bold text-blue-500" href={notiLink}>
            {notification.itemName}.
          </a>);
        break;
  }
    const formatedDate = new Date(notification?.timestamp)
    console.log("noti: " + formatedDate.toISOString);

  
  return (
    <div 
        key={notification.id} 
        onClick={setRead}
        className="
          flex 
          items-center 
          px-4 
          py-3 
          border-b 
          hover:bg-gray-100 
          -mx-2 
          cursor-pointer">
             
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
      
        <span className='text-neutral-700 ml-1'>
          <ReactTimeAgo date={new Date(notification?.createdAt)} locale="en-US" timeStyle="twitter" />
        </span>
      </p>
      <div className='absolute right-5'>
      {notification?.count > 1 &&
      <Badge badgeContent={notification?.count} color="primary">
      </Badge>
      }
      </div>
    </div>
  )
}

export default Message