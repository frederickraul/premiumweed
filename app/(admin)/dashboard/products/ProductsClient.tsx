

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import Table from "@/app/(admin)/dashboard/listings/ListingsTable";
import TableThree from "@/app/components/dashboard/Tables/TableThree";
import ProductsTable from "./ProductsTable";

const ProductsClient = (props:{
  products:any;
}) => {

  const headers=['imageSrc','Title','Category','Owner','Price','Created'];
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <ProductsTable headers={headers} data={props.products} />
      </div>
    </>
  );
};

export default ProductsClient;
