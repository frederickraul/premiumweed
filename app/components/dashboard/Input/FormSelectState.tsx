'use client';

import useCountries from "@/app/hooks/app/useCountries";
import Select from 'react-select';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export type StateSelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  value: string;
}

interface StateSelectProps{
  required?: boolean,
  countryCode: string;
  value?: StateSelectValue;
  label?:string;
  isClearable?:boolean;
  onChange: (value: StateSelectValue) => void;

}

const FormSelectState:React.FC<StateSelectProps> = ({
  required,
  isClearable,
  countryCode,
  value,
  label,
  onChange
}) => {
 
  const {getStatesOfCountry} = useCountries();
  return ( 
    <div>
      <div className="font-light text-neutral-500 mt-0 mb-1">
        {value && label}
      </div>
      <Select
        placeholder="State"
        isClearable={isClearable}
        options={getStatesOfCountry(countryCode)}
        value={value}
        onChange={(value) => onChange(value as StateSelectValue)}
        formatOptionLabel={(option: any) => (
            <div className="flex flex-row items-center gap-3 dark:black">
            <div>{option.flag}</div>
            <div >
              {option.label},
              <span className="ml-1">
                {option.region}
              </span>
            </div>

          </div>
        )}
        classNames={{
            control: ()=> ` p-1 
                            border-gray-300 
                            text-sm 
                            text-gray-800 
                            shadow-theme-xs 
                            placeholder:text-gray-400 
                            focus:border-brand-300 
                            focus:outline-hidden 
                            focus:ring-3 
                            focus:ring-brand-500/10 
                            dark:bg-transparent
                            dark:invert
                            dark:border-gray-150
                            dark:text-white/90 
                            dark:placeholder:text-white/30 
                            dark:focus:border-brand-800`,
            input: ()=> 'text-sm hover:none dark:text-black/90 ',
            option: ()=> 'text-sm hover:none dark:text-white',
            menu: ()=> 'text-sm hover:none dark:bg-gray-800 dark:text-black',

          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors:{
              ...theme.colors,
              primary: 'black',
              primary25: '#114499',
            }
          })}
          />
    </div>
    
  )
}

export default FormSelectState