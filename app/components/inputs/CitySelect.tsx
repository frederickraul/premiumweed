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
    stateCode: string;
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
  
  const {getCitiesOfState} = useCountries();
  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable={isClearable}
        options={getCitiesOfState(countryCode, stateCode)}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
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