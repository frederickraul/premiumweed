import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Settings() {
   const currentUser = await getCurrentUser();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <SettingsClient currentUser={currentUser}/>
     </DefaultLayout>
    </>
  );
}
