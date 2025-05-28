import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  chatId?: string;
}

export async function GET(
    request:Request,
    { params }: { params: IParams }
    ) {

  
      const { chatId } = params;
      console.log(`id: ${chatId}`)

  
      const currentUser = await getCurrentUser();
      if(!currentUser){
        return NextResponse.error();
      }
  
      const messages = await prisma.message.findMany({
        where: {
          chatId: chatId        
        }
      });

      const SafeMessages = messages.map((item) => ({
        ...item,
       
        timestamp: Date.parse(item.createdAt.toISOString()),
       }));
       
   
  
      return NextResponse.json(SafeMessages);
  
  }
  
  

