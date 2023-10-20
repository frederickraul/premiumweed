'use client';
import React from 'react';
import './styles.css';
import { AiFillStar } from 'react-icons/ai';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import StyledRating from '@/app/components/StyledRating';
import { colors } from '@/app/const/theme';
import EditButton from '@/app/components/EditButton';
import DeleteButton from '@/app/components/DeleteButton';



interface ListItemProps {
  item: any;
  small?: boolean;
  isLoading:() => void;
  edit?:boolean;
  onEditAction?:any;
  openConfirmModal?:(id:string)=>void;
 
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  small,
  isLoading,
  edit,
  onEditAction,
  openConfirmModal
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
    !edit && isLoading();
    !edit && router.push(`${currentPath}/menu/${item.id}`,item)
  }}
  >
    <div className='w-full aspect-square relative'>
    <Image src={item.coverSrc ? item.coverSrc : "/images/Product-Image-Coming-Soon2.jpg"} fill alt='' className='group-hover:scale-110 transition'/>
   <div className='relative mt-5 mr-2'>
   {edit && <EditButton action={()=>{onEditAction(item)}}/>}
   {edit && <DeleteButton action={()=>{openConfirmModal&&openConfirmModal(item?.id)}}/>}
   </div>
    </div>
      <h4 className={`
          mt-4 
          font-bold 
          relative
          ${small ? 'text-sm' : 'text-lg'}
         
      `}>
        {item.title}
        </h4>
    {item.title && 
    <div className='flex flex-row mt-1'>
      <StyledRating size={small ? 13 : 16}/>
      <span className='ml-1 text-sm lg:text-base'>5.0</span>
    </div>
    }
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
        <div className='text-base'>
          THC {item.THC}%
          </div>
        <div className={`${small ? 'ml-0 text-base' : 'ml-4 text-base'}`}>
        CBD {item.CBD}%
          </div>
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