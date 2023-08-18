'use client';

import { hours } from "@/app/const/hours";

interface SelectProps{
    value?: string;
    onChange: (value?: string) => void;
}

const CustomSelect:React.FC<SelectProps> = ({
  value,
  onChange
}) => {
  return ( 
    <div className="custom-select relative">
      <select
        placeholder=""
        value={value}
        className="
        relative
        peer
        w-full
        p-4
        pr-[40px]
        font-light
        bg-transparent
        border-2
        rounded-md
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        custom-select z-10
        "
        onChange={e => onChange(e.target.value)} 
      >
        {hours.map((hour,i)=>(
          <option key={i}>{hour.label}</option>
        ))}
        </select>
        <i className="z-0"></i>
    </div>
    
  )
}

export default CustomSelect