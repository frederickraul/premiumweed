'use client';

import { useEffect, useMemo, useState } from "react";
import { categories } from '../navbar/Categories';
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from '../Heading';
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import CountrySelect from "../inputs/CountrySelect";
import InputUnregistered from '../inputs/InputUnregistered';


enum STEPS{
  DESCRIPTION = 1,
  CATEGORY = 2,
  ADDRESS = 3,
  LOCATION = 4,
  INFO =5,
  OPERATION =6,
  COVER =7,
  LOGO =8,
  FINISH = 9
}

const week = [
  {day: "Monday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Tuesday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Wednesday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Thursday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Friday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Saturday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
  {day: "Sunday", open:"12:00:00", close:"13:00:00",fulltime: false, closed: false},
];

const RentModal = () => {


  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [centerMap, setCenterMap] = useState([]);
  const [zoomMap, setZoomMap] = useState(2);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      category: '',
      address: '',
      apartment: '',
      zipCode: '',
      location: null,
      state: null,
      city: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc:'',
      coverSrc:'',
      price: 1,
      title: '',
      description: '',
      horary: week,
    }
  });

  const category = watch('category');
  const location = watch('location');
  const state = watch('state');
  const city = watch('city');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const coverSrc = watch('coverSrc');
  const horary = watch('horary');
  
  useEffect(() => {
    resetStateSelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [location]);


  useEffect(() => {
    resetCitySelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [state]);

  useEffect(() => {
    setZoomMap(8);
    setCenterMap(city?.latlng);    
  }, [city]);

  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }), [centerMap]);

  const StateSelect = useMemo(() => dynamic(() => import ("../inputs/StateSelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }), [location]);

  const CitySelect = useMemo(() => dynamic(() => import ("../inputs/CitySelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps

  }), [state]);


  const resetStateSelect = () => {
    setCustomValue('state', null);
    setCustomValue('city', null);
    setSelectedCountry(location?.value);
    setCenterMap(location?.latlng);
    setZoomMap(4);
  }
  
  const resetCitySelect = () => {
    setCustomValue('state', null);
    setCustomValue('city', null);
    setSelectedCountry(location?.value);
    setCenterMap(location?.latlng);
    setZoomMap(4);
  }


  //For Regular Inputs
  const setCustomValue = (id: string, value:any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }


  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.FINISH){
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(()=>{
      toast.success('Listing Created');
      router.refresh();
      reset();
      setStep(STEPS.DESCRIPTION);
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    }); 
  }
  const actionLabel = useMemo(() => {
    if(step === STEPS.FINISH){
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.DESCRIPTION){
      return undefined;
    }

    return 'Back';
  }, [step]);


// DESCRIPTION STEP
 let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you like describe your listing?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr/>
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )


// CATEGORY STEP
if(step === STEPS.CATEGORY){
   bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your listing?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid
          grid-cols-
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        ">
        {categories.map((item) =>(
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category)=>{
                setCustomValue('category',category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}

            />
          </div>
        ))}
      </div>

    </div>
  )
}

// LOCATION STEP
  if(step === STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Where is your listing located?"     
            subtitle="Help guest find you!"
          />
          <CountrySelect
            id='location'
            register={register}
            errors={errors}
            required
            value={location}
            onChange={(value)=>{setCustomValue('location',value)}}
          />

          <StateSelect
            id='state'
            register={register}
            errors={errors}
            required
            countryCode={selectedCountry}
            value={state}
            onChange={(value)=>{setCustomValue('state',value)}}
          />

          <CitySelect
            stateCode={selectedState}
            countryCode={selectedCountry}
            value={city}
            onChange={(value)=>{setCustomValue('city',value)}}
          />
          <Map 
            center={centerMap}
            zoom={zoomMap}
          />
      </div>
    )
  }

  // INFO STEP
  if(step === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share contact info"     
            subtitle="What your business contact info?"
          />
          <Input
            id="phone"
            label="Phone number"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr/>
          <Input
            id="website"
            label="Website Link"
            optional
            disabled={isLoading}
            register={register}
            errors={errors}
          />
      </div>
    )
  }

  // INFO STEP
  if(step === STEPS.OPERATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share business hours"     
            subtitle="When are you opening?"
          />
         
         <div className="flex flex-col">
         {
           horary.map((item:any) =>(
             
            <div className="flex flex-rol items-center justify-center mb-2">
              <div className="mr-4 min-w-[100px] font-bold">
                  {item.day}
              </div>
              <div className="max-w-[220px]">
                <InputUnregistered
                  value={item.open}
                  label=""
                  small
                  type="time"
                  disabled={isLoading}
                  onChange={(e) => {
                    item.open = e.target.value;
                    setValue('horary',[...horary]);
                  }}
              />
              </div>
            <div className="font-bold m-2"> - </div>
            <div className="max-w-[220px]">
              <InputUnregistered
                  value={item.close}
                  label=""
                  type="time"
                  small
                  disabled={isLoading}
                  onChange={(e) => {
                    item.close = e.target.value;
                    setValue('horary',[...horary]);
                  }}
              />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center pl-2 ml-4">
                  <InputUnregistered
                        value={item.fulltime}
                        label=""
                        type="checkbox"
                        disabled={isLoading}
                        checked={item.fulltime}
                        onChange={(e) => {
                          item.fulltime = !item.fulltime;
                          setValue('horary',[...horary]);
                        }}
                    />
                        <label className="w-full ml-2 text-sm font-medium text-gray-900 min-w-[100px]"> Open 24 hours</label>

                  </div>
                  <div className="flex items-center pl-2 ml-4">
                  <InputUnregistered
                        checked={item.closed}
                        label=""
                        type="checkbox"
                        disabled={isLoading}
                        onChange={(e) => {
                          item.closed = !item.closed;
                          setValue('horary',[...horary]);
                        }}
                    />
                  <label className="w-full ml-2 text-sm font-medium text-gray-900 min-w-[100px]"> Closed </label>

                </div>
            </div>
            <hr/>
          </div>
            ))
          }
          </div>
         </div>
    )
  }


    // IMAGES STEP
    if(step === STEPS.LOGO){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a logo of your listing"
            subtitle="show guest what your logo looks like!"
          />
          <ImageUpload 
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )
    }

        // IMAGES STEP
    if(step === STEPS.COVER){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a cover of your listing"
            subtitle="show guest what your cover looks like!"
          />
          <ImageUpload 
            value={coverSrc}
            onChange={(value) => setCustomValue('coverSrc', value)}
          />
        </div>
      )
    
    }
    
    // ADDRESS STEP
    if(step === STEPS.ADDRESS){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Bussiness Address"
            subtitle="show where they can find you!"
          />
          <Input
            id="address"
            label="Address"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr/>
          <Input
            id="apartment"
            label="Apt/Suite/other"
            optional
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          <hr/>
          <Input
            id="zipCode"
            label="Zip code"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    
    }

    // PRICE STEP
    if(step === STEPS.FINISH){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Are you ready?"
            subtitle="You are about to create a new listing!!!"
          />
         
         
        </div>
      )
    
    }

  return (
   <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit) }
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step ===STEPS.DESCRIPTION ? undefined : onBack}
    title="Weedgrowers your home"
    body={bodyContent}
   />
  )
}

export default RentModal