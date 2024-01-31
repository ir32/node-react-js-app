import React, { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState([]);
  const [data1, setUser] = useState([]);
  
  // Post
  const [formData, setFormData] = useState({
    email: '',
    street: '',
    city: '',
    lat: '',
  });


  // Get data from table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const userdata = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    userdata();
  }, []);


  // handle post request

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/test_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        // Optionally reset the form fields after submission
        setFormData({
          email: '',
          street: '',
          city: '',
          zipcode: '',
        });
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => (
            <tr key={index}>
              <td>{items.name}</td>
              <td>{items.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Address</th>
              <th>Geolocation</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
                <td>{item.address.geolocation.lat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} />

          <label>Street:</label>
          <input type="text" name="street" value={formData.street} onChange={handleInputChange} />

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <label>zipcode (zipcode):</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Test;
