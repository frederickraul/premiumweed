'use client';

import { signIn} from 'next-auth/react';
import useLoginModal from "@/app/hooks/app/useLoginModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import {toast} from 'react-hot-toast';
import Button from "../Button";

import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/app/useRegisterModal';
import useResetModal from '@/app/hooks/app/useResetModal';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const resetModal = useResetModal();
  const [isLoading, setIsLoading] = useState(false);

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


  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true);
    let lowercaseEmail = (data?.email).toLowerCase();
    const credentials = {email: lowercaseEmail, password: data.password};
    console.log(credentials);
    signIn('credentials',{
      ...credentials,
      redirect: false
    }).then((callback) =>{
      setIsLoading(false);
      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  }

  const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();

  },[loginModal,registerModal]);


  const toggleReset = useCallback(()=>{
    loginModal.onClose();
    resetModal.onOpen();

  },[loginModal,registerModal]);


  
  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Welcome back " 
          subtitle="Login to your account!!"/>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <div className='text-right mt-2'>
          <span 
          onClick={toggleReset}
          className='text-blue-500 font-bold cursor-pointer'>Forgot Password?</span>
        </div>
        
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle }
          onClick={()=>{}}
        />
        {/* <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub }
          onClick={()=>{}}
        /> */}
        <div className="
          text-neutral-500
          text-center
          mt-4
          font-light
        ">
          <div className="justify-center flex flex-row items-center gap-2">
            <div className='text-xs sm:text-base'>
              First time using Weedgrowers?
            </div>
            <div 
            onClick={toggle}
            className="
              text-blue-500
              cursor-pointer
              hover:underline
              text-sm sm:text-base
            ">
              Create an account
            </div>
          </div>

        </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login "
      actionLabel="Continue"
      onClose={loginModal.onClose }
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal