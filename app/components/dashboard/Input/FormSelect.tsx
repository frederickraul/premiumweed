import React from 'react'

const FormSelect = (props:{list:any, value:any, onChange:any}) => {
    const {list, value,onChange}= props;
    const handleSelectChange = (e:any) =>{
        onChange(e.target.value);
    }
  return (
    <select 
         value={value}
        onChange={handleSelectChange}
        className="
            dark:bg-dark-900 
            shadow-theme-xs 
            focus:border-brand-300 
            focus:ring-brand-500/10 
            dark:focus:border-brand-800 
            h-11 
            w-full 
            appearance-none 
            rounded-lg border 
            border-gray-300 
            px-4 
            py-2.5 
            pr-11 
            text-sm 
            bg-transparent 
            bg-none 
          
            text-gray-800 
            shadow-theme-xs 
            placeholder:text-gray-400 
            focus:border-brand-300 
            focus:outline-hidden 
            focus:ring-3 
            focus:ring-brand-500/10 
            dark:invert
            dark:border-gray-150 
            dark:bg-gray-150 
            dark:text-black/90 
            dark:placeholder:text-white/30 
            dark:focus:border-brand-800">

        <option value="" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Select Option
        </option>
        {
            list?.map((item:any,key:number)=>(
                <option key={key} value={item?.value} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                    {item?.label}
                </option>
            ))
        }
                          
        </select>
  )
}

export default FormSelect