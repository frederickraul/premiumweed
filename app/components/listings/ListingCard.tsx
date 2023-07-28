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

interface ListingCardProps{
  data: Listing;
  reservation?: Reservation;
  onAction?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId= "",
  currentUser 
}) => {
  
  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);
  const title = data.title;
  const [stars, setStars] = useState<number | null>(2);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  )
  
  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if(!reservation){
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
      <div 
        className='col-span-1 cursor-pointer group'> 
        <div className='flex flex-col gap-2 w-full'>
          <div 
              onClick={()=> router.push(`/listings/${data.id}`)}
              className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <Image
              fill
              alt='Listing'
              src={data.imageSrc}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              />
            <div className='absolute top-3 right-3'>
                <HeartButton
                  listingId={data.id}
                  currentUser={currentUser}
                />
            </div>
          </div>
          <div className='font-bold text-lg'>
            {title}
          </div>
          <div className='font-light leading-3'>
            {location?.region}, {location?.label}
          </div>
          <div className='font-bold text-green-700 flex flex-row items-center'>
            <AiOutlineClockCircle/> <span className='ml-1 text-md'>Open Now</span>
          </div>
          <div className='flex flex-row items-center leading-3'>
            <Rating
              size='small'
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
            <div className='ml-2 text-sm text-neutral-500'>
              {stars} (34)
            </div>
            
          </div>
          <div className='font-semibold text-green-500'>
            View Menu
          </div>
          <div className='font-bold text-neutral-500 leading-3'>
            {data.category}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
  )
}

export default ListingCard