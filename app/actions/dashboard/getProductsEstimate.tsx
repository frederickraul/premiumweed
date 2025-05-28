import prisma from "@/app/libs/prismadb";


export default async function getProductsEstimate() {
  try {
   
   
    const products = await prisma.product.count();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}