import React, { useState, useEffect } from 'react';
import { useUploadMainLogoMutation, useFetchMainLogoQuery, useUploadBrandLogoMutation, useFetchBrandLogosQuery } from '../../services/api'; // Adjust the import path as needed
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { notifyError, notifySuccess } from '../../toast'; // Assuming these are your notification functions
import styled from 'styled-components';

const LogoUpload: React.FC = () => {
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [brandFiles, setBrandFiles] = useState<File[]>([]);
  const [mainPreviewUrl, setMainPreviewUrl] = useState<string | null>(null);
  const [brandPreviewUrls, setBrandPreviewUrls] = useState<string[]>([]);
  const [uploadMainLogo, { isLoading: isMainLoading }] = useUploadMainLogoMutation();
  const [uploadBrandLogo, { isLoading: isBrandLoading }] = useUploadBrandLogoMutation();
  const { data: currentMainLogo } = useFetchMainLogoQuery();
  const { data: brandLogos } = useFetchBrandLogosQuery();

  useEffect(() => {
    // Set the initial preview URL for the main logo if it exists
    if (currentMainLogo) {
      setMainPreviewUrl(currentMainLogo.data.logo);
    }
  }, [currentMainLogo]);

  const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setMainFile(selectedFile);
  };

  const handleBrandFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setBrandFiles(files);

    // Update brand previews
    const urls = files.map(file => URL.createObjectURL(file));
    setBrandPreviewUrls(urls);
  };

  const handleMainUpload = async () => {
    if (!mainFile) {
      notifyError('Please select a main logo to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('logo', mainFile);

      const response = await uploadMainLogo(formData).unwrap();
      notifySuccess(response.message || 'Main logo uploaded successfully!');
      setMainFile(null);
      setMainPreviewUrl(response.data.imageUrl)
    } catch (err) {
      handleUploadError(err);
    }
  };

  const handleBrandUpload = async () => {
    if (brandFiles.length === 0) {
      notifyError('Please select brand logos to upload.');
      return;
    }

    try {
      const formData = new FormData();
      brandFiles.forEach(file => {
        formData.append('logos', file);
      });

      const response = await uploadBrandLogo(formData).unwrap(); // Ensure this handles multiple files correctly
      notifySuccess(response.message || 'Brand logos uploaded successfully!');

      // Clear the file input after successful upload
      setBrandFiles([]);
      setBrandPreviewUrls([]);
    } catch (err) {
      handleUploadError(err);
    }
  };

  const handleUploadError = (err: any) => {
    const error = err as { message: string; data?: { errors?: Array<{ msg: string }> } };
    const message =
      error.message === "Validation error!"
        ? error.data?.errors[0].msg ?? "Something went wrong"
        : error.message ?? "Something went wrong";
    notifyError(message);
  };

  const removeBrandPreview = (index: number) => {
    const newFiles = brandFiles.filter((_, i) => i !== index);
    setBrandFiles(newFiles);
    
    // Remove corresponding preview URL
    const newUrls = brandPreviewUrls.filter((_, i) => i !== index);
    setBrandPreviewUrls(newUrls);
  };

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h5" gutterBottom>
          Upload Main Logo
        </Typography>

        {mainPreviewUrl ? (
          <Box sx={{ mb: 2 }}>
            <img src={mainPreviewUrl} alt="Current Logo" style={{ width: '150px', height: 'auto', marginBottom: '16px' }} />
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            No main logo uploaded yet.
          </Typography>
        )}

        <Stack spacing={2}>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleMainFileChange}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleMainUpload}
            disabled={isMainLoading || !mainFile}
            sx={{
              backgroundColor: isMainLoading ? 'grey' : '#3f51b5',
              '&:hover': {
                backgroundColor: isMainLoading ? 'grey' : '#303f9f',
              },
            }}
          >
            {isMainLoading ? <CircularProgress size={24} color="inherit" /> : 'Upload Main Logo'}
          </Button>
        </Stack>
      </StyledBox>

      <StyledBox>
        <Typography variant="h5" gutterBottom>
          Upload Brands Logos
        </Typography>

        {brandLogos?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Existing Brand Logos:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {brandLogos.map((url, index) => (
                <Box key={index} sx={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                  <img src={url} alt={`Brand Logo ${index + 1}`} style={{ width: '150px', height: 'auto' }} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {brandPreviewUrls.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Previews:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {brandPreviewUrls.map((url, index) => (
                <Box key={index} sx={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                  <img src={url} alt={`Brand Logo Preview ${index + 1}`} style={{ width: '150px', height: 'auto' }} />
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      minWidth: '20px',
                      backgroundColor: 'red',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'darkred',
                      },
                    }}
                    onClick={() => removeBrandPreview(index)}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Stack spacing={2}>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*', multiple: true }}
            onChange={handleBrandFileChange}
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleBrandUpload}
            disabled={isBrandLoading || brandFiles.length === 0}
            sx={{
              backgroundColor: isBrandLoading ? 'grey' : '#3f51b5',
              '&:hover': {
                backgroundColor: isBrandLoading ? 'grey' : '#303f9f',
              },
            }}
          >
            {isBrandLoading ? <CircularProgress size={24} color="inherit" /> : 'Upload Brand Logos'}
          </Button>
        </Stack>
      </StyledBox>
    </StyledContainer>
  );
};

export default LogoUpload;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 20px; /* Optional padding */
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  width: 100%; /* Set width to 100% */
  padding: 30px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
