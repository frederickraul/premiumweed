'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  hint?: string;
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  styles?: string;
  small?: boolean;
  icon?: IconType;
  color?: string,
  textColor?:string,
  hoverColor?: string,
  borderless?:boolean
  roundless?:boolean
}

const FloatingButton: React.FC<ButtonProps> = ({ 
  label, 
  hint,
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
  roundless,
  color,
  textColor,
  hoverColor,
  
  borderless,
  styles
}) => {
  return ( 

    <button
      title={hint}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative 
        z-90 
        
        rounded-full 
        drop-shadow-2xl
        flex 
        justify-center 
        items-center 
        text-xl
        ${hoverColor ? hoverColor : 'hover:bg-neutral-800'} 
        hover:border-transparent
        hover:drop-shadow-2xl 
        transition-colors
        duration-300
        ${outline ? 'bg-white' : color ? color : 'bg-rose-500'}
        ${outline ? 'border-black' : borderless ? borderless : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'p-2' : 'p-3 sm:p-4'}
        ${small ? 'font-light' : 'font-semibold'}
        
        ${styles ?styles : ''}
      `}
    >
      {Icon && (
        <Icon
          className={`
            text-2xl
            ${small? 'sm:text-xl' : 'sm:text-3xl'}
          `}
          
        />
      )}
      <span className={small ? "hidden sm:block text-sm ml-2 mr-2 font-bold" : "text-sm"}>{label}</span>
    </button>
   );
}
 
export default FloatingButton;