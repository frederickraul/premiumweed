import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import MessageIcon from  '@/app/components/icons/icon-message.svg';
import { defaultImage } from "@/app/const";
import ReactTimeAgo from "react-time-ago";
import Message from "./Message";
import moment from "moment";


const DropdownMessage = (props:{notifications?:any; notifying:boolean; setNotifying:any}) => {
  
  const {notifications, notifying, setNotifying} = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li className="relative">
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
          href="#"
        >
          <span
            className={`absolute -right-0.5 -top-0.5 z-1 h-4 w-4 rounded-full bg-meta-1 ${
              notifying === false ? "hidden" : "inline"
            }`}
          >
            <span className="absolute top-0 right-1.5 text-xs text-white">
            {notifications?.length}
            </span>
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75">
           

            </span>
          </span>
          
            <MessageIcon height={20} width={20} className="fill-gray-500"/>
         

        </Link>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              {
                notifications?.map((item:any, key:any) => (
                  <Message key={key} message={item} timeago={moment(item.createdAt).fromNow()}/>

              ))
              }
            </ul>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </li>
    </ClickOutside>
  );
};

export default DropdownMessage;
