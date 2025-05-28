'use client';
import React, { useState } from 'react'
import CloseButton from '@/app/components/dashboard/button/CloseButton';
import FormInput from '@/app/components/dashboard/Input/FormInput';
import ToggleSwitch from '@/app/components/dashboard/Input/ToggleSwitch';
import FormLabel from '@/app/components/dashboard/Text/FormLabel';

interface ListingModalProps { 
  open: boolean, 
  onClose: any, 
  data: any, 
  onSubmit: any,
}

const ListingHoraryModal: React.FC<ListingModalProps> = ({
  open,
  onClose,
  data, 
  onSubmit
})=>{

  if (!open) {
    return;
  }

  const [horary, setHorary] = useState<any[]>(data?.horary);

  const handleSubmit=()=>{
    const listing = {...data, ['horary']:horary};
    onClose();
    onSubmit(listing);
  }

  const handleInputChange = (day:string, field: any,value: any) => {
    setHorary(prevValue => 
      [...prevValue].map(el => 
          el.day === day ? ({...el, [field]:value}) : el)
      );
  }


  const handleCloseModal = () => {
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto z-99999">
      <div className="modal-close-btn fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"></div>
      <div className="no-scrollbar relative flex w-full max-w-[700px] flex-col overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-11">
        {/* <!-- close btn --> */}
        <CloseButton onClick={handleCloseModal} />

        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Hours of Operation
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your listing up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="px-2 mb-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
            <div className='grid grid-cols-4 gap-4 text-right'>
              <div></div> 
              <div></div> 
              <div></div> 
              <div className='text-center'>
                  <span className='m-3'>24hrs</span>
                  <span className='m-3'>Closed</span>
                </div> 
            </div>
              {horary?.map((item: any, key: number) => (
                <div key={key} className='grid grid-cols-4 gap-4'>
                  <FormLabel text={item?.day} />
                  <FormInput type='time' value={item?.open} onChange={(value: string) => {
                    handleInputChange(item?.day, 'open',value);
                  }} />

                  <FormInput type='time' value={item?.close} onChange={(value: string) => {
                    handleInputChange(item?.day, 'close',value);
                  }} />

                  <div className='flex justify-around'>
                    <ToggleSwitch id={key} active={item?.fulltime} onChange={() => {
                      const value = item?.fulltime;
                      if (!item.fulltime) {
                        handleInputChange(item?.day, 'closed',false);
                      }
                      
                      handleInputChange(item?.day, 'fulltime',!value);
                 
                    }} />

                    <ToggleSwitch id={key} active={item?.closed} onChange={() => {                     
                      const value = item?.closed;
                      if (!item.closed) {
                        handleInputChange(item?.day, 'fulltime',false);
                      }

                      handleInputChange(item?.day, 'closed',!value);
                    }} />
                  </div>
                </div>
              ))
              }


            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 lg:justify-end">
            <button onClick={handleCloseModal} type="button" className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Close
            </button>
            <button 
                onClick={handleSubmit}
                type="button" className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium dark:text-white text-gray-700 hover:bg-brand-600 sm:w-auto">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ListingHoraryModal