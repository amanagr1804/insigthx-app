import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterSelection from './components/RegisterSelection';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Layout from './components/Layout';
import PatientDetailsPage from './components/DetailsSuccess';
import AllReportsPage from './components/AllReportsPage';
import TemplatesPage from './components/Templates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
            <Route path="/register/:role" element={<RegisterForm />} />
            <Route path="/patient-details" element={<PatientDetailsPage />} />
            <Route path="/reports" element={<AllReportsPage/>}/>
            <Route path="/templates" element={<TemplatesPage/>}/>
            </Routes>
          </Layout>
        }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
