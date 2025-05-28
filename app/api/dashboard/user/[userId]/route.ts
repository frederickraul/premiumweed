
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

interface IParams {
  userId?: string;
}

export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {

  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }

  const { userId } = params;


  const body = await request.json();

  const {
    email,
    image,
    name,
    lastname,
    enable
  } = body;

  const fullName = name + " "+ lastname;


  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        image: image,
        name: name,
        lastname: lastname,
        fullName: fullName,
        enable: enable,
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error: any) {
    throw new Error(error);
  }


}






