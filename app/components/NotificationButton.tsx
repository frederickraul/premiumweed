const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/been_tree.mp3`;


import { useEffect, useState } from 'react';
import '../notification.scss';
import useNotification from '../hooks/useNotifications';
import { SafeUser } from '../types';

interface NotificationButtonProps {
  onClick: () => void;
  style?: String;
  link?: string;
  currentUser?: any | null

}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  style,
  onClick,
  link,
  currentUser
}) => {
    const [isAnimating, setIsAnimating] = useState(true);
    const {hasNotifications} = useNotification({currentUser});
    const [count, setCount] = useState(hasNotifications?.length);
    const handleOn = () => setInterval(()=> setIsAnimating(!isAnimating), 5000);
    
    console.log();

    handleOn();


const Icon = () => (
    <svg width='28' height='30' viewBox='0 0 21 20'>
      <g transform='translate(2, 0)'>
        <path className='notification-bell__bow' d='M15,8.5 C15,5.43 12.86,2.86 10,2.18 L10,1.5 C10,0.671572875 9.32842712,0 8.5,0 C7.67157288,0 7,0.671572875 7,1.5 L7,2.18 C4.13,2.86 2,5.43 2,8.5 L2,14 L0,16 L0,17 L17,17 L17,16 L15,14 L15,8.5 Z' />
        <path className='notification-bell__clapper' d='M2.5,2 C2.64,2 2.77,2 2.9,1.96 C3.55,1.82 4.09,1.38 4.34,0.78 C4.44,0.54 4.5,0.27 4.5,0 L0.5,0 C0.5,1.1045695 1.3954305,2 2.5,2 L2.5,2 Z'  />
      </g>
    </svg>
   )


const Notification = () => (
    <div
      className={`notification-bell ${isAnimating ? 'is-animating' : ''}`}
      data-count={ count > 9 ? '9+' : count }>
      <Icon />
      
    </div>
  )
  

  return (
    <div onClick={onClick}>
    <Notification/>
  </div>
  )
}

export default NotificationButton



