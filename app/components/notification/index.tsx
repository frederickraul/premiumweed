'use client';

import React, { useEffect, useRef,useState } from 'react'
import NotificationButton from './NotificationButton'
import useNotification from '@/app/hooks/useNotifications';
import { formatDate } from '@/app/const/hours';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import Message from './Message';

interface NotificationProps {
    currentUser?: any | null;
    notifications?: any;
  }

const Notificacion: React.FC<NotificationProps> = ({
    currentUser,
    notifications
  }) => {

    useEffect(() => {
     setcount(notifications?.length);
    }, [notifications])
    
    const [isListOpen, setIsListOpen] = useState(false);
    const [count, setcount] = useState(notifications?.length);
    
    
    const dropdown = useRef<HTMLInputElement>(null);

        useEffect(() => {
 
            window.addEventListener("mousedown", handleOutSideClick);
            
           
        }, [dropdown]);

        const handleOutSideClick = (event: any) => {
            if (!dropdown.current?.contains(event.target)) {
                setIsListOpen(false);
            }
            };



    //console.log(hasNotifications);
    const toggleList = () => {
        setIsListOpen(!isListOpen);
    }
    return (
        <div className='relative  w-7 h-7'>
            <div className='absolute '>
            <div className="flex justify-center items-center">
                <div  ref={dropdown} x-data="{ dropdownOpen: true }" className="relative">
                   <NotificationButton 
                       
                        count={count} 
                        onClick={toggleList}/>


            <div ref={dropdown} className={`
                    ${isListOpen ? 'absolute' : 'hidden'}
                    right-0 
                    mt-5 
                    bg-white
                    rounded-md 
                    shadow-2xl
                    overflow-hidden 
                    z-20`} 
                    style={{width:'20rem'}}>
                <div className="">
                    {count < 1 &&
                    <div       
                        className="
                        flex
                        items-center
                        justify-center
                            px-4 
                            py-3 
                        hover:bg-gray-100 
                            ">
                               <small> You don't have notifications right now</small></div>
                    }

                    {notifications?.map((notification:any) => (
                        <Message currentUser={currentUser} key={notification.id} notification={notification} onClick={toggleList} />

                    ))}
        
                </div>
                <a href="#" className="block bg-gray-800 text-white text-center font-bold py-2 cursor-pointer"> See all notifications</a>
            </div>
        </div>
</div >
    </div >
  
        </div>
    
        )
}

export default Notificacion