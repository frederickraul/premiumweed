import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptySpace from '@/app/components/EmptySpace';
import { dataList } from '@/app/const';
import { useParams } from 'next/navigation'
import React from 'react'
import ProductClient from './ProductClient';
import getListingById from '@/app/actions/getListingById';
import getProductById from '@/app/actions/getProductById';
import getProducts from '@/app/actions/getProducts';


interface IParams{
  listingId: string;
  productId: string;
}

const ProductPage = async ({params}:{params: IParams}) => {
  const {productId} = params;
  const listing = await getListingById(params);
  const product = await getProductById(params);
  const relatedProducts = await getProducts(params);
  const currentUser = await getCurrentUser();


  //const params = useParams()
  //const listing = await getListingById(params);
  //const currentUser = await getCurrentUser();

  if(!product){
    return (
      <EmptySpace/>
    )
  }
  return (
    <div>
      <ProductClient
        listing={listing}
        product={product}
        relatedProducts={relatedProducts}
        currentUser={currentUser}
      />
    </div>
  )
 
}

export default ProductPage