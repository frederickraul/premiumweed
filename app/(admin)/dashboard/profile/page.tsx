import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
   const currentUser = await getCurrentUser();
  return (
    <>
     <DefaultLayout currentUser={currentUser}>
        <ProfileClient currentUser={currentUser}/>
     </DefaultLayout>
    </>
  );
}
