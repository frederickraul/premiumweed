import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import LogoSettingsClient from "./LogoSettingsClient";
import { adminAuthDashboards } from "@/app/const/permissions";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import getSettingsByName from "@/app/actions/getSettingsByName";

export default async function Settings() {
   const currentUser = await getCurrentUser();
   const userRole = await currentUser?.role || "";
   const notifications = await getNotificationsByRecipientId();
   const logos = await getSettingsByName('logo');


   if(!adminAuthDashboards.includes(userRole)){
    return (
      <NotAllowed/>
    );
  }


  return (
    <>
        <LogoSettingsClient logos={logos?.values}/>
    </>
  );
}
