import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import SettingsClient from "./SettingsClient";

export default async function Settings() {
   const currentUser = await getCurrentUser();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <SettingsClient currentUser={currentUser}/>
     </DefaultLayout>
    </>
  );
}
