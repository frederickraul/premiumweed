import Home from "@/app/components/dashboard/Dashboard/Home";


export default function HomeClient(
  props:{
    listingsEstimate: any, 
    productsEstimate: any, 
    regularUsersEstimate: any,
    sellerUsersEstimate: any,
    suspendedUsersEstimate:any,
    chats:any,
    visitors:any,
  }){
  return (
    <>
        <Home 
          listingsEstimate={props.listingsEstimate} 
          productsEstimate={props.productsEstimate} 
          regularUsersEstimate={props.regularUsersEstimate}
          sellerUsersEstimate={props.sellerUsersEstimate}
          suspendedUsersEstimate={props.suspendedUsersEstimate}
          chats={props.chats}
          visitors={props.visitors}
          />
    </>
  );
}
