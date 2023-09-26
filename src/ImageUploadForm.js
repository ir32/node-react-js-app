import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUploadForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    // Make a POST request to the API
    axios.post('http://localhost:3000/postpic', formData)
      .then((response) => {
        // Handle successful response here
        console.log('Image uploaded successfully!');
        toast.success('Image uploaded successfully!');
        setName(''); // Reset the name field
        setImage(''); // Reset the image field
      })
      .catch((error) => {
        // Handle error here
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
      });
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ImageUploadForm;
