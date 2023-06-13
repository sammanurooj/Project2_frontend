import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Delete, Update } from "@mui/icons-material";
import { TableRow, TableCell } from "@mui/material";
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
  const tableData =
    userLocation && Array.isArray(userLocation.data.users.rows)
      ? userLocation.data.users.rows.map((user) => ({
          id: user.id,
          location: user.location,
        }))
      : [];

  return tableData.map((rowData) => (
    <TableRow key={rowData.id}>
      <TableCell align="left">{rowData.id}</TableCell>
      <TableCell align="left">{rowData.location}</TableCell>
      <TableCell align="right">
        <Delete style={{ color: "red" }} />
        <Update style={{ color: "blue" }} />
      </TableCell>
    </TableRow>
  ));
};

export { Index, fetchUserLocationList, useUserLocationList };
