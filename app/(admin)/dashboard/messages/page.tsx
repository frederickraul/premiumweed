import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import MessagesClient from "./MessagesClient";
import getChats from "@/app/actions/getChats";
import NotAllowed from "@/app/components/dashboard/Dashboard/NotAllowed";
import getNotificationsByRecipientId from "@/app/actions/getNotificationsByRecipientId";
import PageClient from "./PageClient";


export default async function Messages() {
   const currentUser = await getCurrentUser();
   const notifications = await getNotificationsByRecipientId();
   const chats = await getChats();
    // console.log(chats);
   if(!currentUser){
    return (
      <NotAllowed/>
    );
   }

  return (
    <PageClient currentUser={currentUser} notifications={notifications} chats={chats}/>
  );
}
