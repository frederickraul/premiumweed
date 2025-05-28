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

export default async function getAllUsers() {
  const userTypes = ['Regular', 'Seller'];

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },where: {
        role:  { in: userTypes }
      }
    });

    const safeUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    }));

    return safeUsers;
  } 
