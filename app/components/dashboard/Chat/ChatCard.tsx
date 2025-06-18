'use client'
import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/app/types/dashboard/types/chat";
import { useEffect, useState } from "react";
import { defaultImage } from "@/app/const";
import ReactTimeAgo from "react-time-ago";
import ChatDetails from "./ChatDetails";
import { useRouter } from "next/navigation";

const chatDataX: Chat[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: "/images/user/user-01.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/images/user/user-03.png",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

const ChatCard = (props:{chats:any}) => {
  const {chats} = props;

  const router = useRouter();

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div>
        {chats?.map((chat:any, key:any) => (
          <div key={key} onClick={()=>{router.push('/dashboard/messages')}}>
          <ChatDetails chat={chat}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
