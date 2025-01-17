import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Profile() {
   const currentUser = await getCurrentUser();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <ProfileClient currentUser={currentUser}/>
     </DefaultLayout>
    </>
  );
}
