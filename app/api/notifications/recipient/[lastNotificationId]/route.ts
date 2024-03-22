import bcrypt from 'bcrypt';

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

        return NextResponse.json(null);
}


//     const currentUser = await getCurrentUser();
//     if(!currentUser){
//       return NextResponse.error();
//     }
//     const { lastNotificationId } = params;
    
//     const notifications = await prisma.notification.findMany({
//       where:{
//         AND:[
//           {
//             recipientId: currentUser.id,
//           },{
//             status: 0,
//           }
//         ]
//       },
//       orderBy: [
//         {
//           status: 'asc',
//         },
//         {
//           createdAt: 'desc'
//         }
//       ],
//       include:{
//         sender:true,
//       }
//   });
    
//     return NextResponse.json(notifications);
// }
