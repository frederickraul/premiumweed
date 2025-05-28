import getUserById from '@/app/actions/dashboard/getUserById'
import React from 'react'
import UserDetailsClient from './UserDetailsClient';
import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getNotificationsByRecipientId from '@/app/actions/getNotificationsByRecipientId';

const UserDetails = async ({ params }: { params: { userId: string } }) => {
    const { userId } = params;

    const user = await getUserById({ userId });
    const currentUser = await getCurrentUser();
    const notifications = await getNotificationsByRecipientId();

    return (
        <DefaultLayout currentUser={currentUser} notifications={notifications}>
            <UserDetailsClient user={user} />
        </DefaultLayout>
    )
}

export default UserDetails