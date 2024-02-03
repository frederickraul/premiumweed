import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  notificationId?: string;
}

// UPDATE METHOD
export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { notificationId } = params;
    
    const oldNotification = await prisma.notification.findFirst({
      where:{
        itemId:notificationId
      },
    });
    
     
      const type = oldNotification?.type;
      const recipientId = oldNotification?.recipientId;
      const senderId = oldNotification?.senderId;
      const itemId = oldNotification?.itemId;
      const itemName = oldNotification?.itemName;
      const item2Id = oldNotification?.item2Id;
      const status = oldNotification?.status;
      const UTC = oldNotification?.UTC;
      const content = oldNotification?.content;
      const count = oldNotification?.count;
      const timestamp = oldNotification?.timestamp;

    
    let rContent = content;
    let rStatus = 1;
    let rRecipientId = recipientId;
    let rSenderId = senderId;
    let rType = type
    
    

      switch(oldNotification?.type){
        case "question":
          rContent="has answered your question";
          rStatus = 0;
          rType = "answer";
          // When the recipient responds the questions 
          // the Recipient becomes in Sender
          rRecipientId = senderId;
          rSenderId = recipientId;
          break;
      }

   


        const notification = await prisma.notification.update({
          where:{
            id:oldNotification?.id
          },
          data:{
            type: rType,
            recipientId: rRecipientId,
            senderId:rSenderId,
            itemId,
            itemName,
            item2Id,
            status: rStatus,
            UTC,
            content:rContent, 
            count,
            timestamp,
          }
        });


    return NextResponse.json(notification);
}


export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { notificationId } = params;

  if (!notificationId || typeof notificationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const rating = await prisma.notification.deleteMany({
    where: {
      id: notificationId,
      //userId: currentUser.id
    }
  });

  return NextResponse.json(rating);
}