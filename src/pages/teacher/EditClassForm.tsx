import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useGetClassDetailsByIdQuery, useUpdateClassMutation } from "../../services/api";

const EditClassForm = () => {
  const { classId } = useParams(); // Get the classId from the URL params
  const navigate = useNavigate();
  
  // Fetch class details by classId
  const { data: classDetails, isLoading, isError, refetch } = useGetClassDetailsByIdQuery(classId);
  const [updateClass] = useUpdateClassMutation();

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    classLink: "",
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (classDetails) {
      setFormData({
        name: classDetails.data.name || "",
        description: classDetails.data.description || "",
        startTime: classDetails.data.startTime || "",
        endTime: classDetails.data.endTime || "",
        classLink: classDetails.data.classLink || "",
      });
    }
  }, [classDetails]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation check
    if (!formData.name || !formData.startTime || !formData.endTime) {
      alert("Please fill out all required fields.");
      return;
    }
  
    try {
      await updateClass({ classId, ...formData });
      navigate("/Teacher/class"); // Navigate back after updating
    } catch (error) {
      console.error("Error updating class", error);
    }
  };

  if (isLoading) {
    return <Typography>Loading class data...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching class data. Please try again later.</Typography>;
  }

  return (
    <Paper sx={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Class Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Class Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Class Link"
          name="classLink"
          value={formData.classLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="datetime-local"
        />
        <TextField
          label="End Time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="datetime-local"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/Teacher/class")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditClassForm;
