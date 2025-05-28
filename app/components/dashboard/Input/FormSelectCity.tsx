'use client';

import useCountries from "@/app/hooks/app/useCountries";
import { red } from "@mui/material/colors";
import Select,{ createFilter} from "react-select";
import WindowedSelect from "react-windowed-select";



export type CitySelectValue ={
  stateCode: String;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CitySelectProps{
    label?: string;
    stateCode?: string;
    countryCode: string;
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
    isClearable?:boolean;
}

const FormSelectCity:React.FC<CitySelectProps> = ({
  label,
  countryCode,
  stateCode,
  value,
  isClearable,
  onChange
}) => {
  // console.log("City Select");
  // console.log(value);
  // console.log('->>>>>>>>>>>>');
  
  const {getCitiesOfState, getCitiesOfCountry} = useCountries();

  const cities = stateCode? getCitiesOfState(countryCode, stateCode): getCitiesOfCountry(countryCode) || [];

  return ( 
    <div className="w-full relative h-10 ">
      <div className="font-light text-neutral-500 mt-0 mb-1">
        {value && label}
      </div>
    <WindowedSelect 
      windowThreshold={20}
      placeholder="City"
      isClearable={isClearable}
      options={cities}
      value={value}
      onChange={(value) => onChange(value as CitySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3 dark:black">
            <div className="">{option.stateCode}</div>
            <div className="">
              {option.label}
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

export default FormSelectCity