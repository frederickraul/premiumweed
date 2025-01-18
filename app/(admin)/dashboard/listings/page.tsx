import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingsClient from "./ListingsClient";
import getAllListings from "@/app/actions/dashboard/getAllListings";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Profile() {
   const currentUser = await getCurrentUser();
   const listings = await getAllListings();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <ListingsClient listigs={listings}/>
     </DefaultLayout>
    </>
  );
}
