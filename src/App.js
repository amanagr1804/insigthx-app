import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterSelection from './components/RegisterSelection';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/register/:role" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
