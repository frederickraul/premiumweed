import React from 'react'
import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getNotificationsByRecipientId from '@/app/actions/getNotificationsByRecipientId';
import getListingById from '@/app/actions/getListingById';
import ProductDetailsClient from './ProductDetailsClient';
import getProductById from '@/app/actions/getProductById';

const ListingDetails = async ({ params }: { params: { productId: string } }) => {
    const { productId } = params;

    const product = await getProductById({ productId });
    const currentUser = await getCurrentUser();
    const notifications = await getNotificationsByRecipientId();
    console.log(product);

    return (
        <>
            <ProductDetailsClient product={product} />

        </>
    )
}

export default ListingDetails