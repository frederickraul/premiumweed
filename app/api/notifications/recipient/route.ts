import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  lastNotificationId?: string;
}

export async function POST(
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
          createdAt: 'desc'
        }
      ],
      include:{
        sender:true,
      }
  });
    
    return NextResponse.json(notifications);
}


export async function GET(
  request:Request,
  { params }: { params: IParams }
  ) {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }
  
  const notificationStatus = await prisma.notificationStatus.findFirst({
    where:{
      userId: currentUser.id,
    }
  });

  if(!notificationStatus){
    const newNotificationStatus = await prisma.notificationStatus.create({
      data:{
        userId: currentUser.id,
        token: "",
      }
    });
    return NextResponse.json(newNotificationStatus);
  }
  return NextResponse.json(notificationStatus);

 //console.log(lastNotification);
 

}


