import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  userId?: string;
  listingId?: string;
  category?: string;
}

export default async function getAllVisitors(
) {
  try {
    
    const visitors = await prisma.visitors.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const SafeVisitors = visitors.map((visitor) => ({
      ...visitor,
      createdAt: visitor.createdAt.toISOString(),
    }));

    return SafeVisitors;
  } catch (error: any) {
    throw new Error(error);
  }
}