import ECommerce from "@/app/components/dashboard/Dashboard/Home";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingsClient from "./UsersClient";
import getAllListings from "@/app/actions/dashboard/getAllListings";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import getAllUsers from "@/app/actions/dashboard/getAllUsers";
import UsersClient from "./UsersClient";

export default async function Users() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();


   if(!adminAuthDashboards.includes(userRole)){
      return (
        <NotAllowed/>
      );
    }

  const users = await getAllUsers();
   return (
    <>
        <UsersClient users={users}/>
    </>
  );
}
