'use client';

import useRegisterModal from "@/app/hooks/app/useRegisterModal";
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
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/app/useLoginModal";

const RegisterModal = () => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email:'',
      password:''
    }
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true);

    axios.post('/api/register',data)
    .then(()=> {
      toast.success('Success!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error)=>{
      toast.error('Something went wrong.')
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  const toggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen();

  },[loginModal,registerModal]);
  

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title="Welcome to WEEDGROWERS " 
          subtitle="Create an account!"/>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
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
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub }
          onClick={()=>{}}
        />
        <div className="
          text-neutral-500
          text-center
          mt-4
          font-light
        ">
          <div className="justify-center flex flex-row items-center gap-2">
            <div className="text-xs sm:text-base">
              Already have an account?
            </div>
            <div 
            onClick={toggle}
            className="
            text-blue-500
            cursor-pointer
              hover:underline
              text-sm sm:text-base
            ">
              Log in
            </div>
          </div>

        </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose }
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal