import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Workshop = () => {
  const [workshopData, setWorkshopData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    location: '',
    teacher: '',
  });

  useEffect(() => {
    fetchWorkshopData();
    fetchTeacherData();
  }, []);

  const fetchWorkshopData = async () => {
    try {
      const response = await fetch('http://localhost:3000/workshop');
      const data = await response.json();
      setWorkshopData(data);
    } catch (error) {
      console.error('Error fetching workshop data:', error);
    }
  };

  const fetchTeacherData = async () => {
    try {
      const response = await fetch('http://localhost:3000/get_teachers');
      const data = await response.json();
      setTeacherData(data);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/workshop/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Data successfully submitted
        // Reset the form
        setFormData({
          topic: '',
          date: '',
          location: '',
          teacher: '',
        });

        // Fetch the updated workshop data
        fetchWorkshopData();
      } else {
        // Handle error
        console.error('Error submitting workshop data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting workshop data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Workshop</h1>

      <Grid container component={Paper} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {teacherData.map((teacher) => (
                      <MenuItem key={teacher.teacher_id} value={teacher.teacher_name}>
                        {teacher.teacher_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshopData.map((workshop) => (
              <TableRow key={workshop.id}>
                <TableCell>{workshop.id}</TableCell>
                <TableCell>{workshop.topic}</TableCell>
                <TableCell>{workshop.date}</TableCell>
                <TableCell>{workshop.location}</TableCell>
                <TableCell>{workshop.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Workshop
