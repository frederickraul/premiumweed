import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
     lastNotificationId?: string;
   }



   export async function GET(
     request:Request,
     { params }: { params: IParams }
     ) {
       const currentUser = await getCurrentUser();
       if(!currentUser){
         return NextResponse.error();
       }
       const { lastNotificationId } = params;

    const notifications = await prisma.notification.findMany({
      where:{
        AND:[
          {
            recipientId: currentUser.id,
          },{
            status: 0,
          }
        ]
      },
      orderBy: [
        {
          status: 'asc',
        },
        {
          timestamp: 'desc'
        }
      ],
      take: 1,
      include:{
        sender:true,
      }
  });


  if(!notifications){
    const data = {
      id:0,
      timestamp: 0
    }
    return NextResponse.json(data);
   }


   //console.log(lastNotification);
   
   return NextResponse.json(notifications);

}


