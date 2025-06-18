import React from 'react'
import PhoneInput from 'react-phone-input-2';

const ProfileInputPhone = (props: {country:any, value: any, onChange: any,type?:string }) => {
    const { country, value, onChange,type } = props;

    const handleInputChange = (phone:any,formattedPhone:any) =>{
        onChange(phone,formattedPhone);
    }

    return (
        <PhoneInput 
        disableCountryCode
        country={country}
        value={value}
        placeholder=''
        onChange={(phone,data,evet,formattedPhone) => handleInputChange(phone,formattedPhone)}
        inputClass={`    
            px-4.5        
            w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
        />
    )
}

export default ProfileInputPhone