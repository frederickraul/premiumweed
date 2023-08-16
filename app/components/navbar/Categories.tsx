'use client';

import React from 'react';
import Container from '../Container';
import { usePathname,useSearchParams } from 'next/navigation';

import { TbBeach, TbMedicineSyrup, TbMountain, TbSeeding } from 'react-icons/tb';
import { GiBarStool, GiDeliveryDrone, GiDoctorFace, GiGraveFlowers, GiMedicinePills, GiWaterFountain, GiWindmill } from 'react-icons/gi';
import {  MdOutlineVilla, MdRestaurant, MdWarehouse } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { BiBus } from 'react-icons/bi';

export const categories = [
  {
    label: 'Growers',
    icon: GiGraveFlowers,
    description:'Growers'
  },
  {
    label: 'Delivery',
    icon: GiDeliveryDrone,
    description:'Delivery'
  },
  {
    label: 'Dispensaries',
    icon: MdWarehouse,
    description:'Dispensaries'
  },
  {
    label: 'Hydroponics',
    icon: GiWaterFountain,
    description:'Hydroponics'
  },
  {
    label: 'Doctors',
    icon: TbMedicineSyrup,
    description:'Doctors'
  },
  {
    label: 'Vendors',
    icon: MdOutlineVilla,
    description:'Vendors'
  },
  {
    label: 'Bus Tours',
    icon: BiBus,
    description:'Bus Tours'
  },
  {
    label: 'Restaurant',
    icon: MdRestaurant,
    description:'Restaurant'
  },
  {
    label: 'Bars',
    icon: GiBarStool,
    description:'Bars'
  },
  {
    label: 'Lounge',
    icon: TbMountain,
    description:'Lounge'
  },
  {
    label: 'Seeds',
    icon: TbSeeding,
    description:'Seeds'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }



  return (
    <Container>
      <div className='
        pt-4
        flex
        flex-row
        items-center
        justify-between overflow-x-auto
        max-w-max
        gap-2
      '>
        {categories.map((item)=> (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}

      </div>
    </Container>
  )
}

export default Categories