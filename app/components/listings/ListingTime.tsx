import { isOpen } from '@/app/const/hours';
import { Horary } from '@prisma/client';
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai';

var d=new Date();
const currentDayNumber = d.getDay();

const dayOfWeekAsString = (dayIndex:number) => {
  return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
}

interface ListingHoraryProps {
  horary:any,

}

const OperationStatus:React.FC<ListingHoraryProps> = (
  horary
) => {
  let STATUS="Soon";
  let STATUSCOLOR ="text-black";
  const today = dayOfWeekAsString(currentDayNumber);
    horary.horary.filter((item:any)=>{
      if(today === item.day){
          if(item.fulltime){
            STATUS = "Open Now";
            STATUSCOLOR = `text-green-700`;
            return
          } 
          if(item.closed){
            STATUS = "Close Now";
            STATUSCOLOR = `text-red-500`;
            return
          }
          STATUSCOLOR = `text-neutral-500`;
          STATUS = isOpen(item.open, item.close) || 'Soon';
          
          if(STATUS === "Close Soon") STATUSCOLOR = `text-yellow-500`;
          if(STATUS === "Open Soon") STATUSCOLOR = `text-blue-500`;
          if(STATUS === "Open Now") STATUSCOLOR = `text-green-700`;
          if(STATUS === "Close Now") STATUSCOLOR = `text-red-500`;
      }
    })
  
  return (
    <div>
      <div className={`font-bold flex flex-row items-center ${STATUSCOLOR}`}>
            <AiOutlineClockCircle size={12}/> <span className='ml-1 text-sm'>{STATUS}</span>
      </div>
      
    </div>
    
  )
}

export default OperationStatus;