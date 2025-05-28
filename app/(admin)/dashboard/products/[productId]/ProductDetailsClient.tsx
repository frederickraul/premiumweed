
'use client'

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import ProductDetailsInfo from "./ProductDetailsInfo";

const ProductDetailsClient = (props: {
  product: any;
}) => {

  const { product } = props;

  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <ProductDetailsInfo product={product}/>
      </div>
    </>
  );
};

export default ProductDetailsClient;
