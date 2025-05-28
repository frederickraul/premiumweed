import prisma from "@/app/libs/prismadb";

export interface IParams {
  userId?: string;
}

export default async function getUserById( params: IParams
) {
  const {userId} = params;

  if(!userId){
    return({message: 'User Id Required'});
  }

  try {

    const user = await prisma.user.findUnique({
     where: {
        id:  userId,
      }
    });

    return user;

  } catch (error:any) {
    throw new Error(error);
  }


 

  } 
