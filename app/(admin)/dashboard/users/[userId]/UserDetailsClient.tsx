
'use client'

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import UserDetailsInfo from "./UserDetailsInfo";

const UserDetailsClient = (props: {
  user: any;
}) => {

  const { user } = props;

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UserDetailsInfo user={user}/>
      </div>
    </>
  );
};

export default UserDetailsClient;
