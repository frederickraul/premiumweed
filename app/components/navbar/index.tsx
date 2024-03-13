'use client';

import { User} from '@prisma/client'
import Container from  '../Container';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types';
import { IoIosPin } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Notificacion from '../notification';
import { useCallback, useEffect, useState } from 'react';
import Messages from '../messages';
import axios from 'axios';

interface NavbarProps {
    currentUser?: SafeUser | null
    notifications?: any;
}
const Navbar: React.FC<NavbarProps> = ({currentUser, notifications}) => {
  
    const router = useRouter();
   
  const [lastNotification, setLastNotification] = useState(notifications[0]?.id);
  const [mute, setMute] = useState(false);
  const [currentNotifications, setCurrentNotifications] = useState<any[]>([])
  const [currentMessages, setCurrentMessages] = useState<any[]>([])



  useEffect(() => {
    const messages = notifications.filter((message:any) => message.type.includes("message"));
    const filteresNotifications = notifications.filter((message:any) => message.type != "message");
    setCurrentNotifications(filteresNotifications);
    setCurrentMessages(messages);
    //setFilteredUsers(filtered);
    //console.log(notifications);
  }, [notifications]);

  const playSound = () => {
    //const audio = new Audio('/sounds/attention-bell.wav');
    const audio = new Audio('/sounds/correct-2-46134.mp3');
    audio.addEventListener('canplaythrough', (event) => {
      // the audio is now playable; play it if permissions allow
      audio.play();
    });
  };

  
  useEffect(() => {
    // console.log("last: " + lastNotification);
    // console.log("noti: " + currentN);
    // console.log("message: " + currentMessages[0]?.id);
    if (lastNotification != currentMessages[0]?.id && lastNotification !== currentMessages[0]?.id ) {
      if (!mute) {
        //console.log('Play');
        playSound();
      }

      router.refresh();
    }else{
      //console.log('Evething is the same');
    }
  }, [lastNotification]);
  



  useEffect(() => {
    const interval = setInterval(() => {
      checkNotificationUpdate();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  
  const checkNotificationUpdate = useCallback(() => {
    if (!currentUser) {
      return;
    }
    //Check if there is changes on the notifications
    axios.get('/api/notifications/recipient/' + lastNotification)
      .then((response) => {
        const data = response?.data;
        // console.log("Response: " + data?.lastNotificationId);
        // console.log("LastSaved: " + lastNotification);
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


    const handleDeleteNotification = useCallback(() => {
      if (!currentUser) {
        return;
      }
      //Check if there is changes on the notifications
      axios.get('/api/notifications/recipient/' + lastNotification)
        .then((response) => {
          const data = response?.data;
          // console.log("Response: " + data?.lastNotificationId);
          // console.log("LastSaved: " + lastNotification);
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
  



  return (
    <div className='fixed w-full bg-white z-10 '>
    <div className=' w-full bg-white shadow-sm '>
        <div 
            className='
            py-4
            border-b-[1px]'>
            <Container>
                <div
                    className='
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3   
                    md:gap-0
                        '>
                    <div className='flex flex-row items-center justify-around'>
                    <Logo/>
                    <div className='hidden md:flex items-center'><Search/></div>
                     <div className='flex flex-row ml-4 md:ml-2'>
                        <IoIosPin size={14}/>
                        <div className='font-bold text-xs'>
                            San Diego: 50 Miles
                        </div>
                    </div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <UserMenu currentUser={currentUser}/>
                        <div className='flex ml-2'>
                            <Messages currentUser={currentUser} notifications={currentMessages}/>
                            <Notificacion currentUser={currentUser} notifications={currentNotifications}/>
                        </div>
                    </div>
             

                </div>
                <div className='md:hidden flex items-center justify-center'>
                    <Search/>
                </div>
                <Categories/>
            </Container>
        </div>
    </div>
    </div>
  )
}

export default Navbar