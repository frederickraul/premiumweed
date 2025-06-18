'use client';

import Container from  '../Container';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types';
import { IoIosPin, IoMdInformationCircle } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Notificacion from '../notification';
import { useCallback, useEffect, useState } from 'react';
import Messages from '../messages';
import axios from 'axios';
import toast from 'react-hot-toast';

const lightLogo = '/images/logo-black-text.png';
const darkLogo = '/images/logo-white-text.png';
const smallLogo = '/images/logo.png';
const favicon = '/images/logo/favicon.ico';

interface NavbarProps {
    currentUser?: SafeUser | null
    session?:any;
    notifications?: any;
    logos?:any;
    device?:string;
}
const Navbar: React.FC<NavbarProps> = ({currentUser, notifications, session, logos,device}) => {

  const currentLogos = { 
    lightLogo: logos? logos[0] : lightLogo, 
    darkLogo: logos ? logos[1] : darkLogo, 
    smallLogo: logos? logos[2] : smallLogo,
    favicon:logos? logos[3] : favicon};


  const router = useRouter();
  let counter = 1;
  const [lastNotificationToken, setLastNotificationToken] = useState("");
  const [mute, setMute] = useState(true);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  //Filtered Notifications != Type message
  const [currentNotifications, setCurrentNotifications] = useState<any[]>([]);
  // Filteres Notifications Type message
  // const [currentMessages, setCurrentMessages] = useState<any[]>([]);

  useEffect(() => {
    const currentTimestamp = localStorage.getItem('visiteTime');
    if(currentTimestamp){
      const timestamp = parseInt(currentTimestamp);
       if(!compareDate(timestamp)){
          console.log("New Visited ");
          onRegisterVisitor({deviceType: device});
       }else{
          console.log("Allready Visited");
       }
    }else{
      console.log("New Record ");
      // var object = {value: "value", timestamp: new Date().getTime()}
      const newDate = new Date().getTime();
      localStorage.setItem("visiteTime", JSON.stringify(newDate));
      onRegisterVisitor({deviceType: device});
    }
  }, []);

  const compareDate = (timestamp:any) =>{
    const now = new Date();
    const timestampDate = new Date(timestamp);

    return (
      timestampDate.getDate() === now.getDate() &&
      timestampDate.getMonth() === now.getMonth() &&
      timestampDate.getFullYear() === now.getFullYear()
    );
}

const onRegisterVisitor = useCallback(async (data:any) => {
   
    // setIsLoading(true);
    try {
      const response = await fetch('/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      router.refresh();


    } catch (error: any) {
      toast.error(error.message || 'Failed to update the bussines logo information.');
    } finally {
      // setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    if(!currentUser){
      return;
    }

    if(notifications.length < 1){
      setCurrentNotifications([]);
      // setCurrentMessages([]);
      return;
    }

    const messages = notifications.filter((message:any) => message.type.includes("message"));
    const filteresNotifications = notifications.filter((message:any) => message.type != "message");
    
    setAllNotifications(notifications);
    setCurrentNotifications(filteresNotifications);
    // setCurrentMessages(messages);
    // if(notifications.length > 0){
    //   console.log('Play');
    //   playSound();
    // }
    //setFilteredUsers(filtered);
    //console.log(notifications);
    
  }, [notifications]);

  const playSound = () => {
    const audio = new Audio('/sounds/attention-bell.wav');
    audio.play();  
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }
        if(currentNotifications.length > 0){
           console.log('Play');
           
          playSound();
        }
      
      console.log('Refreshing...');
     // setMute(true);
      reloadPage();
     
    
  }, [lastNotificationToken]);
  

  const reloadPage = () =>{
    router.refresh();
  }

 const updateNotificationToken = async() =>{
  const response = await fetch('/api/notifications/update-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId:session?.user.id,token:session?.user.token}),
  });
 }

  useEffect(() => {
    //console.clear();
    if (!currentUser) {
      return;
    }

    const interval = setInterval(() => {
      // console.log('Wait: '+ 5*counter + ' sec.');
      counter++;
      checkNotificationUpdate();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  
  const checkNotificationUpdate = useCallback(() => {
    if (!currentUser) {
      return;
    }

    //Check if there is changes on the notifications
    axios.get(`/api/notifications/recipient`)
      .then((response) => {
        const data = response?.data;
        const token = data?.token;       
        if (sessionStorage.getItem('notificationsToken')) {
          const value = (sessionStorage.getItem('notificationsToken'));
          if(value != token){
            sessionStorage.setItem('notificationsToken', token);
            setLastNotificationToken(token);
            //setMute(false);
           
            toast.success('You have new messages', {
              duration: 4000,
              position: 'top-center',
              icon: <IoMdInformationCircle color='#008ecc' size={18}/>,

    
              // Change colors of success/error/loading icon
              iconTheme: {
                primary: '#008ecc',
                secondary: '#0BDA51',
              },
            });
          }
          return
        }
        //If not Exist NotificationToken
        sessionStorage.setItem('notificationsToken', token);
        setLastNotificationToken(token);
        //setMute(false);
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
      axios.get('/api/notifications/recipient/' + lastNotificationToken)
        .then((response) => {
          const data = response?.data;
          // console.log("Response: " + data?.lastNotificationId);
          // console.log("LastSaved: " + lastNotification);
          setLastNotificationToken("");
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
                    <Logo logo={currentLogos?.smallLogo}/>
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
                            {/* <Messages currentUser={currentUser} notifications={currentMessages} reloadPage={reloadPage}/> */}
                            <Notificacion currentUser={currentUser} notifications={currentNotifications} />
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