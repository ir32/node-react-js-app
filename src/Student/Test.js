import React, { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState([]);

  const [data1, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8');
        
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const userdata = async () => {
        try {
            const response = await fetch ('https://fakestoreapi.com/users');
            const data = await response.json();

            console.log(data);

            setUser(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
    userdata();
  }, []);

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
                <tr>Address</tr>
            </thead>
            <tbody>
                {data1.map((item, index) => (
                  <tr key={index}> 
                  
                    <td>{item.email}</td>
                  </tr>

                                
                ))}
                    
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;
