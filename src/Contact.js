import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/contacts_us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Data successfully submitted
        toast.success('Thank you for reaching out to us.');
        // Reset the form
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
      } else {
        console.error('Error submitting form data:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Typography variant="h4" component="h1">Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Col>
          <Col sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Contact;
