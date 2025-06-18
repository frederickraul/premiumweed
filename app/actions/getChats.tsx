
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";

export default async function getChats() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

   const chats = await prisma.chat.findMany({
     include:{
      receiver:true,
       messages:{
         orderBy: {
             createdAt: 'desc',
         },
         take: 1,
       }
     },
    where:{
      userId: currentUser.id,
    },
   });

  //  console.log(chats);`
   
   const SafeChats = chats.map((item) => ({
     ...item,
     lastMessage: item.messages[0]?.content || "",
     timestamp: item.messages[0]?.createdAt.toISOString() || [],
     createdAt: item.createdAt.toISOString(),
    }));
    

  return SafeChats;
   
} catch (error:any) {
  return null;
}
}