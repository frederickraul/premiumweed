
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
    email,
    image,
    name,
  } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return NextResponse.json(null);
    }


    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        image: image,
        name: name,
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error: any) {
    throw new Error(error);
  }


}






