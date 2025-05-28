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

import { toast } from 'react-hot-toast';

import usePricingModal from "@/app/hooks/app/usePricingModal";

const PricingModal = () => {

  const registerModal = useRegisterModal();
  const pricingModal = usePricingModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success('Success!');
        registerModal.onClose();
        pricingModal.onOpen();
      })
      .catch((error) => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose();
    pricingModal.onOpen();

  }, [pricingModal, registerModal]);




  const mainContent = (
    <div>
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
            {/* <!-- ====== Pricing Table One Start --> */}
            <div className="mx-auto w-full max-w-[385px]">
              <h2 className="mb-7 text-center text-title-sm font-bold text-gray-800 dark:text-white/90">
                Flexible Plans Tailored to Fit Your Unique Needs!
              </h2>
            </div>

            {/* <div x-data="{ 'monthly': true, }">
  <div className="mb-10 text-center">
    <div className="relative z-1 mx-auto inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-800">
      <span :className="monthly === true ? 'translate-x-0' : 'translate-x-full'" className="absolute top-1/2 -z-1 flex h-11 w-[120px] -translate-y-1/2 rounded-full bg-white shadow-theme-xs duration-200 ease-linear dark:bg-white/10 translate-x-0"></span>
      <button :className="monthly === true ? 'text-gray-800 dark:text-white/90' : 'text-gray-500 hover:text-gray-700 dark:hover:text-white/70 dark:text-gray-400'" className="flex h-11 w-[120px] items-center justify-center text-base font-medium text-gray-800 dark:text-white/90" @click="monthly = true">
        Monthly
      </button>
      <button :className="monthly === false ? 'text-gray-800 dark:text-white/90' : 'text-gray-500 hover:text-gray-700 dark:hover:text-white/80 dark:text-gray-400'" className="flex h-11 w-[120px] items-center justify-center text-base font-medium hover:text-gray-700 text-gray-500 dark:hover:text-white/80 dark:text-gray-400" @click="monthly = false">
        Annually
      </button>
    </div>
  </div> */}

            <div className="gird-cols-1 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {/* <!-- Pricing item --> */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <span className="mb-3 block text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                  Starter
                </span>

                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-end">
                    <h2 className="text-title-md font-bold text-gray-800 dark:text-white/90" x-text="monthly === true ? '$5.00' : '40.00'">$5.00</h2>

                    <span className="mb-1 inline-block text-sm text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <span className="text-theme-xl font-semibold text-gray-400 line-through" x-text="monthly === true ? '$12.00' : '$150.00'">$12.00</span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  For solo designers &amp; freelancers
                </p>

                <div className="my-6 h-px w-full bg-gray-200 dark:bg-gray-800"></div>

                <div className="mb-8 space-y-3">
                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    5 website
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    500 MB Storage
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Sub-Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    3 Custom Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Free SSL Certificate
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Traffic
                  </p>
                </div>

                <button className="flex w-full items-center justify-center rounded-lg bg-gray-800 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-500 dark:bg-white/10">
                  Choose Starter
                </button>
              </div>

              {/* <!-- Pricing item --> */}
              <div className="rounded-2xl border border-gray-800 bg-gray-800 p-6 dark:border-white/10 dark:bg-white/10">
                <span className="mb-3 block text-theme-xl font-semibold text-white">
                  Medium
                </span>

                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-end">
                    <h2 className="text-title-md font-bold text-white" x-text="monthly === true ? '$10.99' : '30.00'">$10.99</h2>

                    <span className="mb-1 inline-block text-sm text-white/70"> /month </span>
                  </div>

                  <span className="text-theme-xl font-semibold text-gray-300 line-through" x-text="monthly === true ? '$30.00' : '$250.00'">$30.00</span>
                </div>

                <p className="text-sm text-white/70">For working on commercial projects</p>

                <div className="my-6 h-px w-full bg-white/20"></div>

                <div className="mb-8 space-y-3">
                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    10 website
                  </p>

                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    1 GB Storage
                  </p>

                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Sub-Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    5 Custom Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Free SSL Certificate
                  </p>

                  <p className="flex items-center gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Traffic
                  </p>
                </div>

                <button className="flex w-full items-center justify-center rounded-lg bg-brand-500 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-600">
                  Choose Starter
                </button>
              </div>

              {/* <!-- Pricing item --> */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <span className="mb-3 block text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                  Large
                </span>

                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-end">
                    <h2 className="text-title-md font-bold text-gray-800 dark:text-white/90" x-text="monthly === true ? '$15.00' : '190.00'">$15.00</h2>

                    <span className="mb-1 inline-block text-sm text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>

                  <span className="text-theme-xl font-semibold text-gray-400 line-through" x-text="monthly === true ? '$59.00' : '$350.00'">$59.00</span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  For teams larger than 5 members
                </p>

                <div className="my-6 h-px w-full bg-gray-200 dark:bg-gray-800"></div>

                <div className="mb-8 space-y-3">
                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    15 website
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    10 GB Storage
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Sub-Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    10 Custom Domain
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Free SSL Certificate
                  </p>

                  <p className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Unlimited Traffic
                  </p>
                </div>

                <button className="flex w-full items-center justify-center rounded-lg bg-gray-800 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-500 dark:bg-white/10">
                  Choose Starter
                </button>
              </div>
            </div>
          </div>
          {/* <!-- ====== Pricing Table One End --> */}
     
     
        </div>
      </div>
    </div>
  );


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Only seller account may add listings"
        subtitle="Upgrate account!" />
      {mainContent}

    </div>
  );

  const footerContent = (<div></div>);

  return (
    <Modal
      size="xl"
      disabled={isLoading}
      isOpen={pricingModal.isOpen}
      title="Pricing"
      onClose={pricingModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default PricingModal