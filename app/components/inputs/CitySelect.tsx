'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from 'react-select';

export type CitySelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CitySelectProps{
    stateCode?: string;
    countryCode: string;
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
    isClearable?:boolean;
}

const CitySelect:React.FC<CitySelectProps> = ({
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

  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable={isClearable}
        options={stateCode? getCitiesOfState(countryCode, stateCode): getCitiesOfCountry(countryCode)}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.stateCode}</div>
            <div>
              {option.label}
            </div>

          </div>
        )}
        classNames={{
          control: ()=> 'p-1 2xl:p-3 border-2',
          input: ()=> '2xl:text-lg',
          option: ()=> '2xl:text-lg',
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

export default CitySelect