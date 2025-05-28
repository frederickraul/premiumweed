import getUserById from '@/app/actions/dashboard/getUserById'
import React from 'react'
import UserDetailsClient from './ListingDetailsClient';
import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getNotificationsByRecipientId from '@/app/actions/getNotificationsByRecipientId';
import getListingById from '@/app/actions/getListingById';
import ListingDetailsClient from './ListingDetailsClient';

const ListingDetails = async ({ params }: { params: { listingId: string } }) => {
    const { listingId } = params;

    const listing = await getListingById({ listingId });
    const currentUser = await getCurrentUser();
    const notifications = await getNotificationsByRecipientId();

    return (
        <DefaultLayout currentUser={currentUser} notifications={notifications}>
            <ListingDetailsClient listing={listing} />
        </DefaultLayout>
    )
}

export default ListingDetails