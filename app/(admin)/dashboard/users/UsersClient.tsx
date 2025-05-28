

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import Table from "@/app/(admin)/dashboard/listings/ListingsTable";
import TableThree from "@/app/components/dashboard/Tables/TableThree";
import ListingsTable from "@/app/(admin)/dashboard/listings/ListingsTable";
import UserTable from "./UsersTable";

const UsersClient = (props:{
  users:any;
}) => {

  const {users} = props;

  const headers=['Image','Name','Role','Enable','Created'];
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <UserTable headers={headers} data={users}/>
        {/* <TableThree /> */}
      </div>
    </>
  );
};

export default UsersClient;
