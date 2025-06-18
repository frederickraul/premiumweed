
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'


export async function POST(
  request: Request
) {

  const body = await request.json();

  const {
    deviceType, 
  } = body;

  try {
    
      const visitor = await prisma.visitors.create({
        data:{
          deviceType:deviceType,
        }
      });
      return NextResponse.json(visitor);
  

  } catch (error: any) {
    throw new Error(error);
  }


}






