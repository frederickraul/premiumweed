'use client';
import React from 'react';
import './styles.css';
import { AiFillStar } from 'react-icons/ai';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';



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
    <header>
      <h4>{item.title}</h4>
      <span className='flex flex-row items-center bg-black text-white py-1 px-2'>{item.rating} <AiFillStar size={14} className='text-yellow-400'/></span>
    </header>
    <footer>
      <p>  

        <b>{item.serviceTime}</b> <span> Delivery Fee ${item.deliveryFee}</span>
      </p>
      <p>
        <b>${item.price}</b>
      </p>
    </footer>
  </div>
);
}

export default ListItem;
