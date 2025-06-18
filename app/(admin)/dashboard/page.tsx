import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import HomeClient from "./HomeClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { adminAuthDashboards, onlyRegularAuthDashboards, onlySellerAuthDashboards, sellerAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getListingsEstimate from "@/app/actions/getListingsEstimate";
import getProductsEstimate from "@/app/actions/dashboard/getProductsEstimate";
import getRegularUsersEstimate from "@/app/actions/dashboard/getRegularUsersEstimate";
import getSellerUsersEstimate from "@/app/actions/getSellerUsersEstimate";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import HomeRegular from "@/app/components/dashboard/Dashboard/HomeRegular";
import HomeSeller from "@/app/components/dashboard/Dashboard/HomeSeller";
import getSuspendedUsersEstimate from "@/app/actions/getSuspendedUsersEstimate";
import getChats from "@/app/actions/getChats";
import getAllVisitors from "@/app/actions/dashboard/getAllVisitors";

export default async function Home() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();

   if(!userRole){
    return (
      <>
        <NotAllowed/>

      </>
    );
  }

  console.log(userRole);
   

   if(onlySellerAuthDashboards.includes(userRole)){
      return (
        <>
         
            <HomeSeller/>

        </>
      );
    }

    if(onlyRegularAuthDashboards.includes(userRole)){
      return (
        <>
            <HomeRegular/>

        </>
      );
    }

  const listingsEstimate = await getListingsEstimate();
  const productsEstimate = await getProductsEstimate();
  const regularUsersEstimate = await getRegularUsersEstimate();
  const sellerUsersEstimate = await getSellerUsersEstimate();
  const suspendedUsersEstimate = await getSuspendedUsersEstimate();
  const chats = await getChats();

  const visitors = await getAllVisitors();
    
  return (
    <>
        <HomeClient 
          listingsEstimate={listingsEstimate} 
          productsEstimate={productsEstimate} 
          sellerUsersEstimate={sellerUsersEstimate}
          regularUsersEstimate={regularUsersEstimate}
          suspendedUsersEstimate={suspendedUsersEstimate}
          chats={chats}
          visitors={visitors}
          />
    </>
  );
}
