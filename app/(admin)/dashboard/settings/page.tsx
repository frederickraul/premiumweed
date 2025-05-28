import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";

export default async function Settings() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();


   if(!adminAuthDashboards.includes(userRole)){
    return (
      <NotAllowed/>
    );
  }

  return (
    <>
     <DefaultLayout currentUser={currentUser} notifications={notifications}>
        <SettingsClient currentUser={currentUser}/>
     </DefaultLayout>
    </>
  );
}
