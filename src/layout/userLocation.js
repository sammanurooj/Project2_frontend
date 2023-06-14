import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import AppBar from "../components/appBar";
import UserLocationtable from "../components/Tables/userLoaction";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import CancelIcon from "@mui/icons-material/Cancel";


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
          <Button type="submit"
          
          startIcon={<AddCircleOutlineSharpIcon />}
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          
            
          >Save</Button>
          <Button 
            startIcon={<CancelIcon />}
          onClick={onCancel}>Cancel</Button>
        </Box>
      </Box>
    </form>
  );
}

function MainPage() {
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
        marginTop={4}
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
        <UserLocationtable mt={1}/>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#1976d2", color:"white" }}>
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
