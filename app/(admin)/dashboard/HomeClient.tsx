import ECommerce from "@/app/components/dashboard/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/dashboard/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}

export default function HomeClient(){
  return (
    <>
        <ECommerce />
    </>
  );
}
