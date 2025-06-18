
'use client';
import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";

import { SafeUser } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { defaultImage } from "@/app/const";
import axios from "axios";
import Loader from "@/app/components/dashboard/common/Loader";
import LoadingMessages from "./LoadingMessages";
import NoMessages from "./NoMessages";
import NoChats from "./NoChats";
import useLoginModal from "@/app/hooks/app/useLoginModal";
import ChatBox from "./ChatBox";
import toast from "react-hot-toast";
import { error } from "console";
import { useRouter } from "next/navigation";

const MessagesClient = (props: {
  data: any;
  currentUser?: SafeUser | null;
}) => {

  const {data} = props;
  const headers = ['imageSrc', 'Title', 'Category', 'Owner', 'Price', 'Created'];
  const [chats, setChats] = useState<any>();

  const [activeChatId, setActiveChatId] = useState("");
  const [activeChat, setActiveChat] = useState<any>();
  const [activeReceiver, setActiveReceiver] = useState<any>();
  const [activeMessages, setActiveMessages] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(props.currentUser)
  // New Message Vars
  const [message, setMessage] = useState("");
  const [sendedMessage, setSendedMessage] = useState<any>();
  const [isError, setIsError] = useState(false);
  const loginModal = useLoginModal();

  const router = useRouter();


  useEffect(() => {
    if(data){
      let orderedChats = data;
      orderedChats.sort((a:any,b:any) => b.timestamp - a.timestamp);
      setChats(orderedChats);
    }    
  }, [data]);
  

  useEffect(() => {
    if (chats?.length > 0) {
      const chat = chats[0];
      handleActiveChat(chat);
    }
    
  }, [chats])
  
  
  // useEffect(() => {
  //   //  console.log(activeChat);
  //   //  console.log(activeReceiver);
  //   // console.log(activeChatId);
  //   handleGetChat(activeChatId);
  // }, [activeChatId])
  
  const handleActiveChat=(chat:any)=>{
  
    const chatId = chat.id;
    const receiver = chat.receiver;
    
    setActiveChatId(chatId);
    setActiveReceiver(receiver);
    handleGetChat(chatId);
   

  }


  const handleGetChat = useCallback((chatId:any) => {
   // console.log(chatId)
    if(!chatId){return}
    
    //setLoading(true);
    axios.get(`/api/dashboard/chat/${chatId}`)
  .then(function (response) {
    const messages = response?.data;


   setActiveMessages(messages);
   //console.log(messages);
    // manejar respuesta exitosa
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
  .finally(function () {
    // siempre sera executado
    setLoading(false);

  });
  },
  []);


  const handleSendMessage =  useCallback((data:any) => {
    setIsError(false);
    if (!currentUser) {
      return loginModal.onOpen();
    }

    if(data.length < 2 ){
      setIsError(true);
      return;
    }

    setLoading(true);
    
   
    axios.post('/api/messages', {
      content: data,
      // listingId: listing?.id,
      receiverId: activeReceiver?.id,
      senderId: currentUser.id
    })
    .then((response) => {
      const responseData = response.data;
      const status = responseData?.status;
      const sendedMessage = responseData?.message;
      if(status === "ok"){
        setSendedMessage(sendedMessage)
      }
      toast.success('Message sended!!!');
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setLoading(false);
      router.refresh();
    })
},
[
  activeReceiver,
  currentUser,
  router
]);


const updateMessageList = (message:any[]) =>{
  let newList:any[] = activeMessages;
  if(message){
    newList?.push(message);
    setActiveMessages(newList);
  }
}

useEffect(() => {
  updateMessageList(sendedMessage);
  sendNotification(sendedMessage);
  
}, [sendedMessage])


const sendNotification = async(sendedMessage:any) =>{
  if(!activeReceiver){
    return;
  }
      axios.post(`/api/notifications`, {
        type:'message',
        recipientId:activeReceiver?.id,
        senderId: currentUser?.id,
        message: sendedMessage?.content,
      })
}

  
  if(!chats){
    return(
     <>
      <Breadcrumb pageName="Messages" />
      <NoMessages/>
     </>
    )
   }

  
  return (
    < >
      <Breadcrumb pageName="Messages" />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="
          h-full 
          rounded-sm 
          border 
          dark:border-strokedark 
          border-stroke 
          bg-white 
          dark:bg-gray-800 
          xl:flex
          ">
          <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            {/* <!-- ====== Chat List Start --> */}
            <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                Active Conversations
                <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">{chats?.length}</span>
              </h3>
            </div>
            <div className="flex max-h-full flex-col overflow-auto p-5">
              <form className="sticky mb-7">
                <input type="text" className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2" placeholder="Search..." />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z" fill="#637381"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z" fill="#637381"></path>
                  </svg>
                </button>
              </form>
              <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
              {
              chats.map((chat: any, key: number) => (
                  <div 
                    key={key}
                    onClick={()=>{handleActiveChat(chat)}} 
                    className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark">
                    <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                      <img src={chat?.receiver?.image || defaultImage} alt="profile" className="h-full w-full object-cover object-center aspect-square rounded-full" />
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                    </div>
                    <div className="w-full">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {chat.receiver?.fullName}
                      </h5>
                      <p className="text-sm font-medium">
                      {chat?.lastMessage}
                      {/* {chat.messages && chat.messages[0]?.content}  */}
                      </p>
                    </div>
                  </div>
                ))

                }
       
              </div>
            </div>
            {/* <!-- ====== Chat List End --> */}
          </div>
          

         {
          loading ?  <LoadingMessages/> : (activeChatId != "" && 
              <ChatBox
                currentUser={currentUser}
                activeMessages={activeMessages}
                activeReceiver={activeReceiver}
                handleSendMessage={handleSendMessage}
                message={message}
                error={isError}
                />) 
          }
         </div>

        
      </div>
    </>
  )

}

export default MessagesClient