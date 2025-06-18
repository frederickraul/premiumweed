import React from 'react'

const ProfileTextarea = (props:{value:string, type?:string, placeholder?:string, icon?:boolean, onChange:any}) => {
    const {value, type, placeholder, icon, onChange} = props;

    const handleInputChange = (e:any) =>{
        const value = e.target.value;
        onChange(value);
    }

    return (
        <textarea
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            rows={6}
            placeholder="Write your bio here"
            defaultValue={value}
            onChange={handleInputChange}
        ></textarea>
    )
}

export default ProfileTextarea