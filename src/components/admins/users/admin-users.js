import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { getUsersByPage } from "../../../api/user-service";

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Roles",
    selector: (row) => row.roles,
  },
];




const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (page, perpage) => {    //disaridan page ve perpage alsin 
    setLoading(true);
    try {

      const resp = await getUsersByPage(page, perpage) // bunu gönderiyoruz oda bir cevap vercek setuser uzerinden aliyoruz
      setUsers(resp.data.content);

    } catch (err) {
      console.log(err);

    } finally{
        setLoading(false);
      }

   };

   useEffect(() => {
     loadData();
   }, [])
   


  return (
    <div>
      <Button variant="secondary"> Dowload Users </Button>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default AdminUsers;
