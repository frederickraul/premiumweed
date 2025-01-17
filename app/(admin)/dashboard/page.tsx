import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import HomeClient from "./HomeClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Home() {
   const currentUser = await getCurrentUser();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <HomeClient/>
     </DefaultLayout>
    </>
  );
}
