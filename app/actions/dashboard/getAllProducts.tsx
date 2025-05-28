import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  userId?: string;
  listingId?: string;
  category?: string;
}

export default async function getAllProducts(
) {
  try {
    
    const products = await prisma.product.findMany({
      include:{
        user:true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const SafeProduct = products.map((product) => ({
      ...product,
      userName: product.user.name,
      createdAt: product.createdAt.toISOString(),
    }));

    return SafeProduct;
  } catch (error: any) {
    throw new Error(error);
  }
}