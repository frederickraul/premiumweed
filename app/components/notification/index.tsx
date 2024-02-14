'use client';

import React, { useCallback, useEffect, useRef,useState } from 'react'
import NotificationButton from './NotificationButton'
import useNotification from '@/app/hooks/useNotifications';
import { formatDate } from '@/app/const/hours';
import useSound from 'use-sound';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'
import Message from './Message';
import axios from 'axios';
import Button from '../Button';
import { useRouter } from 'next/navigation';


interface NotificationProps {
  currentUser?: any | null;
  notifications?: any;
}

const Notificacion: React.FC<NotificationProps> = ({
  currentUser,
  notifications
}) => {
  
  const router = useRouter();
    
     
    const [isListOpen, setIsListOpen] = useState(false);
    const [count, setcount] = useState(notifications?.length);
    const [currentNotifications, setCurrentNotifications] = useState(notifications);
    const [lastNotification, setLastNotification] = useState(notifications[0]?.id);
    const [mute, setMute] = useState(false);

    const playSound = () => {
      //const audio = new Audio('/sounds/attention-bell.wav');
      const audio = new Audio('/sounds/correct-2-46134.mp3');
      audio.addEventListener('canplaythrough', (event) => {
        // the audio is now playable; play it if permissions allow
        audio.play();
      });
    };

    
    useEffect(() => {
     setcount(notifications?.length);
     setCurrentNotifications(notifications);
    }, [notifications]);

    useEffect(() => {

      setLastNotification(currentNotifications[0]?.id);

      if(lastNotification !== currentNotifications[0]?.id){
           if(!mute){
              console.log('Play');
              playSound();
            } 

          router.refresh();   

      }
    }, [currentNotifications, lastNotification]);
    


    useEffect(() => {
        const interval = setInterval(() => {
           checkNotificationUpdate();
        }, 5000);
        return () => clearInterval(interval);
      }, []);

   
    

    const checkNotificationUpdate =  useCallback(() => {
      if (!currentUser) {
        return;
      }

      const currentLastNotificacion = lastNotification || 0;

      //Check if there is changes on the notifications
      axios.get('/api/notifications/recipient/'+currentLastNotificacion)
      .then((response) => {
          const data = response?.data;  
          //console.log("Response: " + data?.lastNotificationId);
          setLastNotification(data?.lastNotificationId); 
          return;
        })
        .catch(() => {
          //toast.error('Something went wrong.');
        })
        .finally(() => {
          
          //setIsLoading(false);
        })
    },
    [
      //listing?.id,
      currentUser,
    ]);
    
    const dropdown = useRef<HTMLInputElement>(null);

        useEffect(() => {
 
            window.addEventListener("mousedown", handleOutSideClick);
            
           
        }, [dropdown]);

        const handleOutSideClick = (event: any) => {
            setMute(false);
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

                    {currentNotifications?.map((notification:any) => (
                        <Message currentUser={currentUser} key={notification.id} notification={notification} onClick={toggleList} />

                    ))}
        
                </div>
                <div onClick={()=>{router.push('/notifications')}} className="block bg-gray-800 text-white text-center font-bold py-2 cursor-pointer"> See all notifications</div>
            </div>
        </div>
</div >
    </div >
  
        </div>
    
        )
}

export default Notificacion