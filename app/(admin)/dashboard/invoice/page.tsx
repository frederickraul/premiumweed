
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import InvoiceClient from "./InvoiceClient";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Messages() {
   const currentUser = await getCurrentUser();
   const data = await getAllProducts();
  return (
    <DefaultLayout currentUser={currentUser}>

        <InvoiceClient/>
      </DefaultLayout>
  );
}
