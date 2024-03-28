import React from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
];





const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <div>
      <Button variant="secondary"> Dowload Users </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminUsers;
