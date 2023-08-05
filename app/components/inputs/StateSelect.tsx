'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from 'react-select';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export type StateSelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface StateSelectProps{
  id: string;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  required?: boolean,

    countryCode: string;
    value?: StateSelectValue;
    onChange: (value: StateSelectValue) => void;
}

const StateSelect:React.FC<StateSelectProps> = ({
  id,
  register,
  errors,
  required,

  countryCode,
  value,
  onChange
}) => {
  const {getStatesOfCountry} = useCountries();
  return ( 
    <div>
      <Select
        id={id}
        {...register(id,{required})}
        placeholder="Anywhere"
        isClearable
        options={getStatesOfCountry(countryCode)}
        value={value}
        onChange={(value) => onChange(value as StateSelectValue)}
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
          option: ()=> 'text-lg'
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

export default StateSelect