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
  isLoading:() => void;
 
}

const ListItem: React.FC<ListItemProps> = ({
  item,
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
      <h4 className='mt-4 font-bold text-sm sm:text-base'>
        {item.title}</h4>
    <div className='flex flex-row mt-1'>
      <StyledRating/>
      <span className='ml-1'>5.0</span>
    </div>
    <div className='
        flex 
        flex-row 
        justify-between 
        font-bold 
        mt-1 
        text-xs
        sm:text-sm 
        text-neutral-500'>
        <div>THC 75%</div>
        <div>CBD 25%</div>
    </div>
    <footer className='font-bold uppercase mt-1 text-blue-600'>
      {item.category}
    </footer>
  </div>
);
}

export default ListItem;
