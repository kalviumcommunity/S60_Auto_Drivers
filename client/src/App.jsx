import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/Form';
import Register from './Components/Register';
import Update from './Components/Update';
import Login from './Components/Login';
import Filter from './Components/Filter';
import './App.css';

const App = () => {
  // Retrieve isAuthenticated state from localStorage if available
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Function to handle successful login
  const handleLogin = () => {
    // Update isAuthenticated to true upon successful login
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear isAuthenticated state and localStorage
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Store isAuthenticated state in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/form" element={<Form />} />
      <Route path="/update/:id" element={<Update />} />
      {/* Pass handleLogin function to Login component */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/logout" element={<Navigate to="/login" replace={true} />} onClick={handleLogout} />
      <Route path='/filter' element={<Filter />} />
      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  );
};

export default App;
