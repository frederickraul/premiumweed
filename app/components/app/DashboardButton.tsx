'use client';

import React from 'react'
import FloatingButton from './FloatingButton'
import { AiFillDashboard } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import { SafeUser } from '../../types';

interface Props {
    currentUser?: SafeUser | null
    session?:any;
}
const DashboardButton: React.FC<Props> = ({currentUser, session}) => {
    const router = useRouter();
    if(!currentUser){
        return;
      }
  return (
    <div className=''>
               <FloatingButton 
               color='bg-black' 
               small 
               icon={AiFillDashboard} 
               label='Dashboard' 
               onClick={()=>{router.push('/dashboard')}}/>

    </div>
  )
}

export default DashboardButton