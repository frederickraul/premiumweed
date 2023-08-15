'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

  return (
    <Image
        priority={false} 
        sizes="100"
        height={60}
        width={60}
        onClick={()=>{router.push('/')}}
        alt="Logo"
        className="md:block cursor-pointer w-[40px] sm:w-[40px] md:w-[50px] lg:w-[60px]"  
        src="/images/logo.png"
        quality={50}
        />
  )
}

export default Logo