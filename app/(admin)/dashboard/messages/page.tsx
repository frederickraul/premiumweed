import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getAllProducts from "@/app/actions/dashboard/getAllProducts";
import MessagesClient from "./MessagesClient";


export default async function Messages() {
   const currentUser = await getCurrentUser();
   const data = await getAllProducts();
  return (
    <DefaultLayout currentUser={currentUser}>

        <MessagesClient products={data} currentUser={currentUser}/>
    </DefaultLayout>
  );
}
