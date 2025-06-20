import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';



export async function POST(
  request:Request
  ) {
    const data = await request.json();
    const {
      type,
      recipientId,
      senderId,
      senderName,
      listing,
      product,
      item,
      message,
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
    
    const currentTime = Date.now();
    let content = "";
    let itemId ="";
    let itemName = "";
    let item2Id = "";
    switch(type){
      case "question":
        content="has a question for you";
        itemId = listing.id;
        break;
      case "favoriteListing":
        content="like your listing ";
        itemId = listing?.id;
        itemName = listing?.title;
        break;
      case "favoriteProduct":
        content="like your product ";
        itemId = product?.id;
        itemName = product?.title;
        item2Id = product?.listingId;
        break;
        case "message":
        content=message;
        const notification = await prisma.notification.findFirst({
          where:{
            recipientId:recipientId,
            senderId: senderId,
          }
        });

        if(notification){
          let count = 1;
          
          count = (notification.count)+1;
          
          const updatedNotification = await prisma.notification.update({
            where:{
              id: notification.id
            },
            data:{
              content:content,
              status:0,
              count:count,
              timestamp: currentTime,
            }
          });

          const notificationToken = uuidv4();
          console.log(recipientId);
          console.log(notificationToken);
          const status = await prisma.notificationStatus.findFirst({
            where:{
              userId:recipientId
            }
          });
          
          if(!status){
            const newNotificationStatus = await prisma.notificationStatus.create({
              data:{
                userId: recipientId,
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


          return NextResponse.json(updatedNotification);
        } 

        
        break;
    }


    const notification = await prisma.notification.create({
      data:{
        type,
        recipientId,
        senderId,
        itemId,
        itemName,
        item2Id,
        status: 0,
        UTC: '',
        content: content, 
        count:1,
        timestamp: currentTime,
      }
    });

    const notificationToken = uuidv4();
    
    const status = await prisma.notificationStatus.findFirst({
      where:{
        userId:recipientId
      }
    });
    
    if(!status){
      const newNotificationStatus = await prisma.notificationStatus.create({
        data:{
          userId: recipientId,
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




  
    return NextResponse.json(notification);
}