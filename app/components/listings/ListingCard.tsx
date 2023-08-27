'use client'
import useCountries from '@/app/hooks/useCountries';
import {Listing, Reservation, User } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { Rating } from '@mui/material';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { SafeUser } from '@/app/types';
import DoubleButton from '../DoubleButton';
import ConfirmModal from '../modals/ConfirmModal';

interface ListingCardProps{
  data: Listing;
  reservation?: Reservation;
  onEditAction?:(id:string) => void;
  onAction?:(id:string) => void;
  onActionSecond?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabelSecond?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onEditAction,
  onAction,
  onActionSecond,
  disabled,
  actionLabel,
  actionLabelSecond,
  actionId,
  currentUser 
}) => {

  var d=new Date();
  const currentDayNumber = d.getDay();
  
  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);
  const title = data.title;

  const [stars, setStars] = useState<number | null>(2);

  const handleDelete = useCallback(
    () => {
      if(disabled){
        return;
      }
      if(actionId){
        onAction?.(actionId);
      }
    },
    [onAction, actionId, disabled],
  );
  
  const handleSecondAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      if(actionId){
        onActionSecond?.(actionId);
      }
      //console.log(actionId);
    },
    [onActionSecond,actionId],
  );

  const handleEditAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      if(actionId){
      onEditAction?.(actionId);
      }
    },
    [onEditAction, actionId, disabled],
  );
  
  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);


  const dayOfWeekAsString = (dayIndex:number) => {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }

  const OperationStatus = () => {
    let currentDay:any;
    let STATUS:any;
    let STATUSCOLOR:any;

    const today = dayOfWeekAsString(currentDayNumber);
    
    data.horary.filter((item,)=>{
        if(today === item.day){
            if(item.fulltime){
              STATUS = (<div>Open Now</div>);
              STATUSCOLOR = `text-green-700`;
              return
            } 
            if(item.closed){
              STATUS = (<div>Close Now</div>);
              STATUSCOLOR = `text-red-500`;
              return
            }
            STATUS = (<div>Soon</div>);
            STATUSCOLOR = `text-neutral-500`;
        }
      })

    //console.log(currentDay);
    
    return (
      <div>
        <div className={`font-bold flex flex-row items-center ${STATUSCOLOR}`}>
              <AiOutlineClockCircle size={12}/> <span className='ml-1 text-sm'>{STATUS}</span>
        </div>
        
      </div>
      
    )
  }
  

  return (
      <div 
        className='col-span-1 cursor-pointer group'> 
        <div className='flex flex-col w-full'>
          <div 
              onClick={()=> router.push(`/listings/${data.id}`)}
              className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <Image
              sizes='100'
              priority={false}
              fill
              alt='Listing'
              src={data.imageSrc ? data.imageSrc : "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg"}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              />
            <div className='absolute top-3 right-3'>
                <HeartButton
                  listingId={data.id}
                  currentUser={currentUser}
                />
            </div>
          </div>
          <div className='font-bold text-sm mt-2'>
            {title}
          </div>
          <div className='font-light text-sm'>
          {!data.visibleAddress && `${data.address},`} {data.apartment && `${data.apartment},`} {data.city}, {data.state} {data.zipcode && `${data.zipcode}, `}{data.locationValue}
          </div>
          <div className='font-light text-sm'>
          {data.formattedPhone}
          </div>
          <div onClick={()=>{alert(currentDayNumber)}}>
            <OperationStatus/>
          </div>
          <div className='flex flex-row items-center'>
            <Rating
              size='small'
              name="simple-controlled"
              value={stars}
              precision={0.5}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
            <div className='ml-2 text-neutral-500 text-sm'>
              {stars} (34)
            </div>
            
          </div>
          <div className='font-semibold text-green-500 text-sm'>
            View Menu
          </div>
          <div className='font-bold text-neutral-500 text-sm'>
            {data.category}
          </div>
        </div>
          {onAction && actionLabel && (
            <>
            <DoubleButton
              disabled={disabled}
              label={actionLabel}
              labelSecond={actionLabelSecond}
              onClick={handleEditAction}
              onClickSecond={handleSecondAction}
            />
              <ConfirmModal onSubmit={handleDelete}/>

            </>
            
          )}
      </div>
  )
}

export default ListingCard