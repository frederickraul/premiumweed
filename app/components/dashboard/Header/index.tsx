'use client'
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import Logo from "../../app/navbar/Logo";
import { SafeUser } from "@/app/types";
import { adminAuthDashboards } from "@/app/const/permissions";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdInformationCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import SearchForm from "./Search/SearchForm";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  currentUser?: SafeUser | null;
  notifications?: any;
  reloadPage?:any;

}) => {
  const {currentUser, notifications, sidebarOpen, setSidebarOpen, reloadPage} = props;
  const [notifying, setNotifying] = useState(true);
  
  const userRole = currentUser?.role || "";
  let counter = 1;
  
  const router = useRouter();
  const [lastNotificationToken, setLastNotificationToken] = useState("");
  const [currentNotifications, setCurrentNotifications] = useState([]);
  
  useEffect(() => {
    if(!currentUser){
      return;
    }

    if(notifications?.length < 1){
      setCurrentNotifications([]);
      // setCurrentMessages([]);
      return;
    }

    const filteresNotifications = notifications;
    
    // setCurrentNotifications(filteresNotifications);
    // // setCurrentMessages(messages);
    // // if(notifications.length > 0){
    // //   console.log('Play');
    // //   playSound();
    // // }
    // //setFilteredUsers(filtered);
    // //console.log(notifications);
    
  }, [notifications]);



  useEffect(() => {
    if (!currentUser) {
      return;
    }
    //     if(currentNotifications.length > 0){
    //        console.log('Play');
           
    //       playSound();
    //     }
      
    //   console.log('Refreshing...');
    //  // setMute(true);s
     router.refresh();
      // reloadPage();
     
    
  }, [lastNotificationToken]);

// NOTIFICATION CHECK
  useEffect(() => {
    //console.clear();
    if (!currentUser) {
      return;
    }

    const interval = setInterval(() => {
      //  console.log('Wait: '+ 5*counter + ' sec.');
      counter++;
      checkNotificationUpdate();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);


// NOTIFICATION UPDATE FUNCTION
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
            console.log('token change');
            sessionStorage.setItem('notificationsToken', token);
            setLastNotificationToken(token);
            setNotifying(true);
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

    

  return (
    <header className="
    sticky 
    top-0 
    z-999 
    flex w-full 
    bg-white 
    drop-shadow-1 
     dark:drop-shadow-none
      border-gray-200 
      dark:border-gray-800 
      dark:bg-gray-900
       lg:border-b
     ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          {/* <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Logo/>
          </Link> */}
        </div>

       { !adminAuthDashboards.includes(userRole)?
        <div className="w-full"></div>
        :
        <SearchForm/>
      }

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage notifications={notifications} notifying={notifying} setNotifying={setNotifying}/>
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser currentUser={currentUser} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
