'use client'
import React, { useEffect, useState } from 'react'
import { defaultImage } from '@/app/const';
import Avatar from '@/app/components/app/Avatar';
import SocialMediaButton from '@/app/components/dashboard/button/SocialMediaButton';
import FacebookIcon from '@/app/components/icons/icon-facebook.svg';
import WebsiteIcon from '@/app/components/icons/icon-website.svg';
import IntagramIcon from '@/app/components/icons/icon-instagram.svg';
import TwitterIcon from '@/app/components/icons/icon-twitter.svg';
import LargeButton from '@/app/components/dashboard/button/LargeButton';
import Label from '@/app/components/dashboard/Text/Label';
import Text from '@/app/components/dashboard/Text/Text';
import Badge from '@/app/components/dashboard/Text/Badge';
import ListingAddressModal from './modal/ListingAddressModal';
import ListingInfoModal from './modal/ListingInfoModal';
import ListingHoraryModal from './modal/ListingHoraryModal';
import FormLabel from '@/app/components/dashboard/Text/FormLabel';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useCountries from '@/app/hooks/app/useCountries';



const ListingDetailsInfo = (props: {listing: any}) => {
    const {listing} = props;

        const { getByValue, getStateByValue, getCityByValue } = useCountries();
        const currentCountryCode = listing?.locationValue || "";
        const currentStateCode = listing?.stateCode || '';
        const currentCityName = listing?.city || '';
    
    
    const [data, setData] = useState();
    console.log(listing);

    useEffect(() => {
            // This data will be pass thought modal windows only
            const defaultValues:any = {
                category: listing?.category,
                address: listing?.address,
                visibleAddress: listing?.visibleAddress,
                apartment: listing?.apartment,
                zipcode: listing?.zipcode,
                location: getByValue(listing?.locationValue),
                state: getStateByValue(currentCountryCode, currentStateCode),
                city: getCityByValue(currentCountryCode, currentStateCode, currentCityName),
                pin: listing?.pin,
                phone: listing?.phone,
                formattedPhone: listing?.formattedPhone,
                XYZ: "xyz",
                guestCount: 1,
                roomCount: 1,
                bathroomCount: 1,
                imageSrc: listing?.imageSrc,
                coverSrc: listing?.coverSrc,
                price: 1,
                title: listing?.title,
                description: listing?.description,
                horary: listing?.horary,
                website: listing?.website || "",
                facebook: listing?.facebook || "",
                instagram: listing?.instagram || "",
                twitter: listing?.twitter || "",
              };
       
      setData(defaultValues);
    
    
    }, [listing])
    
    /* .Data for Modal windows only*/



    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpenProfileInfoModal, setisOpenProfileInfoModal] = useState(false);
    const [isOpenProfileAddressModal, setisOpenProfileAddressModal] = useState(false);
    const [isOpenHoraryModal, setisOpenHoraryModal] = useState(false);

    const onOpenProfileInfoModal = () => {
        setisOpenProfileInfoModal(!isOpenProfileInfoModal);
    }

    const onOpenProfileAddressModal = () =>{
        setisOpenProfileAddressModal(!isOpenProfileAddressModal);
    }

    const onOpenHoraryModal = () =>{
        setisOpenHoraryModal(!isOpenHoraryModal);
    }

    const onSubmit = (data:any) => {
        setIsLoading(true);
    
        axios.post(`/api/dashboard/listing/${listing.id}`, data)
          .then(() => {
            toast.success('Listing Updated');
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
        
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                Listing Details
            </h3>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <Avatar src={listing?.imageSrc || defaultImage}/>
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {listing?.title}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <Badge text={listing?.category}/>

                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {listing?.city}, {listing?.stateCode}, United States.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                            <SocialMediaButton icon={<FacebookIcon className='fill-current'/>} onClick={onOpenProfileInfoModal}/>
                            {/* <SocialMediaButton icon={<XIcon className="fill-current"/>} onClick={onOpenProfileInfoModal}/> */}
                            {/* <SocialMediaButton icon={<InIcon className="fill-current"/>} onClick={onOpenProfileInfoModal}/> */}
                            <SocialMediaButton icon={<TwitterIcon className="fill-current"/>} onClick={onOpenProfileInfoModal}/>
                            <SocialMediaButton icon={<IntagramIcon className="fill-current"/>} onClick={onOpenProfileInfoModal}/>
                            <SocialMediaButton icon={<WebsiteIcon className="fill-current"/>} onClick={onOpenProfileInfoModal}/>
                        </div>
                    </div>

                    <LargeButton label='Edit' onClick={onOpenProfileInfoModal}/>
                </div>
            </div>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Listing Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='Title'/>
                                <Text text={listing?.title}/>
                            </div>

                            <div>
                                <Label text='Category'/>
                                <Text text={listing?.category}/>
                            </div>

                            <div>
                                <Label text='Email Address'/>
                                <Text text={listing?.user?.email}/>
                            </div>

                            <div>
                                <Label text='Phone'/>
                                <Text text={listing?.formattedPhone}/>
                                {/* <Text text={listing?.formattedPhone2}/> */}
                            </div>

                          
                        </div>
                    </div>

                   <LargeButton label='Edit' onClick={onOpenProfileInfoModal}/>
                </div>
            </div>
            
    
                 {/* ADDRESS INFO     */}
            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Address
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='Country'/>
                                <Text text='United States'/>
                            </div>

                            <div>
                        
                                <Label text='City/State'/>
                                <Text text={`${listing?.city}, ${listing?.stateCode}`}/>
                            </div>

                            <div>
                                <Label text='Postal Code'/>
                                <Text text={listing?.zipcode}/>
                                
                            </div>

                            <div>
                                <Label text='Address'/>
                                <Text text={`${listing?.address} ${listing?.apartment}`}/>
                            </div>
                        </div>
                    </div>

                    <LargeButton label='Edit' onClick={onOpenProfileAddressModal}/>
                </div>
            </div>

{/* HOURS OF OPERATION */}
<div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Hours of Operation
                        </h4>

                        <div className="grid grid-cols-1">
                           
                           <div className='grid grid-cols-2 font-bold mt-5 md:mt-0'>
                            <FormLabel text="Day of the Week"/>
                            <FormLabel text="Hours of Operation"/>

                           </div>
                           {listing?.horary?.map((item:any,key:number)=>(
                                <div key={key} className='grid grid-cols-2'>
                                    <Label text={item?.day}/>
                                    <div className='flex'>
                                    {(!item?.closed && !item?.fulltime )  &&  <Text text={`${item?.open} - ${item?.close}`}/>}
                                    
                                    {item?.closed  ? <Text text='Closed' className='text-meta-1'/>:
                                    item?.fulltime && <Text text='24Hrs' className='text-meta-5'/>}
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                    <LargeButton 
                        label='Edit' 
                        onClick={()=>{
                            onOpenHoraryModal();
                        }}/>
                </div>
            </div>


        </div>
        {/* Modal Section */}
        <div>
            <ListingAddressModal 
                data={data} 
                onClose={onOpenProfileAddressModal} 
                onSubmit={onSubmit}
                open={isOpenProfileAddressModal}/>

            <ListingInfoModal 
                data={data} 
                onClose={onOpenProfileInfoModal} 
                onSubmit={onSubmit}
                open={isOpenProfileInfoModal}/>

            <ListingHoraryModal 
                data={data} 
                onClose={onOpenHoraryModal} 
                onSubmit={onSubmit}
                open={isOpenHoraryModal}
                />
        </div>
        {/* End Modal Section */}
        </>
    )
}

export default ListingDetailsInfo