import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  userId?: string;
}

export default async function getProductsByUserId(
  params: IProductsParams
) {
  try {
    const {
      userId,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const products = await prisma.product.findMany({
      where: query,
      include:{
        user:true,
      },
      orderBy: {
        createdAt: 'desc'
      },
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