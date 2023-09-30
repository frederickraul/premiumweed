'use client'
import useCountries from '@/app/hooks/useCountries';
import { Listing, Reservation, User, Horary } from '@prisma/client';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { Rating } from '@mui/material';
import { AiOutlineClockCircle, AiOutlineFacebook, AiOutlineInstagram, AiOutlineQuestion, AiOutlineShareAlt, AiOutlineShop, AiOutlineShopping, AiOutlineStar, AiOutlineTwitter } from 'react-icons/ai';
import { SafeListing, SafeUser } from '@/app/types';
import DoubleButton from '../DoubleButton';
import ConfirmModal from '../modals/ConfirmModal';
import { formatTime, isOpen } from '@/app/const/hours';
import { TbShieldQuestion, TbWorld } from 'react-icons/tb';
import { BiLogoFacebookCircle } from 'react-icons/bi';
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import FloatingButton from '../FloatingButton';
import Counter from '../inputs/Counter';
import { dataList, defaultImage } from '@/app/const';


interface ProductCardProps {
  data: any;
  onEditAction?: (id: string) => void;
  onAction?: (id: string) => void;
  onActionSecond?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabelSecond?: string;
  actionId?: string;
  currentUser?: SafeUser | null;

}
const ProductCardHorizontal: React.FC<ProductCardProps> = ({
  data,
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
  const [quantity, setQuantity] = useState(0);

  const [isVisible, setIsVisible] = useState(false);


  const dropdown = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
  }, [dropdown]);



  const handleQuantity = (value: number) =>{
    setQuantity(value);
  }
  const handleOutSideClick = (event: any) => {
    dropdown
    if (!dropdown.current?.contains(event.target)) {
      setIsVisible(false);
    }
  };


  const toggleOpen = useCallback(() => {
    setIsVisible((value => !value));
  }, [],
  )


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



  return (
    <div
      className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex flex-col sm:flex-row w-full'>
          <div className='w-full sm:w-1/3'>
              <div
                className='
                  w-full
                  aspect-square
                  sm:mr-5 
                  md:mr-5 
                  relative 
                  overflow-hidden 
                  rounded-xl'>
                <Image
                  sizes='100'
                  priority={false}
                  width={100}
                  height={100}
                  alt='Listing'
                  src={data.coverSrc ? data.coverSrc : defaultImage}
                  className='object-cover h-full w-full group-hover:scale-110 transition '
                />
                <div className='absolute top-3 right-3'>
                  <HeartButton
                    listingId={data.id}
                    currentUser={currentUser}
                  />
                </div>
              </div>
          </div>
          <div className='
              flex 
              flex-col 
              w-full 
              sm:w-2/3 
              mt-5 
              sm:mt-0
              pb-5
              '>
            <div className='flex flex-col  w-full'>
              <div className='
                  w-full 
                  pl-5 
                  md:pl-10 
          '>
                <div className='text-blue-500 text-xs capitalize'>
                  {data.category}
                </div>
                <div className='font-bold text-3xl'>
                  {title}
                </div>
                <div className='flex flex-row items-center'>
                  <Rating
                    readOnly
                    size='small'
                    name="simple-controlled"
                    value={stars}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setStars(newValue);
                    }}
                  />
                  <a className='ml-2 text-neutral-500 text-xs' href='#reviews'>
                    {stars} (34)
                  </a>

                </div>
                <div className='text-xs text-neutral-700 mt-4'>
                <span className='font-bold text-lg'>${parseFloat(data.price).toFixed(2)} </span> / {data.deliveryFee}G
                </div>
                <div className='flex mt-5 flex-col'>
                  <span className='font-bold text-sm'>Quantity</span>
                  <div className='flex justify-start mt-2'>
                    <Counter
                      small
                      title=''
                      subtitle=''
                      value={quantity}
                      onChange={handleQuantity}
                    />
                  </div>
                </div>
                <div className='w-[180px] mt-5'>
                <Button
                    icon={AiOutlineShopping}
                    color='bg-black'
                    borderless
                    styles='border-black'
                    label='Add to cart'
                    onClick={()=>{alert('Soon')}}
                  />
                </div>
                <div className='
                    w-full 
                    mt-5         
                  border-b-neutral-300
                    border-b-[1px] pb-10'>
                  <span className='font-bold text-lg pb-5'>Product description</span>
                  <div className='font-light text-neutral-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
                </div>
                
              </div>

            </div>

          </div>
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

export default ProductCardHorizontal