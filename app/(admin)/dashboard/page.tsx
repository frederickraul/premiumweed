import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import HomeClient from "./HomeClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getListingsEstimate from "@/app/actions/getListingsEstimate";
import getProductsEstimate from "@/app/actions/dashboard/getProductsEstimate";
import getRegularUsersEstimate from "@/app/actions/dashboard/getRegularUsersEstimate";
import getSellerUsersEstimate from "@/app/actions/getSellerUsersEstimate";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";

export default async function Home() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";

   if(!adminAuthDashboards.includes(userRole)){
      return (
        <NotAllowed/>
      );
    }

  const listingsEstimate = await getListingsEstimate();
  const productsEstimate = await getProductsEstimate();
  const regularUsersEstimate = await getRegularUsersEstimate();
  const sellerUsersEstimate = await getSellerUsersEstimate();
  const notifications = await getNotificationsByRecipientId();

  console.log(notifications);
  return (
    <>
     <DefaultLayout currentUser={currentUser} notifications={notifications}>
        <HomeClient 
          listingsEstimate={listingsEstimate} 
          productsEstimate={productsEstimate} 
          sellerUsersEstimate={sellerUsersEstimate}
          regularUsersEstimate={regularUsersEstimate}
          />
     </DefaultLayout>
    </>
  );
}
