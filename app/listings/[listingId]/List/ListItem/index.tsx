'use client';
import React from 'react';
import './styles.css';
import { AiFillStar } from 'react-icons/ai';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import StyledRating from '@/app/components/StyledRating';
import { colors } from '@/app/const/theme';



interface ListItemProps {
  item: any;
  small?: boolean;
  isLoading:() => void;
 
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  small,
  isLoading
}) => {
  const router = useRouter();
  let currentPath = usePathname();

  const params = useParams();
  if(params?.productId){
    currentPath = `/listings/${params.listingId}`;
  }

return(
  
  <div className='listItem-wrap cursor-pointer col-span-1 group min-w-[120px]'
  onClick={()=> {
    isLoading();
    router.push(`${currentPath}/menu/${item.id}`,item)
  }}
  >
    <div className='w-full aspect-square relative'>
    <Image src={item.coverSrc ? item.coverSrc : "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg"} fill alt='' className='group-hover:scale-110 transition'/>
    </div>
      <h4 className={`
          mt-4 
          font-bold 
          ${small ? 'text-sm' : 'text-xl'}
         
      `}>
        {item.title}</h4>
    <div className='flex flex-row mt-1'>
      <StyledRating size={small ? 13 : 18}/>
      <span className='ml-1 text-sm lg:text-base'>5.0</span>
    </div>
    <div className={`
        flex 
        flex-row 
        ${small ? 'justify-between' : 'justify-start'}
        font-bold 
        mt-1 
        ${small ? 'text-xs' : 'text-sm'}    
        ${small ? 'sm:text-sm' : 'sm:text-lg'}      
        text-neutral-500
        `}>
        <div>THC 75%</div>
        <div className={`${small ? 'ml-0' : 'ml-4'}`}>CBD 25%</div>
    </div>
    <div className={`
        ${small ? 'text-xs' : 'text-sm'}    
        ${small ? 'sm:text-sm' : 'sm:text-lg'}  
        font-bold uppercase mt-1 
        text-blue-600`}>
      {item.category}
    </div>
  </div>
);
}

export default ListItem;
