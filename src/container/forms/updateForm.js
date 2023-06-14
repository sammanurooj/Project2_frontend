import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
          <Box>
            <Button type="submit" onClick={handleUpdate}>
              update
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateForm;
