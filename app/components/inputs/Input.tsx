
'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps{
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  small?: boolean;
  optional?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  optional,
  type,
  disabled,
  small,
  formatPrice,
  required,
  register,
  errors

}) => {
  return (
    <div className="w-full relative">
      {formatPrice  && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id,{required})}
        placeholder={placeholder? placeholder : " "}
        type={type}
        className={`
          peer
          w-full
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus: border-red-500' : 'focus:border-black'}
          ${small ? 'text-xs' : 'text-sm 2xl:text-base'}
          ${small ? 'p-2' : 'p-2 2xl:p-4'}
          ${small ? 'p-3' : label ? 'pt-4 2xl:pt-6' : 'pt-3'}
          ${small ? 'font-light' : 'font-semibold'}
          ${type === "checkbox" ? 'w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600': ''}
        `}
      />
       {errors[id]  && (<p className="text-red-500 text-xs italic">Please fill out this field.</p>)}
      

      
      <label 
        className={`
          absolute
          text-xs 2xl:text-base
          duration-150
          transform
          -translate-y-3
          top-4 2xl:top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
          ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {optional && <span className="text-zinc-700"> (Optional)</span>}
      </label>
    </div>
  )
}

export default Input