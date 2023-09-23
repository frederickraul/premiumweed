import React from 'react';
import './styles.css';
import { AiFillStar } from 'react-icons/ai';

interface ListItemProps {
  item: any;
 
}

const ListItem: React.FC<ListItemProps> = ({
  item,
}) => (
  
  <div className='listItem-wrap cursor-pointer col-span-1 group'>
    <img src={item.coverSrc} alt='' className='group-hover:scale-110 transition'/>
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

export default ListItem;
