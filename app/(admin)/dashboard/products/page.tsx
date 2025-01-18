import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Profile() {
   const currentUser = await getCurrentUser();
   const data = await getAllProducts();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <ProductsClient products={data}/>
     </DefaultLayout>
    </>
  );
}
