'use client';
import React from 'react'
import Button from '../../app/Button'
import { useRouter } from 'next/navigation'

const NotAllowed = () => {
    const route = useRouter();
  return (
    <div className="dark">

    <section className=" px-4 dark:bg-boxdark-2 sm:px-8 overflow-hidden relative z-10">
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[600px]">
            <div className="text-center">
              <div className="mx-auto mb-20 cursor-pointer" onClick={()=>{route.push('/')}}>
                <img src="/images/logo/logo.svg" alt="logo" className="dark:hidden"/>
                <img src="/images//logo/logo-dark.svg" alt="logo" className="hidden dark:block"/>
              </div>

              <h1 className="mb-2.5 text-3xl font-black text-black dark:text-white lg:text-4xl xl:text-[50px] xl:leading-[60px]">
                You do not have permission to view this page.
              </h1>
              <div className='my-20'>
              <Button color='bg-white' outline label='Back to the site' onClick={()=>{route.push('/')}}/>
              </div>
              <p className="font-medium">
            
              </p>
            </div>
          </div>
            </div>
          </div>
    </section>
    </div>
  )
}

export default NotAllowed