import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Box, Typography, InputLabel, FormControl } from "@mui/material";
import { useGetClassDetailsByIdQuery, useUpdateClassMutation } from "../../services/api";

const EditClassForm = () => {
  const { classId } = useParams(); // Get the classId from the URL params
  const navigate = useNavigate();

  // Fetch class details by classId
  const { data: classDetails, isLoading, isError } = useGetClassDetailsByIdQuery(classId);
  const [updateClass] = useUpdateClassMutation();

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    classLink: "",
    file: null,
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
        file: null,
      });
    }
  }, [classDetails]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation check
    if (!formData.name || !formData.startTime || !formData.endTime) {
      alert("Please fill out all required fields.");
      return;
    }

    // Create FormData object for file upload
    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });

    try {
      await updateClass({ classId, ...uploadData });
      navigate("/Teacher/class"); // Navigate back after updating
    } catch (error) {
      console.error("Error updating class", error);
      alert("An error occurred while updating the class. Please try again.");
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
          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="name">
              Class Name
            </InputLabel>
            <TextField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="description">
              Description
            </InputLabel>
            <TextField
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="classLink">
              Class Link
            </InputLabel>
            <TextField
                id="classLink"
                name="classLink"
                value={formData.classLink}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="startTime">
              Start Time
            </InputLabel>
            <TextField
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                type="datetime-local"
                variant="outlined"
                fullWidth
                required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="endTime">
              End Time
            </InputLabel>
            <TextField
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                type="datetime-local"
                variant="outlined"
                fullWidth
                required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel shrink htmlFor="file">
              Upload PDF
            </InputLabel>
            <input
                type="file"
                id="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <Button variant="outlined" component="label" fullWidth>
              Choose File
              <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
            </Button>
          </FormControl>

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
