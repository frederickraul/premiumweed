import React from 'react';
import ListItem from './ListItem';
import './styles.css';
import { AiFillFilter } from 'react-icons/ai';
import FloatingButton from '@/app/components/FloatingButton';
import { MdFilterList } from 'react-icons/md';

interface ListProps {
  list: any;
}
const List: React.FC<ListProps> = ({
  list
}) => (
  <>
  <div className='
  pt-4
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4
  gap-8
  mb-10'>
    {list.map((item:any) => (
      <ListItem key={item.id} item={item} />
      ))}
  </div>
      </>
);

export default List;
