import React from 'react'

const ProfileInput = (props:{value:string, type?:string, placeholder?:string, icon?:boolean, onChange:any, error?:boolean}) => {
    const {value, type, placeholder, icon, onChange,error} = props;

    const handleInputChange = (e:any) =>{
        onChange(e.target.value);
    }

    return (
        <>
        <input
            className={`${icon ? 'pl-11.5': 'px-4.5'} w-full rounded border border-stroke bg-gray py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
            type={`${type ? type : 'text'}`}
            placeholder={placeholder}
            defaultValue={value}
            onChange={handleInputChange}
        />
        {error && <div className='text-red-500 font-bold'>The field is required</div>}
        </>

    )
}

export default ProfileInput