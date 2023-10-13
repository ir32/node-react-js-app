import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Contact from './Contact';
import Workshop from './Workshop';
import Admision from './Admision';
import ImageUploadForm from './ImageUploadForm'; // Import the ImageUploadForm component
import Registration from '../src/Login/Registration'; // Import the RegistrationForm component
import Login from '../src/Login/Login'; // Import the LoginForm component
import Studentregistation from '../src/Student/Studentregistation';
import Studenttest from '../src/Dashboard/dashboard';


const App = () => {
  
  return (
    <Router>
      <div>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/Admision" element={<Admision />} />
          <Route path="/upload" element={<ImageUploadForm />} /> {/* New route for ImageUploadForm */}
          <Route path="/register" element={<Registration />} /> {/* New route for RegistrationForm */}
          <Route path="/login" element={<Login/>} />
          <Route path="/student" element={<Studentregistation />} />
          <Route path="/dashboard" element={<Studenttest />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
