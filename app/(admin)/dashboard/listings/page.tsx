import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingsClient from "./ListingsClient";
import getAllListings from "@/app/actions/dashboard/getAllListings";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";


export default async function Profile() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();

   if(!adminAuthDashboards.includes(userRole)){
      return (
        <NotAllowed/>
      );
    }

   const listings = await getAllListings();
  
   return (
    <>
     <DefaultLayout currentUser={currentUser} notifications={notifications}>
        <ListingsClient listigs={listings}/>
     </DefaultLayout>
    </>
  );
}
