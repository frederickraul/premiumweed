import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getAllListings() {


    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include:{
        user:true,
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      userName: listing.user.name,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } 
