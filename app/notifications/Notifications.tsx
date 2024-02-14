'use client';


import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useEffect, useState } from "react";

import EmptySpace from "../components/EmptySpace";
import { formatDate } from "../const/hours";
import Button from "../components/Button";
import { MdSend } from "react-icons/md";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Message from "../components/notification/Message";
import MessageDetails from "./MessageDetails";

interface NotificatonsProps {
  notifications: any,
  currentUser?: any,
}

const Notifications: React.FC<NotificatonsProps> = ({
  notifications,
  currentUser,
}) => {

  useEffect(() => {
    if(notifications){
      setcurrentNotifications(notifications);
    }    
  }, [notifications]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentNotifications, setcurrentNotifications] = useState([]);
  const router = useRouter();
    useEffect(() => {
      setIsLoading(false);
    }, [notifications]);

// const handleSendAnswer = useCallback((data:any) => {

//   setIsLoading(true);
//   axios.post(`/api/ask/listing/${data?.id}`, data)
//   .then(() => {
//     toast.success('You answer has been sended!!!');
//     axios.post(`/api/notifications/${data?.id}`, data);
//     router.refresh();
//   })
//   .catch(() => {
//     toast.error('Something went wrong.');
//   })
//   .finally(() => {
//     setIsLoading(false);
//   })
// },
// [
// currentQuestions,
// currentUser,
// ]);


  

  return (
    <Container isLoading={isLoading}>
      <Heading
        title="Notification history"
        subtitle="List of all yours notifications!"
      />
      {currentNotifications.length < 1 ?
        <EmptySpace title="There´s not notifications yet." subtitle="" />
      :

      <div className="w-full md:w-2/3 mx-auto p-5 mb-20 bg-white rounded-lg shadow mt-5">
       {currentNotifications?.map((notification:any) => (
                        <MessageDetails 
                          key={notification.id} 
                          notification={notification} 
                          currentUser={currentUser} 
                          onClick={()=>{}}/>

                    ))}
        
      </div>
  }
    </Container>
   );
}
 
export default Notifications;