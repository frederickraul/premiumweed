'use client'
import Breadcrumb from '@/app/components/dashboard/Breadcrumbs/Breadcrumb'
import LargeButton from '@/app/components/dashboard/button/LargeButton';
import Card from '@/app/components/dashboard/Cards/Card'
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import Announcement from './Announcement';

const lightLogo = '/images/logo-black-text.png';
const darkLogo = '/images/logo-white-text.png';
const smallLogo = '/images/logo.png';
const favicon = '/images/logo/favicon.ico';

const LogoSettingsClient = (props:{logos:any}) => {

  const {logos} = props;
  
  console.log(logos);
  const defaultData = { 
    lightLogo: logos? logos[0] : lightLogo, 
    darkLogo: logos ? logos[1] : darkLogo, 
    smallLogo: logos? logos[2] : smallLogo,
    favicon:logos? logos[3] : favicon};

      console.log(defaultData);

  const router = useRouter();
  const [data, setData] = useState(defaultData);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleInputChange = (field: string, imageUrl: any) => {
    if(imageUrl===''){
      switch(field){
        case 'lightLogo':
          imageUrl=lightLogo;
          break;
        case 'darkLogo':
          imageUrl=darkLogo;
          break;
        case 'smallLogo':
          imageUrl=smallLogo;
          break;
        case 'favicon':
          imageUrl=darkLogo;
          break;
      }
    }
    setData({ ...data, [field]: imageUrl });
    setIsUpdate(true);
  }

  const onSubmit = useCallback(async () => {
   
    // setIsLoading(true);
    try {
      const response = await fetch('/api/settings/logos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      // Show success message and possibly redirect
      toast.success('The Business Logo information is updated.', {
        duration: 8000,
        position: 'top-center',

      });
      setIsUpdate(false);

      router.refresh();


    } catch (error: any) {
      toast.error(error.message || 'Failed to update the bussines logo information.');
    } finally {
      // setIsLoading(false);
    }
  }, [data, router]);


  return (
    <>
      <Breadcrumb pageName="Settings" />
    {/* Website logo */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Main Website Logo
          </h3>
        </div>
        <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
          {isUpdate &&
          <div className='mb-10'>
              <Announcement onSubmit={onSubmit}/>
          </div>
          }
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* <!-- Card Item --> */}
                <Card handleInputChange={(value:any)=>{handleInputChange('lightLogo',value)}} image={data.lightLogo} title='Light Theme Website Logo' invert />
                <Card handleInputChange={(value:any)=>{handleInputChange('darkLogo',value)}} image={data.darkLogo} title='Dark Theme Website Logo'/>
                <Card handleInputChange={(value:any)=>{handleInputChange('smallLogo',value)}} image={data.smallLogo} title='Small Website Logo' invert/>
          </div>
        </div>
        
      </div>

      {/* Footer logo
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Footer Logo
          </h3>
        </div>
        <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2"> */}
            {/* <!-- Card Item --> */}
                {/* <Card title='Light Theme Footer Logo' invert/>
                <Card title='Dark Theme Footer Logo'/> */}
          {/* </div>
        </div>
      </div> */}

      {/* Favicon */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Favicon
          </h3>
        </div>
        <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* <!-- Card Item --> */}
                <Card image={data.favicon} title='Favicon' invert smallImage 
                handleInputChange={(value:any)=>{handleInputChange('favicon',value)}}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoSettingsClient