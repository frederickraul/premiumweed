'use client'
import useCountries from '@/app/hooks/useCountries';
import { Listing, Reservation, User, Horary } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { Rating } from '@mui/material';
import { AiOutlineClockCircle, AiOutlineFacebook, AiOutlineInstagram, AiOutlineQuestion, AiOutlineShareAlt, AiOutlineStar, AiOutlineTwitter } from 'react-icons/ai';
import { SafeListing, SafeUser } from '@/app/types';
import DoubleButton from '../DoubleButton';
import ConfirmModal from '../modals/ConfirmModal';
import { formatTime, isOpen } from '@/app/const/hours';
import OperationStatus from './ListingTime';
import { TbShieldQuestion, TbWorld } from 'react-icons/tb';
import { BiLogoFacebookCircle } from 'react-icons/bi';
import ListingHorary from './ListingHorary';
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import FloatingButton from '../FloatingButton';


interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onEditAction?: (id: string) => void;
  onAction?: (id: string) => void;
  onActionSecond?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabelSecond?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCardHorizontal: React.FC<ListingCardProps> = ({
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



  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const title = data.title;

  const [stars, setStars] = useState<number | null>(2);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  }

  const handleDelete = useCallback(
    () => {
      if (disabled) {
        return;
      }
      if (actionId) {
        onAction?.(actionId);
      }
    },
    [onAction, actionId, disabled],
  );

  const handleSecondAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      if (actionId) {
        onActionSecond?.(actionId);
      }
      //console.log(actionId);
    },
    [onActionSecond, actionId],
  );

  const handleEditAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      if (actionId) {
        onEditAction?.(actionId);
      }
    },
    [onEditAction, actionId, disabled],
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const DropDownInfo = () => {
  return(
    <>
          {/* DROPDOWN INFO */ }
    <div className='
          flex 
          flex-col 
          mt-5 
          relative 
          '>
      <div className="
        text-base 
        capitalize 
        flex 
        flex-row 
        items-start
        md:items-center
        pl-5
        sm:pl-10
" onClick={toggleVisible}>
        <OperationStatus horary={data} fontBase iconSize={20} showCurrentHorary />
        <div className='ml-2'>
        {isVisible ? (<MdArrowDropUp size={28} />) : (<MdArrowDropDown size={28} />)}
        </div>

      </div>

      <div className={`
        pl-10 pr-10
        absolute
        bg-white
        w-[100%]
        h-[220px]
        shadow-2xl
        flex DropDownInfo
        flex-row 
        mb-6 
        mt-10 
        justify-between 
        origin-top 
        transition 
        ease-in 
        duration-100
        z-20
        ${isVisible ? "scale-y-100" : "scale-y-0"}
        ${isVisible ? "h-[100%]" : "h-0"}
        
        `}>
        <div className="w-full md:w-2/3 px-3 mb-6">
          <label className="block tracking-wide text-gray-700 mb-2">
            Hours of Operation
          </label>
          <div className="">
            {
              data.horary.map((item: any, i: number) => (
                <div key={item.day} className="flex flex-col whitespace-nowrap">
                  <div className="flex flex-row items-center justify-between">
                    <div className="sm:mr-4 pl-5 sm:pl-0 min-w-[100px] w-[100%] sm:w-auto text-xs">
                      {item.day}
                    </div>
                    {item.fulltime &&
                      <div className='font-bold text-green-700 flex flex-row items-center '>
                        <AiOutlineClockCircle size={12} /> <span className='ml-1 text-sm'>Open 24 Hours</span>
                      </div>
                    }
                    {item.closed &&
                      <div className='font-bold text-red-700 flex flex-row items-center '>
                        <AiOutlineClockCircle size={12} /> <span className='ml-1 text-sm'>Closed</span>
                      </div>
                    }
                    {!item.closed && !item.fulltime &&
                      <div className="flex flex-row items-center whitespace-nowrap">
                        <div className="max-w-[220px] text-xs">
                          {formatTime(item.open)}
                        </div>
                        <div className="ml-2 mr-2"> - </div>
                        <div className="max-w-[220px] text-xs">
                          {formatTime(item.close)}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
    {/* ./DROPDOWN INFO */ }
    </>
  )
  }


  return (
    <div
      className='col-span-1 cursor-pointer group'>

      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col sm:flex-row lg:w-3/4'>
          <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className='aspect-square w-full sm:w-1/2 sm:mr-5 md:mr-0 md:w-1/3 relative overflow-hidden rounded-xl'>
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
          <div className='flex flex-col w-full sm:w-1/2 md:w-full mt-5 sm:mt-0'>
            <div className='flex flex-col md:flex-row w-full'>
              <div className='w-full md:w-1/2 pl-5 md:pl-10'>
                <div className='font-bold text-2xl'>
                  {title}
                </div>
                <div className='font-light text-base text-neutral-700'>
                  {!data.visibleAddress && `${data.address}, `}{data.apartment && !data.visibleAddress && `${data.apartment}, `}{data.city}, {data.state} {data.zipcode && `${data.zipcode}, `}{data.locationValue}
                </div>
                <div className='font-light text-base text-neutral-700'>
                  {data.formattedPhone}
                </div>
                
                <div className='flex flex-row items-center'>
                  <Rating
                    name="simple-controlled"
                    value={stars}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setStars(newValue);
                    }}
                  />
                  <div className='ml-2 text-neutral-500 text-base'>
                    {stars} (34)
                  </div>

                </div>
              </div>
              <div className='w-full md:w-1/2 pl-5 mt-5 lg:mt-0 flex flex-col gap-2'>
                <div className='text-neutral-600 flex flex-row items-center'>
                  <TbWorld size={20} /> <span className='text-base font-bold ml-4'>{data.website}</span></div>
                <div className='text-neutral-600 flex flex-row items-center'>
                  <BiLogoFacebookCircle size={20} /><span className='text-blue-500 ml-4'>Facebook Page</span></div>
                <div className='text-neutral-600 flex flex-row items-center'>
                  <AiOutlineTwitter size={20} /> <span className='text-blue-500 ml-4'> gyrofresh</span></div>
                <div className='text-neutral-600 flex flex-row items-center'>
                  <AiOutlineInstagram size={20} /><span className='text-blue-500 ml-4'>Instagram Page</span></div>
              </div>
            </div>
            <DropDownInfo/>

          </div>
        </div>
        <div className='
          hidden
          md:flex 
          flex-row 
          lg:flex-col 
          w-full 
          lg:w-1/4 
          pl-5 
          pr-5 
          gap-3 
          mt-10 
          lg:mt-0'>
            <Button
              label='Ask'
              onClick={() => { }}
              color='bg-black'
              icon={TbShieldQuestion}
              borderless
              styles='border-black'
            />
            <Button
              label='Write a review'
              icon={AiOutlineStar}
              onClick={() => { }}
              color='bg-black'
              borderless
              styles='border-black'
            />
            <Button
              label='Share'
              icon={AiOutlineShareAlt}
              onClick={() => { }}
              color='bg-black'
              borderless
              styles='border-black'
            />
          
        </div>
        <div className='
          flex
          md:hidden 
          flex-row 
          lg:flex-col 
          w-full 
          lg:w-1/4 
          pl-5 
          pr-5 
          gap-6 
          mt-20 
          lg:mt-0 
          items-center 
          justify-center'>
            <FloatingButton
              label='Ask'
              onClick={() => { }}
              color='bg-black'
              icon={TbShieldQuestion}
              borderless
              styles='border-black'
            />
            <FloatingButton
              label='Write a review'
              icon={AiOutlineStar}
              onClick={() => { }}
              color='bg-black'
              borderless
              styles='border-black'
            />
            <FloatingButton
              label='Share'
              icon={AiOutlineShareAlt}
              onClick={() => { }}
              color='bg-black'
              borderless
              styles='border-black'
            />

          
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
          <ConfirmModal onSubmit={handleDelete} />

        </>

      )}
    </div>
  )
}

export default ListingCardHorizontal