import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadReservations, getReservationsAdmin } from "../../../api/reservation-service";
import Loading from "../../common/loading/loading";

const columns = [
  {
    name: "Vehicle",
    selector: (row) => row.car.model
  },
  {
    name: "Pick-up",
    selector: (row) => row.pickUpLocation
  },
  {
    name: "Drop-off",
    selector: (row) => row.dropOffLocation
  },
  {
    name: "Price",
    selector: (row) => `$${row.totalPrice}`
  },
];

const AdminReservations = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const navigate = useNavigate();

  const loadData = async (page, size) => {
    setLoading(true);

    try {
      const resp = await getReservationsAdmin(page, size);
      const { content, totalElements } = resp.data;
      setReservations(content);
      setTotalRows(totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    loadData(page - 1, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    loadData(page - 1, newPerPage);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const resp = await downloadReservations();
      fileDownload(resp.data, `reservations-${new Date().valueOf()}.xlsx`);
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleRowClick = (row) => {
    navigate(`/admin/reservations/${row.id}`);
  };


  useEffect(() => {
    loadData(0, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button
        variant="secondary"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading && <Spinner animation="border" size="sm" />} Download
        Reservations
      </Button>

      <DataTable
        columns={columns}
        data={reservations}
        progressPending={loading}
        progressComponent={<Loading />}
        pagination
        paginationServer
        onRowClicked={handleRowClick}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
      />
    </div>
  );
};

export default AdminReservations;