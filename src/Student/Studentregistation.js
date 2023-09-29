// Studentregistation.js

import React, { useEffect, useState } from 'react';
import '../css/style.css';

const Studentregistation = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from your API or source here
    // For example, you can use the fetch function or Axios to fetch the data
    fetch('http://localhost:3000/All-student')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  return (
    <div>
      <h2>Student Data</h2>
      <table id='student-table'>
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
              <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
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
