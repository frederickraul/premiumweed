
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'


export async function POST(
  request: Request
) {

  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    lightLogo, 
    darkLogo, 
    smallLogo,
    favicon
  } = body;

  try {
    const setting = await prisma.setting.findFirst({
      where: {
        name: 'logo',
      },
    })

    if (!setting) {
      const setting = await prisma.setting.create({
        data:{
          name:'logo',
          values:[ 
            lightLogo, 
            darkLogo, 
            smallLogo,
            favicon
          ]
        }
      })
      return NextResponse.json(setting);
    }


    const updatedSetting = await prisma.setting.update({
      where: { id: setting.id },
      data: {
        values:[ 
          lightLogo, 
          darkLogo, 
          smallLogo,
          favicon
    ]
         
        
      }
    });

    return NextResponse.json(updatedSetting);

  } catch (error: any) {
    throw new Error(error);
  }


}






