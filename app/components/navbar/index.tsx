'use client';

import { User} from '@prisma/client'
import Container from  '../Container';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types';
import { IoIosPin } from 'react-icons/io';
import NotificationButton from '../notification/NotificationButton';
import { useRouter } from 'next/navigation';
import Notificacion from '../notification';

interface NavbarProps {
    currentUser?: SafeUser | null
    notifications?: any;
}
const Navbar: React.FC<NavbarProps> = ({currentUser, notifications}) => {
  const route = useRouter();

  return (
    <div className='fixed w-full bg-white z-10 '>
    <div className=' w-full bg-white shadow-sm '>
        <div 
            className='
            py-4
            border-b-[1px]'>
            <Container>
                <div
                    className='
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3   
                    md:gap-0
                        '>
                    <div className='flex flex-row items-center justify-around'>
                    <Logo/>
                    <div className='hidden md:flex items-center'><Search/></div>
                     <div className='flex flex-row ml-4 md:ml-2'>
                        <IoIosPin size={14}/>
                        <div className='font-bold text-xs'>
                            San Diego: 50 Miles
                        </div>
                    </div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <UserMenu currentUser={currentUser}/>
                        <div className='ml-2'>
                            <Notificacion currentUser={currentUser} notifications={notifications}/>
                        </div>
                    </div>
             

                </div>
                <div className='md:hidden flex items-center justify-center'>
                    <Search/>
                </div>
                <Categories/>
            </Container>
        </div>
    </div>
    </div>
  )
}

export default Navbar