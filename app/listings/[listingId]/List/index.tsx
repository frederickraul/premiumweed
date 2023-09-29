'use client';

import React from 'react';
import ListItem from './ListItem';
import './styles.css';
import { AiFillFilter } from 'react-icons/ai';
import FloatingButton from '@/app/components/FloatingButton';
import { MdFilterList } from 'react-icons/md';

interface ListProps {
  list: any;
  items?: number;
  small?:boolean;
  isLoading:() => void;
}
const List: React.FC<ListProps> = ({
  list,
  items,
  small,
  isLoading
}) => (
  <>
      {/* ${items == 5 ? 'flex flex-row w-[500px] sm:w-full sm:grid sm:grid-cols-5 overflow-x-scroll' : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} */}
<div className='w-full overflow-x-auto sm:overflow-hidden'>

  <div className={`
    pt-4
    ${items == 5 ? 'grid grid-cols-5 min-w-[700px] ' : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}
    gap-8
    mb-10
    `}>
    {list.map((item:any) => (
      <ListItem small={small} key={item.id} item={item} isLoading={isLoading} />
      ))}
  </div>
  </div>
      </>
);

export default List;
