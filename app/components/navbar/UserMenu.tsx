'use client';

 import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';

import { useState,useCallback } from 'react';
import { signOut } from 'next-auth/react';

import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import GetTheApp from './GetTheApp';
import { SafeUser } from '@/app/types';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

export const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const route = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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
            <GetTheApp/>
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
                <div className='text-sm font-bold'>More</div>
                <MdKeyboardArrowDown /> 
                <div className='hidden md:block'>
                     <Avatar src={currentUser?.image} />
                </div> 
            </div>
        </div>
        {isOpen &&(
            <div
                className='
                    absolute
                    rounded-xl
                    shadow-md
                    md:w-4/4 
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                        {/* <MenuItem
                            onClick={()=>route.push('/reservations')}
                            label="My trips"
                        />  */}
                        <MenuItem
                            onClick={()=>route.push('/favorites')}
                            label="My favorites"
                        /> 
                        <MenuItem
                            onClick={()=>route.push('/cart')}
                            label="My cart"
                        /> 
                        <MenuItem
                            onClick={()=>route.push('/mylistings')}
                            label="My listings"
                        /> 
                        <MenuItem
                            onClick={rentModal.onOpen}
                            label="Weedgrowers My Home"
                        /> 
                        <hr />
                        <MenuItem
                            onClick={()=>{signOut()}}
                            label="Logout"
                        /> 

                    </>
                    ):(
                        <>
                        <MenuItem
                            onClick={loginModal.onOpen}
                            label="Login"
                        /> 
                        <MenuItem
                            onClick={registerModal.onOpen}
                            label="Sign up"
                        /> 
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
