import prisma from "@/app/libs/prismadb";


export default async function getRegularUsersEstimate() {
  try {
   

  const users = await prisma.user.count({
    where:{
          role: "Regular"
        }
  });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}