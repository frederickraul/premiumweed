import prisma from "@/app/libs/prismadb";


export default async function getSellerUsersEstimate() {
  try {
   
   


  const users = await prisma.user.count({
    where:{
          role: "Seller"
        }
  });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}