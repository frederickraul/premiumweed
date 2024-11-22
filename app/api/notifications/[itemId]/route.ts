import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';
import { v4 as uuidv4 } from 'uuid';


interface IParams {
  itemId?: string;
}

//USED ONLY FOR QUESTION NOTIFICATIONS
export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { itemId } = params;
    
    const oldNotification = await prisma.notification.findFirst({
      where:{
        itemId:itemId
      },
    });
    


      const notificationId = oldNotification?.id;
      const recipientId = oldNotification?.recipientId || "";
      const senderId = oldNotification?.senderId || "";

    if(notificationId){
      //Update status current notification to isRead
        const notification = await prisma.notification.update({
          where:{
            id:notificationId
          },
          data:{
            status: 1,
          }
        });


    const currentTime = Date.now();
      //Create a new notification
      const newNotification = await prisma.notification.create({
        data:{
          type:"answer",
          content:"has answered your question",
          recipientId: senderId,
          senderId: recipientId,
          itemId: itemId,
          itemName:"",
          item2Id:"",
          status: 0,
          UTC: '',
          count:1,
          timestamp: currentTime,
        }
      });

      const notificationToken = uuidv4();
      console.log(recipientId);
      console.log(notificationToken);

      const status = await prisma.notificationStatus.findFirst({
        where:{
          userId: senderId
        }
      });
      
      if(!status){
        const newNotificationStatus = await prisma.notificationStatus.create({
          data:{
            userId: senderId,
            token: notificationToken,
          }
        });
      }else{
        const NotificationStatus = await prisma.notificationStatus.update({
          where:{
            id:status.id
          },
          data:{
            token: notificationToken,
          }
        });
      }


      return NextResponse.json(newNotification);
    }


}


export async function DELETE(
  request:Request,
  { params }: { params: IParams }
  ) {

    const { itemId } = params;
    console.log(`id: ${itemId}`)

    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }

    const notification = await prisma.notification.delete({
      where: {
        id: itemId,
        recipientId: currentUser.id
      }
    });

    return NextResponse.json(notification);

}

