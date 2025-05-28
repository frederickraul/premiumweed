'use client';
import {useRef,useEffect } from 'react';

 import { AiFillPlusCircle, AiFillStar, AiOutlineMenu, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import Avatar from '../Avatar';

import { useState,useCallback } from 'react';
import { signOut } from 'next-auth/react';

import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/app/useRegisterModal';
import useLoginModal from '@/app/hooks/app/useLoginModal';

import useRentModal from '@/app/hooks/app/useRentModal';
import { useRouter } from 'next/navigation';
import GetTheApp from './GetTheApp';
import { SafeUser } from '@/app/types';
import { MdFormatListBulleted, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { BiLogIn, BiLogOut, BiSolidCart, BiSolidLogIn } from 'react-icons/bi';
import { TbMessage, TbMessage2, TbShieldQuestion } from 'react-icons/tb';
import DashboardButton from '../DashboardButton';
import usePricingModal from '@/app/hooks/app/usePricingModal';
import useProductModal from '@/app/hooks/app/useProductModal';


interface UserMenuProps {
    currentUser?: SafeUser | null
}

export const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const pricingModal = usePricingModal();
    const route = useRouter();

    const defaultValue = {
        current: null,
    } 
    
    const dropdown = useRef<HTMLInputElement>(null);

        useEffect(() => {
 
            window.addEventListener("mousedown", handleOutSideClick);
            
           
        }, [dropdown]);

        const handleOutSideClick = (event: any) => {
            if (!dropdown.current?.contains(event.target)) {
                setIsOpen(false);
            }
            };


    const toggleOpen = useCallback(() => {
        setIsOpen((value=> !value));
      },[],
    )

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        rentModal.onOpen();

      },[currentUser, loginModal,rentModal],
    )
    
    

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            {/* <GetTheApp/> */}
            <DashboardButton currentUser={currentUser}/>
            {/* <div 
                onClick={onRent}
                className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                " 
            >
                Premium Weed
            </div> */}
            <div 
                ref={dropdown}
                onClick={toggleOpen} 
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
            >
                <div className='truncate text-sm font-bold'>{currentUser?.name}</div>
                <MdKeyboardArrowDown /> 
                <div className='hidden md:block h-10 w-10'>
                     <Avatar src={currentUser?.image} />
                </div> 
            </div>
        </div>
        {isOpen &&(
            <div
                ref={dropdown}
                className='
                    absolute
                    rounded-xl
                    shadow-2xl
                    md:w-4/4 
                    bg-white
                    overflow-hidden
                    right-0
                    top-16
                    text-sm
                    w-[200px]
                '
            >
                <div className='flex flex-col cursor-pointer whitespace-nowrap'>
                    {currentUser ? (
                        <>
                        <div className='flex flex-row px-5 py-2'>
                            <div className='block h-12 w-12'>
                                <Avatar size={100} src={currentUser?.image} />
                            </div> 
                            <div className='ml-2' onClick={()=>{route.push('/dashboard/profile')}}>
                                <div className='text-sm font-bold'>{currentUser?.name}</div>
                                <div className='flex flex-row items-center'>
                                    <span className='text-xs'>My profile</span>
                                    <MdKeyboardArrowRight /> 
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <MenuItem
                            onClick={()=>{
                                toggleOpen();route.push('/dashboard/messages')}}
                                icon={TbMessage}
                                style='text-neutral-500'
                            link='//dashboard/messages'
                            label="Messages"
                        /> 
                        <MenuItem
                            onClick={()=>{
                                toggleOpen();
                                route.push('/favorites')}}
                                icon={AiFillStar}
                                style='text-neutral-500'
                            link='/favorites'
                            label="My favorites"
                        /> 
                        <MenuItem
                            onClick={()=>{
                                toggleOpen();alert('Soon')}}
                                icon={BiSolidCart}
                                style='text-neutral-500'
                            label="My cart"
                            link='/cart'
                        /> 
                        <MenuItem
                            onClick={()=>{
                                toggleOpen();route.push('/mylistings')}}
                            link='/mylistings'
                            label="My listings"
                            icon={MdFormatListBulleted}
                            style='text-neutral-500'
                            /> 
                        <MenuItem
                            onClick={()=>{
                                toggleOpen();
                                currentUser?.role === 'Seller' ?  rentModal.onOpen() : pricingModal.onOpen();
                            }}
                            icon={AiFillPlusCircle}
                            style='text-blue-400'

                            label="Add Business"
                        /> 
                        <hr />
                        <MenuItem
                            onClick={()=>{toggleOpen();signOut()}}
                            icon={BiLogOut}
                            style='text-neutral-500'
                            label="Logout"
                        /> 

                    </>
                    ):(
                        <>
                        <MenuItem
                            icon={BiSolidLogIn}
                            style='text-neutral-500'
                            onClick={loginModal.onOpen}
                            label="Login"
                        /> 
                        <MenuItem
                            onClick={registerModal.onOpen}
                            label="Sign up"
                            style='text-neutral-500'
                            icon={BiLogIn}

                        /> 
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
