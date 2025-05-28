
'use client'

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import ListingDetailsInfo from "./ListingDetailsInfo";

const ListingDetailsClient = (props: {
  listing: any;
}) => {

  const { listing } = props;

  return (
    <>
      <Breadcrumb pageName="Listings" />

      <div className="flex flex-col gap-10">
        <ListingDetailsInfo listing={listing}/>
      </div>
    </>
  );
};

export default ListingDetailsClient;
