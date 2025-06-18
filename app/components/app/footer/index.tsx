'use client';

import { User } from '@prisma/client'

const lightLogo = '/images/logo-black-text.png';
const darkLogo = '/images/logo-white-text.png';
const smallLogo = '/images/logo.png';
const favicon = '/images/logo/favicon.ico';


interface FooterProps {
  currentUser?: User | null;
  logos?:any;
}
const Footer: React.FC<FooterProps> = ({ currentUser,logos }) => {

  const currentLogos = { 
    lightLogo: logos? logos[0] : lightLogo, 
    darkLogo: logos ? logos[1] : darkLogo, 
    smallLogo: logos? logos[2] : smallLogo,
    favicon:logos? logos[3] : favicon};

  return (
             
    <div
      className="
      bg-black absolute bottom-0 w-[100%]
      ">
      <div className="text-gray-100 container mx-auto px-6 pt-10 pb-6 max-w-[960px] flex flex-col items-center" >
        <a onClick={(e) => e.preventDefault()} href="/">
          <img src={currentLogos?.darkLogo} width={250} />
        </a>
        <span className='mt-2'>© Weedgrowers. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer