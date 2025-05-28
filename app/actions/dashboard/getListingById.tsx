import prisma from "@/app/libs/prismadb";

export interface IParams {
  listingId?: string;
}

export default async function getUserById( params: IParams
) {
  const {listingId} = params;

  if(!listingId){
    return({message: 'Listing Id Required'});
  }

  try {

    const listing = await prisma.listing.findUnique({
     where: {
        id:  listingId,
      }
    });

    return listing;

  } catch (error:any) {
    throw new Error(error);
  }


 

  } 
