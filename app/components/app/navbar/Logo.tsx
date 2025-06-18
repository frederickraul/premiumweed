'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = (props:{logo:string}) => {
  const {logo} = props;
    const router = useRouter();

  return (
    <a onClick={(e)=>e.preventDefault()} href="/">
    <Image
        priority={false} 
        sizes="100"
        height={60}
        width={60}
        alt="Logo"
        className="md:block cursor-pointer w-[40px] sm:w-[40px] md:w-[50px] lg:w-[60px] "  
        src={logo}
        onClick={()=>{router.push('/')}} 
        quality={50}
        />
  </a>
  )
}

export default Logo