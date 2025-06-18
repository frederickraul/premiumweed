import ECommerce from "@/app/components/dashboard/Dashboard/Home";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import ProductsClient from "./ProductsClient";
import { adminAuthDashboards, sellerAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import getProductsByUserId from "@/app/actions/dashboard/getProductsByUserId";


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

    let data = await getProductsByUserId({userId});
    
    if(adminAuthDashboards.includes(userRole)){
      data = await getAllProducts();
    }
    
  return (
    <>
        <ProductsClient products={data}/>
    </>
  );
}
