import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import AppBar from "../components/appBar";
import UserLocationtable from "../components/Tables/userLoaction";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

function AddLocationForm({ onSave, onCancel }) {
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width={400}
        padding={3}
      >
        <TextField
          label="Location"
          value={location}
          onChange={handleLocationChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <Box>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Box>
      </Box>
    </form>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleAddLocation = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveLocation = useMutation(
    async (locationData) => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:5000/api/userlocation/addLocation",
        locationData,
        config
      );
    },
    {
      onSuccess: () => {
        handleClose();
      },
    }
  );

  return (
    <>
      <AppBar />
      <Box
        display="flex"
        justifyContent="flex-start"
        marginTop={5}
        marginLeft={30}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddLocation}
        >
          Add Location
        </Button>
      </Box>
      <Box>
        <UserLocationtable />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#e3f2fd" }}>
          Add Location
        </DialogTitle>
        <AddLocationForm
          onSave={handleSaveLocation.mutate}
          onCancel={handleClose}
        />
      </Dialog>
    </>
  );
}

export default MainPage;
