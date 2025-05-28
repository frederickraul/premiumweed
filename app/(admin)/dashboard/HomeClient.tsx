import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";


export default function HomeClient(
  props:{
    listingsEstimate: any, 
    productsEstimate: any, 
    regularUsersEstimate: any,
    sellerUsersEstimate: any
  }){
  return (
    <>
        <ECommerce 
          listingsEstimate={props.listingsEstimate} 
          productsEstimate={props.productsEstimate} 
          regularUsersEstimate={props.regularUsersEstimate}
          sellerUsersEstimate={props.sellerUsersEstimate}
          
          />
    </>
  );
}
