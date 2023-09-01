'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  styles?: string;
  small?: boolean;
  icon?: IconType;
  color?: string,
  borderless?:boolean
  roundless?:boolean
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
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
        relative items-center justify-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${roundless || 'rounded-lg'}
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : color ? color : 'bg-rose-500'}
        ${outline ? 'border-black' : borderless ? borderless : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${styles ?styles : ''}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-2 md:top-3
          "
        />
      )}
      <div className="ml-2">
       {label}
      </div>
    </button>
   );
}
 
export default Button;