'use client';

import { Avatar, Box, Card, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react'


import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { defaultImage } from '@/app/const';
import { BiEditAlt } from 'react-icons/bi';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import InputUnregistered from '../inputs/InputUnregistered';
import Button from '../Button';
import Modal from '../modals/Modal';
import LoadingContainer from '../LoadingContainer';
import Container from '../Container';
import FloatingButton from '../FloatingButton';

interface ElementProps {
  currentUser?: SafeUser | null;
  fieldOrder?: boolean;
  header: any;
  headerStyles?: any;
}

const ProfileView: React.FC<ElementProps> = ({
  currentUser,
  fieldOrder,
  header,
  headerStyles,
}) => {
  const defaultError = { name: false };
  const defaultData = { name: currentUser?.name, image: currentUser?.image, email: currentUser?.email, oldPassword: '', newPassword: '', newPasswordConfirm: '' };

  const router = useRouter();
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultError);
  const [profileVisible, setprofileVisible] = useState(false);

  const toggleModalProfile = () => {
    setprofileVisible(!profileVisible);
  }

  const handleInputChange = (field: string, fieldValue: any) => {
    if (field == 'image') {
      setData({ ...data, [field]: fieldValue });
      return;
    }
    const value = fieldValue.target.value;
    setData({ ...data, [field]: value });
  }


  const onSubmit = useCallback(async () => {
    setErrors(defaultError);
    if (data.name == '') {
      setErrors({ ...errors, ['name']: true });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      // Show success message and possibly redirect
      toast.success('The profile is updated.', {
        duration: 5000,
        position: 'top-center',

      });

      router.refresh();


    } catch (error: any) {
      toast.error(error.message || 'Failed to update the profile.');
    } finally {
      setIsLoading(false);
    }
  }, [data, router, defaultError, errors]);


  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title=""
        subtitle=""
      />
      <ImageUpload
        value={data.image || defaultImage}
        onChange={(value: any) => handleInputChange('image', value)}
      />
    </div>
  )

  return (
    <LoadingContainer isLoading={isLoading}>
      <Container>
        <div className='flex flex-col items-center'>

        <Stack className='my-5 w-full mb-5
                    lg:w-6/12'>
          <div className='text-2xl md:text-4xl'>
            {header}
          </div>
            <h3 className='text-blue-800'>Update your photo and personal details here.</h3>
        </Stack>
        <Card className='
                    bg-white 
                    h-full
                    p-5
                    
                    w-full
                    lg:w-6/12
                    mb-16 
                    '>
          <div className='h-full  flex
                    flex-col
                    justify-between' >

            <div className='mb-5 flex flex-col justify-center items-center'>

              <div className='
                        relative
                        w-fit
                        p-3 
                        rounded-full 
                        ring-2 
                        ring-blue-300 
                        dark:ring-blue-500 mb-5'>
                <Avatar
                  alt={data.name || 'image'}
                  src={data.image || defaultImage}
                  sx={{ width: 150, height: 150 }} />
                <div className='absolute top-0 right-0'>
                  <FloatingButton color='bg-blue-500' label='' icon={BiEditAlt} onClick={toggleModalProfile} />
                </div>
              </div>
              <Heading title={data.name || ''} />
              <div className='w-full mt-20'>
                <div className='flex flex-col w-full mb-5'>

                  <InputUnregistered
                    label="Name"
                    value={data.name}
                    required
                    onChange={(value: any) => { handleInputChange('name', value) }}
                    />

                  {errors.name &&
                    <text className='font-bold text-red-500'>Required!!!</text>
                  }
                </div>



              </div>
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div className='w-full'>
                <Button full label='Update' onClick={onSubmit} />
              </div>

            </Box>
          </div>

        </Card>

                  </div>
      </Container>
      <Modal
        isOpen={profileVisible}
        onClose={toggleModalProfile}
        onSubmit={toggleModalProfile}
        actionLabel="Close"
        secondaryActionLabel=""
        secondaryAction={undefined}
        title="Change your profile picture!!!"
        body={bodyContent}
        disabled={isLoading}
      />
    </LoadingContainer>


  )
}

export default ProfileView