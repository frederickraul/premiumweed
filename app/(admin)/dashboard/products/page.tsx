import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import ProductsClient from "./ProductsClient";
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
    
   const data = await getAllProducts();
  return (
      <DefaultLayout currentUser={currentUser} notifications={notifications}>

        <ProductsClient products={data}/>
      </DefaultLayout>
  );
}
