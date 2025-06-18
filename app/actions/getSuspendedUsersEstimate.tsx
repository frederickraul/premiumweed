import prisma from "@/app/libs/prismadb";


export default async function getSuspendedUsersEstimate() {
  try {
   
   


  const users = await prisma.user.count({
    where:{
          enable: false,
        }
  });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}