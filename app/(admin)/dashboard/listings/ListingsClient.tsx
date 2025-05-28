

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import Table from "@/app/(admin)/dashboard/listings/ListingsTable";
import TableThree from "@/app/components/dashboard/Tables/TableThree";
import ListingsTable from "@/app/(admin)/dashboard/listings/ListingsTable";

const ListingsClient = (props:{
  listigs:any;
}) => {

  const headers=['imageSrc','Title','Category','Owner','City','Created'];
  return (
    <>
      <Breadcrumb pageName="Listings" />

      <div className="flex flex-col gap-10">
        <ListingsTable headers={headers} data={props.listigs}/>
        {/* <TableThree /> */}
      </div>
    </>
  );
};

export default ListingsClient;
