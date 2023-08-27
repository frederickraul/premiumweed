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
import { AiOutlineClockCircle } from "react-icons/ai";
import CustomSelect from "../inputs/Select";
import { hours } from "@/app/const/hours";
import InputPhone from "../inputs/InputPhone";
import { log } from "console";


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
  {day: "Monday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Tuesday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Wednesday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Thursday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Friday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Saturday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
  {day: "Sunday", open:"12:00 PM", close:"13:00 PM",fulltime: false, closed: false},
];

const defaultLocation = {
  "value": "US",
  "label": "United States",
  "flag": "🇺🇸",
  "latlng": [
      "38.00000000",
      "-97.00000000"
  ]
};

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
      visibleAddress:false,
      apartment: '',
      zipCode: '',
      location: defaultLocation,
      state: null,
      city: null,
      pin: null,
      phone:'',
      formattedPhone:'',
      XYZ: "xyz",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc:'',
      coverSrc:'',
      price: 1,
      title: '',
      description: '',
      website:'',
      horary: week,
    }
  });

  const category = watch('category');
  const location = watch('location');
  const state = watch('state');
  const city = watch('city');
  const pin = watch('pin');
  const visibleAddress = watch('visibleAddress');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const coverSrc = watch('coverSrc');
  const horary = watch('horary');
  const phone = watch('phone');
  const formattedPhone = watch('formattedPhone');
  const website = watch('website');
  
  // //Testing Area  
  // useEffect(() => {
  //   if(pin){
  //     console.log(pin[0] + ','+pin[1]);
  //   }
  // }, [pin]);
  

  // .Testing Area

  useEffect(() => {
    resetStateSelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  useEffect(() => {
    resetCitySelect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    saveCitySelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [centerMap]);

  const StateSelect = useMemo(() => dynamic(() => import ("../inputs/StateSelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedCountry]);

  const CitySelect = useMemo(() => dynamic(() => import ("../inputs/CitySelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedState]);


  const resetStateSelect = () => {
    setCustomValue('state', null);
    setCustomValue('city', null);
    setCustomValue('pin', location?.latlng);
    setSelectedCountry(location?.value);
    setCenterMap(location?.latlng);
    setZoomMap(4);
  }
  
  const resetCitySelect = () => {
    setCustomValue('city', null);
    setCustomValue('pin', state?.latlng);
    setSelectedState(state?.value);
    setCenterMap(state?.latlng);
    setZoomMap(5);

      if(state?.value === undefined){
        setCenterMap(location?.latlng);
        setCustomValue('pin', location?.latlng);
        setZoomMap(4);
      }
  }

  const saveCitySelected = () =>{
    setZoomMap(8);
    setCenterMap(city?.latlng); 
    setCustomValue('pin', city?.latlng);  
    if(city?.value === undefined){
      setCenterMap(state?.latlng);
      setCustomValue('pin', state?.latlng);
      setZoomMap(4);
    }
  }
  


  //For Regular Inputs
  const setCustomValue = (id: string, value:any) => {    
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  //Week Hours
  const setWeekHours = (itemSelected: any) => {
    horary.map((item:any)=>{
        item.open = itemSelected.open;
        item.close = itemSelected.close;
        item.fulltime = itemSelected.fulltime;
        item.closed = itemSelected.closed;
        setValue('horary',[...horary]);
    })
  }

  //Weekend
  const setAllDaysHours = (itemSelected: any) => {
    horary.map((item:any)=>{
      item.open = itemSelected.open;
      item.close = itemSelected.close;
      item.fulltime = itemSelected.fulltime;
      item.closed = itemSelected.closed;
      setValue('horary',[...horary]);
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
        label="Business Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
    </div>
  )


// CATEGORY STEP
if(step === STEPS.CATEGORY){
   bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Listing Category"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid
          grid-cols-
          md:grid-cols-2
          gap-3
          max-h-[45vh] 2xl:max-h-[50vh]
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

// ADDRESS STEP
if(step === STEPS.ADDRESS){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Bussiness Address"
        subtitle="show where they can find you!"
      />
      <div 
        className="
          grid
          gap-3 2xl:gap-4
          overflow-y-auto max-h-[45vh] 2xl:max-h-[50vh]
        ">
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
    </div>
  )

}

// LOCATION STEP
  if(step === STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8 ">
          <Heading
            title="Where is your listing located?"     
            subtitle="Help guest find you!"
          />
            <div className="flex flex-col ">
            <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

              <CountrySelect
                id='location'
                register={register}
                errors={errors}
                required
                value={location}
                onChange={(value)=>{
                  setCustomValue('location',value);
                  
                }}
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
              <InputUnregistered
                    label=""
                    type="hidden"
                    disabled={isLoading}
                    onChange={(value)=>{setCustomValue('pin',value)}}
 
                  />
              <Map 
                center={centerMap}
                zoom={zoomMap}
              />
              </div>
            </div>
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
          <div 
            className="
              grid
              gap-3 2xl:gap-4
              overflow-y-auto max-h-[45vh] 2xl:max-h-[50vh]
            ">
              <InputPhone
                country="us"
                //id="phone"
                label="Phone number"
                type="number"
                disableDropdown
                disabled={isLoading}
                value={phone}
                onChange={(phone,formattedPhone) => {
                  setValue('phone',phone);
                  setValue('formattedPhone',formattedPhone);
                }}
                //register={register}
                //errors={errors}
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
           horary.map((item:any,i:number) =>(
            <div key={item.day} className="flex flex-col mb-2">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
              <div className="sm:mr-4 pl-5 sm:pl-0 min-w-[100px] w-[100%] sm:w-auto font-bold text-left">
                  {item.day}
              </div>
              <div className="flex flex-row">
              <div className="w-[150px]">
                <CustomSelect
                    options={hours}
                    value={item.open}
                    onChange={(value) => {
                      item.open = value;
                      setValue('horary',[...horary]);
                    }}
                />
               
              </div>
            <div className="font-bold m-2"> - </div>
            <div className="w-[150px]">
                <CustomSelect
                    options={hours}
                    value={item.close}
                    onChange={(value) => {
                      item.close = value;
                      setValue('horary',[...horary]);
                    }}
                />
            </div>
              </div>
            <div className="flex flex-row sm:flex-col">
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
          </div>
            {item.day === "Monday" &&(
              <div className="flex flex-row justify-center items-center mb-2 text-green-700 cursor-pointer"
              onClick={()=>{setWeekHours(item);}
            }
            >
              <AiOutlineClockCircle/>
              <div>{  'Use these hours for all week days'}</div>
            </div>
            )}
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
    size={step === STEPS.OPERATION ? 'lg' : 'md'}
    disabled={isLoading}
   />
  )
}

export default RentModal