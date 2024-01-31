// Studentregistation.js

import React, { useEffect, useState } from 'react';
import '../css/style.css';
// import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
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
    const [successMessage, setSuccessMessage] = useState('');

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
    // excel data
    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(students);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'student_data.xlsx');
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
                // Show success message
                setSuccessMessage('Data submitted successfully.');
                // Optionally reset the form fields.
                resetForm();
                // Refresh the student data
                fetch('http://localhost:3000/All-student')
                    .then((response) => response.json())
                    .then((data) => setStudents(data))
                    .catch((error) =>
                        console.error('Error fetching student data:', error)
                    );
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFormData();
        // Close the modal using jQuery
        window.jQuery('#myModal').modal('hide');
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
    // Delete 
    const handleDelete = (studentId) => {
        console.log(studentId);
        // Perform the delete operation using the studentId
        fetch(`http://localhost:3000/student/${studentId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data deleted successfully:', data);
                // Fetch the updated student data or filter the current student list
                fetch('http://localhost:3000/All-student')
                    .then((response) => response.json())
                    .then((data) => setStudents(data))
                    .catch((error) =>
                        console.error('Error fetching student data:', error)
                    );
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
                // Handle errors (e.g., display an error message to the user).
            });
    }
    // End Delete
    
    const [selectedStudent, setSelectedStudent] = useState(null);
    const handleEditInputChange = (e) => {
        setSelectedStudent({
            ...selectedStudent,
            [e.target.name]: e.target.value,
        });
    };
    const handleEdit = (studentId) => {
        // Fetch the student data for the given studentId
        fetch(`http://localhost:3000/edit-student/${studentId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSelectedStudent(data[0]); // Assuming you receive a single student object
                // Open the new edit modal
                window.jQuery('#editModal').modal('show');
            })
            .catch((error) => console.error('Error fetching student data:', error));
    };
    const handleEditSubmit = () => {
        // Prepare the updated student data
        const updatedStudentData = {
            first_name: selectedStudent.first_name,
            last_name: selectedStudent.last_name,
            date_of_birth: selectedStudent.date_of_birth,
            email: selectedStudent.email,
            phone_number: selectedStudent.phone_number,
            address: selectedStudent.address,
            program: selectedStudent.program,
            graduation_year: selectedStudent.graduation_year,
        };
    
        // Send a PUT request to update the student data
        fetch(`http://localhost:3000/update-student/${selectedStudent.student_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStudentData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data updated successfully:', data);
                // Optionally close the edit modal
                window.jQuery('#editModal').modal('hide');
                // Refresh the student data or perform any necessary actions
                // Fetch updated student data if needed
            })
            .catch((error) => console.error('Error updating student data:', error));
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
            <button style={{ marginLeft: '5px' }} onClick={handleExportToExcel}><i className="fas fa-download"></i></button>
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
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
                                    <label htmlFor="birth">Date of Birth:</label>
                                    <input
                                        type="date"
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
                                    <label htmlFor="phone_number">Phone Number:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="program">Program:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="program"
                                        name="program"
                                        value={formData.program}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="graduation_year">Graduation Year:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="graduation_year"
                                        name="graduation_year"
                                        value={formData.graduation_year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                &times;
                            </button>
                            <h4 className="modal-title">Edit Student</h4>
                        </div>
                        <div className="modal-body">
                            {/* Edit student form */}
                            <form  onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="first_name"
                                        name="first_name"
                                        value={selectedStudent ? selectedStudent.first_name : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="last_name"
                                        name="last_name"
                                        value={selectedStudent ? selectedStudent.last_name : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_date_of_birth">Date of Birth:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        value={selectedStudent ? selectedStudent.date_of_birth : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_email">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={selectedStudent ? selectedStudent.email : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_phone_number">Phone:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone_number"
                                        name="phone_number"
                                        value={selectedStudent ? selectedStudent.phone_number : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_address">Address:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={selectedStudent ? selectedStudent.address : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_program">Program:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="program"
                                        name="program"
                                        value={selectedStudent ? selectedStudent.program : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit_graduation_year">Graduation Year:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="graduation_year"
                                        name="graduation_year"
                                        value={selectedStudent ? selectedStudent.graduation_year : ''}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
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
                        <th>Action</th>
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
                            <td><button onClick={() => handleEdit(student.student_id)}>Edit</button>
                                <button onClick={() => handleDelete(student.student_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Studentregistation;
