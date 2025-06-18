import { defaultImage } from '@/app/const'
import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import ReactTimeAgo from 'react-time-ago';

interface MessageProps {
    chat?: any;
  }
  
  const ChatDetails: React.FC<MessageProps> = ({
    chat,
  }) => {

    const timestamp = new Date(chat?.timestamp || 0);

  return (
    <Link
          href="/"
          className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
          key={chat?.id}
        >
          <div className="relative h-14 w-14 rounded-full">
            <Image
            className="h-full w-full object-cover object-center aspect-square rounded-full"
              width={56}
              height={56}
              src={chat?.receiver?.image || defaultImage}
              alt="User"
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                chat?.dot === 6 ? "bg-meta-6" : `bg-meta-${chat?.dot}`
              } `}
            ></span>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h5 className="font-medium text-black dark:text-white">
              {chat?.receiver?.fullName}
              </h5>
              <p>
                <span className="text-sm text-black dark:text-white">
                {chat?.lastMessage}
                </span>
              </p>
                <span className="text-xs w-full">
                    {moment(timestamp).fromNow()}
                {/* <ReactTimeAgo date={new Date(timestamp)} locale="en-US" timeStyle="twitter" /> */}
                </span>
            </div>
            {/* {chat?.textCount !== 0 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-medium text-white">
                  {" "}
                  {chat?.textCount}
                </span>
              </div>
            )} */}
          </div>
        </Link>
  )
}

export default ChatDetails