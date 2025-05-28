import prisma from "@/app/libs/prismadb";



export default async function getListingsEstimate() {
  try {


    const listings = await prisma.listing.count();
    
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}