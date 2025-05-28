
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import InvoiceClient from "./InvoiceClient";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}


export default async function Messages() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();


   if(!adminAuthDashboards.includes(userRole)){
      return (
        <NotAllowed/>
      );
    }

   const data = await getAllProducts();
  return (
    <DefaultLayout currentUser={currentUser} notifications={notifications}>

        <InvoiceClient/>
      </DefaultLayout>
  );
}
