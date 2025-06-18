'use client';

import { signIn} from 'next-auth/react';
import { useCallback, useState } from "react";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";


import {toast} from 'react-hot-toast';

import { redirect, useRouter } from 'next/navigation';
import Heading from '@/app/components/app/Heading';
import Input from '@/app/components/app/inputs/Input';
import Button from '@/app/components/app/Button';
import Modal from '@/app/components/app/modals/Modal';
import useLoginModal from '@/app/hooks/app/useLoginModal';
import useResetModal from '@/app/hooks/app/useResetModal';




const ResetPasswordModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();
const resetModal = useResetModal();

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      email:'',
      password:''
    }
  });

  
  const toggle = useCallback(()=>{
    resetModal.onClose();
    loginModal.onOpen();

  },[loginModal,resetModal]);


  // const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('There was an error sending the reset password email.');
      }

      // Show success message and possibly redirect
      toast.success('If the email is associated with an account, a password reset email will be sent.', {
        duration: 5000,
        position: 'top-center',
      
      });
      // Optionally, redirect to the login page or a page that says 'Check your email'
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset password email.');
    } finally{
      setIsLoading(false);
    }
  }

  
  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Forgot Password" 
          subtitle="You are not alone. We’ve all been here at some point!!"/>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className='flex justify-end'>
          <span className='font-bold text-blue-500 cursor-pointer' onClick={toggle}>
            Remembered your password? Sign in
            </span>
        </div>
        
    </div>
  );

 
  return (
    <Modal
      disabled={isLoading}
      isOpen={resetModal.isOpen}
      title="Forgot Password "
      actionLabel="Continue"
      onClose={resetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default ResetPasswordModal