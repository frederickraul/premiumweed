'use client'

import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import React from 'react'
import MessagesClient from './MessagesClient';
import { useRouter } from 'next/navigation';

const PageClient = (props:{currentUser:any,notifications:any,chats:any}) => {
    const {currentUser, notifications,chats} = props;
    const router = useRouter();

    const refresh = () =>{
        console.log(refresh);
        router.refresh();
    }
    return (
    
            <MessagesClient data={chats} currentUser={currentUser}/>
      );
}

export default PageClient