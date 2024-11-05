// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import PatientList from './PatientList';
import DoctorList from './DoctorList';
import AppointmentList from './AppointmentList';
import building from '../assests/building.jpg';
import appointment from '../assests/appointment.jpg'
import doctor from '../assests/doctor.jpg'
import health from '../assests/health.jpg'
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
    const [totalPatients, setTotalPatients] = useState(0);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0); // State to hold total patients count

    useEffect(() => {
        // Fetch total number of patients
        const fetchPatientCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patients/count'); // Adjust the endpoint as necessary
                setTotalPatients(response.data.count); // Assuming the API returns { count: <number> }
            } catch (error) {
                console.error('Error fetching patient count:', error);
            }
        };

        fetchPatientCount();
    }, []);

    useEffect(() => {
        // Fetch total number of doctors
        const fetchDoctorCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/doctors/count'); // Adjust the endpoint as necessary
                setTotalDoctors(response.data.count); // Assuming the API returns { count: <number> }
            } catch (error) {
                console.error('Error fetching doctors count:', error);
            }
        };

        fetchDoctorCount();
    }, []);

    useEffect(() => {
        // Fetch total number of patients
        const fetchAppointmentCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/appointments/count'); // Adjust the endpoint as necessary
                setTotalAppointments(response.data.count); // Assuming the API returns { count: <number> }
            } catch (error) {
                console.error('Error fetching appointment count:', error);
            }
        };

        fetchAppointmentCount();
    }, []);

    return (
        <Container style={{ marginTop: '70px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Appointment Statistics Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={appointment}
                            alt="Appointments"
                        />
                        <CardContent>
                            <Typography variant="h5">Total Appointments</Typography>
                            <Typography variant="body2" color="textSecondary">
                                You have a total of {totalAppointments} appointments .
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Patient Summary Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={building}
                            alt="Patients"
                        />
                        <CardContent>
                            <Typography variant="h5">Total Patients</Typography>
                            <Typography variant="body2" color="textSecondary">
                                There are currently {totalPatients} registered patients.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Doctor Information Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={doctor}
                            alt="Doctors"
                        />
                        <CardContent>
                            <Typography variant="h5">Total Doctors</Typography>
                            <Typography variant="body2" color="textSecondary">
                                We have {totalDoctors} active doctors available for consultations.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Reports Section */}
            <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
                Reports
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Monthly Appointment Report</Typography>
                            <Typography variant="body2" color="textSecondary">
                                A detailed report of all appointments scheduled for the month.
                            </Typography>
                            <a href="/reports/monthly-appointments" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="primary">
                                    View Report
                                </Typography>
                            </a>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Patient Demographics Report</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Insights into patient demographics and statistics.
                            </Typography>
                            <a href="/reports/patient-demographics" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="primary">
                                    View Report
                                </Typography>
                            </a>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Doctor Performance Report</Typography>
                            <Typography variant="body2" color="textSecondary">
                                An overview of doctor performance metrics and feedback.
                            </Typography>
                            <a href="/reports/doctor-performance" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" color="primary">
                                    View Report
                                </Typography>
                            </a>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
