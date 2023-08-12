
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

    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      coverSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      state,
      city,
      pin,
      zipcode,
      phone,
      address,
      apartment,
      horary,
      price
    } = body;


    Object.keys(body).forEach((value: any) => {
      if(!body[value]){
        NextResponse.error();
      }
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        coverSrc,
        category,
        roomCount,
        guestCount,
        bathroomCount,
        locationValue: location.value,
        state: state.label,
        city: city.label,
        pin,
        horary: {
          set: horary
        },
        zipcode,
        phone,
        address,
        apartment,
        price: parseInt(price,10),
        userId: currentUser.id
      }
    })

    return NextResponse.json(body);
}