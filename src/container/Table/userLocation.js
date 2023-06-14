import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Delete, Update } from "@mui/icons-material";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Button from "@mui/material/Button";
import {
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import UpdateForm from "../../container/forms/updateForm";

const fetchUserLocationList = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `http://localhost:5000/api/userlocation/userlocations`,
    config
  );

  return response.data;
};

const useUserLocationList = () => {
  return useQuery("userLocation", fetchUserLocationList);
};

const Index = () => {
  const { data: userLocation, isLoading } = useUserLocationList();
  const [tableData, setTableData] = useState([]);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (userLocation && Array.isArray(userLocation.data.users.rows)) {
      const newData = userLocation.data.users.rows.map((user) => ({
        id: user.id,
        location: user.location,
      }));
      setTableData(newData);
    }
  }, [userLocation]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(
        `http://localhost:5000/api/userlocation/delete/${id}`,
        config
      );
      const newData = tableData.filter((row) => row.id !== id);
      setTableData(newData);
    } catch (error) {
      console.error("Error deleting user location:", error);
    }
  };

  const handleUpdate = (id) => {
    const row = tableData.find((item) => item.id === id);
    setSelectedRow(row);
    setUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setSelectedRow(null);
    setUpdateFormOpen(false);
  };

  const handleUpdateSuccess = (updatedLocation) => {
    const newData = tableData.map((row) => {
      if (row.id === selectedRow.id) {
        return { ...row, location: updatedLocation };
      }
      return row;
    });
    setTableData(newData);
    handleUpdateFormClose();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Table rows */}
      {tableData.map((rowData) => (
        <TableRow key={rowData.id}>
          <TableCell align="left">{rowData.id}</TableCell>
          <TableCell align="left">{rowData.location}</TableCell>
          <TableCell align="right">
            <Delete
              style={{ color: "red" }}
              onClick={() => handleDelete(rowData.id)}
            />
            <EditSharpIcon
              style={{ color: "blue" }}
              onClick={() => handleUpdate(rowData.id)}
            />
          </TableCell>
        </TableRow>
      ))}

      {/* Update form dialog */}
      {selectedRow && (
        <Dialog open={isUpdateFormOpen} onClose={handleUpdateFormClose}>
          <DialogTitle style={{ backgroundColor: "#1976d2", color:"white" }}>
            Update Location
          </DialogTitle>
          <DialogContent style={{ margin: "0px" }} >
            <UpdateForm
              id={selectedRow.id}
              initialLocation={selectedRow.location}
              onUpdate={handleUpdateSuccess}
              onCancel={handleUpdateFormClose}
            />
          </DialogContent>
          
          
        </Dialog>
      )}
    </>
  );
};

export { Index, fetchUserLocationList, useUserLocationList };
