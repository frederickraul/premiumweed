import ECommerce from "@/app/components/dashboard/Dashboard/Home";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingsClient from "./ListingsClient";
import getAllListings from "@/app/actions/dashboard/getAllListings";
import { adminAuthDashboards, onlySellerAuthDashboards, sellerAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import getListingsByUserId from "@/app/actions/dashboard/getListingsByUserId";


export default async function Profile() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();

   const userId = currentUser?.id;

   if(!sellerAuthDashboards.includes(userRole)){
      return (
        <NotAllowed/>
      );
    }

    let listings = await getListingsByUserId({userId});
    
    if(adminAuthDashboards.includes(userRole)){
      listings = await getAllListings();
    }

  
   return (
    <>
        <ListingsClient listigs={listings}/>
    </>
  );
}
