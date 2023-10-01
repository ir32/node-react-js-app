// Studentregistation.js

import React, { useEffect, useState } from 'react';
import '../css/style.css';

const Studentregistation = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    address: '',
    program: '',
    graduation_year: '',
  });

  useEffect(() => {
    // Fetch student data from your API or source here
    // For example, you can use the fetch function or Axios to fetch the data
    fetch('http://localhost:3000/All-student')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = () => {
    fetch('http://localhost:3000/student-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data submitted successfully:', data);
        // You can add any desired actions here, like closing the modal or refreshing the student list.
        resetForm(); // Optionally reset the form fields.
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle errors (e.g., display an error message to the user).
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFormData();
  };

  const resetForm = () => {
    setFormData({
      student_id: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone_number: '',
      address: '',
      program: '',
      graduation_year: '',
    });
  };

  return (
    <div>
      <h2>Student Data</h2>
      <button
        type="button"
        className="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add
      </button>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
              <h4 className="modal-title">Add Student</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birth">Date of Birth:	</label>
                  <input
                    type="text"
                    className="form-control"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Numbe:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='from-group'>
                    <label hrmlfor="address">Address</label>
                    <input type='text' id='address' name='address' value={formData.address} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number">Program:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                  />
                </div><div className="form-group">
                  <label htmlFor="graduation_year">Graduation year:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="graduation_year"
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add similar form groups for other fields */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <table id="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Program</th>
            <th>Graduation Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.student_id}>
              <td>{index + 1}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>
                {new Date(student.date_of_birth).toLocaleDateString()}
              </td>
              <td>{student.email}</td>
              <td>{student.phone_number}</td>
              <td>{student.address}</td>
              <td>{student.program}</td>
              <td>{student.graduation_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studentregistation;
