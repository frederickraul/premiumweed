'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  full?: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  styles?: string;
  small?: boolean;
  icon?: IconType;
  iconSize?: number;
  iconRight?:boolean;
  textLeft?:boolean;
  color?: string,
  borderless?:boolean
  roundless?:boolean
}

const Button: React.FC<ButtonProps> = ({ 
  full,
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
  iconSize,
  iconRight,
  textLeft,
  roundless,
  color,
  borderless,
  styles
}) => {
  return ( 
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative 
        items-center 
        justify-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${roundless || 'rounded-lg'}
        hover:opacity-80
        transition
        w-full
        px-0
        ${outline ? 'bg-white' : color ? color : 'bg-black'}
        ${outline ? 'border-black' : borderless ? borderless : 'border-black'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}
        ${small ? 'py-1' : 'py-2 sm:py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${styles ?styles : ''}
      `}
    >
      {Icon && (
        <Icon
          size={iconSize ? iconSize :small ? 18 : 24}
          className={`
            absolute
            ${iconRight ? 'right-4' : 'left-4'}
            ${small ? 'top-1' : 'top-1 sm:top-3'}
          `
          }/>
      )}
      <div className={
        `${iconRight && 'mr-3 sm:ml-0'}
            whitespace-nowrap
            ${textLeft && 'text-left ml-12 sm:ml-0'} 
            sm:text-center
        `}>
       {label}
      </div>
    </button>
   );
}
 
export default Button;