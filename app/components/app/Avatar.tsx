'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  size?: number;
  classname?:any;
}

const Avatar: React.FC<AvatarProps> = ({ src,size, classname }) => {
  return ( 
    <Image 
      className={`
        ${classname ? classname : " bg-gray-200"}
          object-cover 
          rounded-full 
          aspect-square
          w-auto
          
          `}
      priority={false}
      quality={100}
      height={size ? size : 100 } 
      width={size ? size : 100 } 
      alt="Avatar" 
      src={src || '/images/placeholder.jpg'}
    />
   );
}
 
export default Avatar;