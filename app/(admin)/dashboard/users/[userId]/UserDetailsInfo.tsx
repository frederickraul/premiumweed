'use client'
import React, { useState } from 'react'
import { defaultImage } from '@/app/const';
import Avatar from '@/app/components/app/Avatar';

import LargeButton from '@/app/components/dashboard/button/LargeButton';
import Label from '@/app/components/dashboard/Text/Label';
import Text from '@/app/components/dashboard/Text/Text';
import Badge from '@/app/components/dashboard/Text/Badge';
import UserInfoModal from './modal/UserInfoModal';
import { Checkbox } from '@mui/material';
import UserStatusModal from './modal/UseStatusModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const UserDetailsInfo = (props: {user: any}) => {
    const {user} = props;
    console.log(user);
    
    const router = useRouter();
    const [isOpenUserInfoModal, setisOpenUserInfoModal] = useState(false);
    const [isOpenUserStatusModal, setIsOpenUserStatusModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onOpenUserInfoModal = () => {
        setisOpenUserInfoModal(!isOpenUserInfoModal);
    }

    const onOpenUserStatusModal = () => {
        setIsOpenUserStatusModal(!isOpenUserStatusModal);
    }

    const onSubmit = (data:any) => {
        setIsLoading(true);
    
        axios.post(`/api/dashboard/user/${user.id}`, data)
          .then(() => {
            toast.success('User Updated');
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.')
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

  

    
    return (
        <>
        {/* Modal Section */}
        <div>
            <UserInfoModal 
                onClose={onOpenUserInfoModal} 
                open={isOpenUserInfoModal}
                data={user}
                onSubmit={onSubmit}
                />
            
            <UserStatusModal
                onClose={onOpenUserStatusModal}
                open={isOpenUserStatusModal}
                data={user}
                onSubmit={onSubmit}
            />
        </div>
        {/* End Modal Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                User Details
            </h3>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <Avatar src={user?.image || defaultImage}/>
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {user?.name}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <Badge text={user?.role}/>

                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  United States.
                                </p>
                            </div>
                        </div>

                       
                    </div>

                    <LargeButton label='Edit' onClick={onOpenUserInfoModal}/>
                </div>
            </div>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='First Name'/>
                                <Text text={user?.name}/>
                            </div>

                            <div>
                                <Label text='Last Name'/>
                                <Text text={user?.lastname}/>
                            </div>

                            <div>
                                <Label text='Email Address'/>
                                <Text text={user?.email}/>
                            </div>

                        

                          
                        </div>
                    </div>

                   <LargeButton label='Edit' onClick={onOpenUserInfoModal}/>
                </div>
            </div>

            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-red-500  lg:mb-6">
                            Danger Zone - Account suspension
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Account Status
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                <label className='mr-5 w-12'>{user?.enable ? 'Active': 'Inactive'}</label> 
                                <Checkbox checked={user?.enable} readOnly/>
                                </p>
                            </div>
                        </div>
                    </div>

                    <LargeButton label='Edit' onClick={onOpenUserStatusModal}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDetailsInfo