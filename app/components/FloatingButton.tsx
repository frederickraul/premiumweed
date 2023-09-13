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

const FloatingButton: React.FC<ButtonProps> = ({ 
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
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative 
        z-90 
        bottom-10 
        right-8 
        w-20 
        h-20 
        rounded-full 
        drop-shadow-lg 
        flex 
        justify-center 
        items-center 
        text-4xl 
        hover:bg-neutral-800
        hover:border-neutral-800
        hover:drop-shadow-2xl 
        transition-colors
        duration-300
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
          size={38}
          className="
           
          "
        />
      )}

    </button>
   );
}
 
export default FloatingButton;