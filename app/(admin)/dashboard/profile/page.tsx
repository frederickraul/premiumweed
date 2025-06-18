import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import { notAdminAuthDashboards } from "@/app/const/permissions";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";

export default async function Profile() {
   const currentUser = await getCurrentUser();
   const userRole = currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();

   if(!notAdminAuthDashboards.includes(userRole)){
    return (
      <NotAllowed/>
    );
  }
  return (
    <>
        <ProfileClient currentUser={currentUser}/>
    </>
  );
}
