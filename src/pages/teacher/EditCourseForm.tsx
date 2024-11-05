import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { createCourseSchema } from "../../yup"; // Validation schema import
import { notifyError, notifySuccess } from "../../toast";
import { useGetAllSubjectsQuery, useGetCourseByIdQuery, useUpdateCourseMutation, useUploadDocsMutation } from "../../services/api";

interface ICourseInput {
  name?: string;
  description?: string;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  subject?: string;
  attachment_url?: string;
}

const EditCourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const { data: subjects } = useGetAllSubjectsQuery();
  const { data: courseDetails, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [uploadDocs] = useUploadDocsMutation();

  const { handleSubmit, control, setValue, formState: { errors } } = useForm<ICourseInput>({
    resolver: yupResolver(createCourseSchema),
  });

  useEffect(() => {
    if (courseDetails) {
      const { name, description, price, startDate, endDate, subject, attachment_url } = courseDetails.data;
      setValue("name", name || "");
      setValue("description", description || "");
      setValue("price", price || 0);
      setValue("startDate", startDate ? new Date(startDate).toISOString().split("T")[0] : "");
      setValue("endDate", endDate ? new Date(endDate).toISOString().split("T")[0] : "");
      setValue("subject", subject._id);
      setAttachmentUrl(attachment_url);
    }
  }, [courseDetails, setValue]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { data: attachmentData } = await uploadDocs(file);
        setAttachmentUrl(attachmentData.data.fileUrl);
        notifySuccess("File uploaded successfully!");
      } catch (error) {
        notifyError("File upload failed. Please try again.");
      }
    }
  };

  const onSubmit = async (data: ICourseInput) => {
    try {
      data.attachment_url = attachmentUrl;
      await updateCourse({ courseId, ...data }).unwrap();
      notifySuccess("Course updated successfully!");
      navigate("/Teacher/course");
    } catch (error) {
      notifyError("Failed to update the course. Please try again.");
    }
  };

  if (isLoading) return <Typography>Loading course data...</Typography>;
  if (isError) return <Typography>Error loading course data. Please try again.</Typography>;

  return (
    <StyledContainer sx={{mt:5}}>
      <StyledBox sx={{width:500}}>
        <Stack spacing={3} sx={{ alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Edit Course Details</Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Description"
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={5}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="End Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
            <Controller
            name="subject"
            control={control}
            render={({ field }) => (
                <TextField
                {...field}
                select
                label="Select Subject"
                variant="outlined"
                fullWidth
                error={!!errors.subject}
                helperText={errors.subject?.message}
                value={field.value || ""}  // Ensure value is set to subject ID or empty string initially
                onChange={(e) => field.onChange(e.target.value)}
                >
                {subjects?.data?.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                    {subject.name}
                    </MenuItem>
                ))}
                </TextField>
            )}
            />
            <Button variant="outlined" component="label">
              Upload PDF
              <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isUpdating}
            >
              {isUpdating ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
            <Button variant="outlined" onClick={() => navigate("/Teacher/class")} fullWidth>
              Cancel
            </Button>
          </Stack>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default EditCourseForm;

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 2rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
