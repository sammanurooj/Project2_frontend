import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SystemUpdateAltSharpIcon from '@mui/icons-material/SystemUpdateAltSharp'
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateForm = ({ id, initialLocation, onUpdate, onCancel }) => {
  const [updatedLocation, setUpdatedLocation] = useState(initialLocation);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/userlocation/update/${id}`,
        { location: updatedLocation },
        config
      );

      onUpdate(updatedLocation);
      onCancel();
    } catch (error) {
      console.error("Error updating user location:", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width={400}
        padding={3}
      >
        <TextField
          type="text"
          value={updatedLocation}
          onChange={(e) => setUpdatedLocation(e.target.value)}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <Box>
          <Button
            type="submit"
            onClick={handleUpdate}
            startIcon={<SystemUpdateAltSharpIcon />}
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Update
          </Button>
          <Button
            onClick={onCancel}
            startIcon={<CancelIcon />}
            
           
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateForm;
