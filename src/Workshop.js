import React, { useState, useEffect } from 'react';

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
        setFormData({
          topic: '',
          date: '',
          location: '',
          teacher: '',
        });

        fetchWorkshopData();
      } else {
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
    <div className="container mt-5">
      <h1>Workshop</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teacher</label>
          <select
            className="form-select"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
          >
            <option value="">Select Teacher</option>
            {teacherData.map((teacher) => (
              <option key={teacher.teacher_id} value={teacher.teacher_name}>
                {teacher.teacher_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Topic</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
            <th scope="col">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {workshopData.map((workshop) => (
            <tr key={workshop.id}>
              <td>{workshop.id}</td>
              <td>{workshop.topic}</td>
              <td>{workshop.date}</td>
              <td>{workshop.location}</td>
              <td>{workshop.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workshop;
