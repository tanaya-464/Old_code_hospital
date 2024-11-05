// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Hospital Management System
                </Typography>
                {isAuthenticated ? (
                    <>
                    <Button component={Link} to="/admindashboard" color="inherit">Home</Button>
                        <Button component={Link} to="/patients" color="inherit">Patients</Button>
                        <Button component={Link} to="/doctors" color="inherit">Doctors</Button>
                        <Button component={Link} to="/appointments" color="inherit">Appointments</Button>
                        <Button onClick={logout} color="inherit">Logout</Button>{logout}
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/login" color="inherit">Login</Button>
                        <Button component={Link} to="/signup" color="inherit">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
