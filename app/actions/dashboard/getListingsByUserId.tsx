import prisma from "@/app/libs/prismadb";

export interface IUserParams {
  userId?: string;
}

export default async function getListingsByUserId(
  params: IUserParams
) {
  try {
    const {
      userId,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
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
  } catch (error: any) {
    throw new Error(error);
  }
}