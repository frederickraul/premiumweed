
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
    lastname,
    phone,
    formattedPhone,
    bio
  } = body;

  const fullName = name +" "+lastname;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        image: image,
        name: name,
        fullName: fullName,
        lastname: lastname,
        email: email,
        phone: phone,
        formattedPhone: formattedPhone,
        bio:bio,

      }
    });

    return NextResponse.json(updatedUser);

  } catch (error: any) {
    throw new Error(error);
  }


}






