'use client'
import React, { useEffect, useState } from 'react'

const ToggleSwitch = (props: {id:number, active: boolean, label?:string,onChange:any}) => {
    const { active,label,onChange } = props;
    
    const [switcherToggle, setSwitcherToggle] = useState(false);

    useEffect(() => {
      setSwitcherToggle(active);
    }, [active])

    const handleChange = () =>{
        onChange(switcherToggle);
        setSwitcherToggle(!switcherToggle);
    }
    


    return (
        <div className='flex justify-center items-center'>
            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                <div className="relative">
                    <input type="checkbox"  className="sr-only" onChange={handleChange}/>
                    <div className={`
                            block 
                            h-6 
                            w-11 
                            rounded-full 
                            bg-brand-500 
                            dark:bg-brand-500
                            ${switcherToggle ? 'bg-indigo-500 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-white/10'}
                            `}>
                    </div>
                    <div
                        className={`
                            shadow-theme-sm 
                            absolute 
                            top-0.5 
                            left-0.5 
                            h-5 
                            w-5 
                            rounded-full 
                            bg-white
                            duration-300 
                            ease-linear 
                            ${switcherToggle ? 'translate-x-full' : 'translate-x-0'}
                            `}></div>
                </div >

                {label}
            </label >
        </div >
    )
}

export default ToggleSwitch


