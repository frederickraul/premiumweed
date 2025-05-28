import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
  request:Request
  ) {

    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }


    const data = await request.json();
    const {
      receiverId,
      senderId,
      content,
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });


    let senderChat = await prisma.chat.findFirst({
      where:{
        AND:{
          userId: senderId,
          receiverId: receiverId,

        }
      }
    });

    if(!senderChat){
      senderChat = await prisma.chat.create({
        data:{
          userId: senderId,
          receiverId: receiverId,
        }
      });
    }
   
    const currentTime = Date.now();




    // We need to find the receiver chat
    let receiverChat = await prisma.chat.findFirst({
      where:{
        AND:{
          userId: receiverId,
          receiverId: senderId,

        }
      }
    });

    if(!receiverChat){
      receiverChat = await prisma.chat.create({
        data:{
          userId: receiverId,
          receiverId: senderId,
        }
      });
    }
    

    //Create the message on Sender Chat
    const messageUser = await prisma.message.create({
          data:{
            // userId: recipientId,
            senderId: currentUser.id,
            chatId: senderChat.id,
            content,
          }
        });


    // Make a copy of the message for the receiver
    // So can delete his message
    const messageReceiver = await prisma.message.create({
      data:{
        // userId: recipientId,
        senderId: currentUser.id,
        chatId: receiverChat.id,
        content,
      }
    });



  if(messageUser){
    return NextResponse.json({message: messageUser,status:"ok"});
  }else{
    return NextResponse.json({status:"bad"});
  }
}