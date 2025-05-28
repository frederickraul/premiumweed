import Home from "@/app/components/dashboard/Dashboard/Home";


export default function HomeClient(
  props:{
    listingsEstimate: any, 
    productsEstimate: any, 
    regularUsersEstimate: any,
    sellerUsersEstimate: any
  }){
  return (
    <>
        <Home 
          listingsEstimate={props.listingsEstimate} 
          productsEstimate={props.productsEstimate} 
          regularUsersEstimate={props.regularUsersEstimate}
          sellerUsersEstimate={props.sellerUsersEstimate}
          
          />
    </>
  );
}
