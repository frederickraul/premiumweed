'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

  return (
    <Image
        onClick={()=>{router.push('/')}}
        alt="Logo"
        className="md:block cursor-pointer sm:w-[40px] md:w-[50px] lg:w-[60px]"  
        height="60"
        width="60"
        src="/images/logo.png"
        quality={50}
        priority={false} 
        />
  )
}

export default Logo