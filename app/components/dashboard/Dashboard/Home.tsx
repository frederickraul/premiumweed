"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import CardDataStats from "../CardDataStats";

const MapOne = dynamic(() => import("@/app/components/dashboard/Maps/MapOne"), {
  ssr: false,
});

const ChartVisitors = dynamic(() => import("@/app/components/dashboard/Charts/ChartVisitors"), {
  ssr: false,
});

import WeedBagIcon from '@/app/components/icons/icon-weed-bag.svg';
import WeedMarketIcon from '@/app/components/icons/icon-weed-market.svg';
import UserIcon from '@/app/components/icons/icon-user.svg';
import SellerUserIcon from '@/app/components/icons/icon-seller-account.svg';
import SuspendedUserIcon from '@/app/components/icons/icon-suspended-used.svg';
import { useRouter } from "next/navigation";


const Home = (
  props: {
    listingsEstimate?:any, 
    productsEstimate?:any,
    regularUsersEstimate?:any,
    sellerUsersEstimate?:any,
    suspendedUsersEstimate?:any,
    chats?:any,
    visitors?:any,
  }) => {

    const{
        listingsEstimate, 
        productsEstimate, 
        sellerUsersEstimate,
        regularUsersEstimate,
        suspendedUsersEstimate,
        visitors,
        chats
      } = props;

    const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
        <CardDataStats title="Total Listings" total={listingsEstimate} 
        onClick={()=>{router.push('dashboard/listings')}}>
          <WeedBagIcon 
            className="fill-primary dark:fill-white"
            width="25"
            height="27"
            />
        </CardDataStats>
        <CardDataStats title="Total Product" total={productsEstimate}
        onClick={()=>{router.push('dashboard/products')}}>
          <WeedMarketIcon 
            className="fill-primary dark:fill-white" 
            width="25"
            height="25"/>
        <div></div>
        </CardDataStats>
        <CardDataStats title="Total Regular Users" total={sellerUsersEstimate}
        onClick={()=>{router.push('dashboard/users')}}>
          <UserIcon
            className="fill-primary dark:fill-white"
            width="25"
            height="27"
          />
        </CardDataStats>

        <CardDataStats title="Total Seller Users" total={regularUsersEstimate}
        onClick={()=>{router.push('dashboard/users')}}>
          <SellerUserIcon
            className="stroke-primary dark:stroke-white"
            width="25"
            height="27"
          />
          
        </CardDataStats>
        <CardDataStats title="Total Account suspension" total={suspendedUsersEstimate}
        onClick={()=>{router.push('dashboard/users')}}>
          <SuspendedUserIcon
            className="stroke-primary dark:stroke-white"
            width="25"
            height="27"
          />
          
        </CardDataStats>


      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartVisitors visitors={visitors} />
        <ChatCard chats={chats} />
      </div>
    </>
  );
};

export default Home;
