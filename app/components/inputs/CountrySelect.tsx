'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from 'react-select';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type CountrySelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps{
    id: string;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    required?: boolean,
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
  id,
  register,
  errors,
  required,
  value,
  onChange
}) => {
  const {getAll,getByValue, getStatesOfCountry} = useCountries();
  return ( 
    <div>
      <Select
        id={id}
        {...register(id,{required})}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-800 ml-1">
                {option.region}
              </span>
            </div>

          </div>
        )}
        classNames={{
          control: ()=> 'p-3 border-2',
          input: ()=> 'text-lg',
          option: ()=> 'text-lg',
          
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors:{
            ...theme.colors,
            primary: 'black',
            primary25: '#e4ffe6'
          }
        })}
        
      />
    </div>
    
  )
}

export default CountrySelect