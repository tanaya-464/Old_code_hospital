import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import { Container, Typography } from '@mui/material';
import DoctorList from './components/DoctorList';
import AppointmentList from './components/AppointmentList';
import AdminDashboard from './components/AdminDashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        
        <BrowserRouter>
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/patients" element={<PatientList />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/appointments" element={<AppointmentList />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                
            </Routes>
            </AuthProvider>
        </BrowserRouter>
        
    );
};

export default App;
