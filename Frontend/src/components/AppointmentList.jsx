// src/components/AppointmentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Paper,
    Grid,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,CardActions,IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentList = () => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('patient'); // Default search by patient
    const [isValid, setIsValid] = useState(false); // State for validation
    const [openDialog, setOpenDialog] = useState(false); // State for the dialog
    const [sortAppointments, setSortAppointments] = useState(false); // State for sorting

    useEffect(() => {
        // Fetch patients and doctors for dropdowns
        axios.get('http://localhost:8080/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error("There was an error fetching patients!", error));

        axios.get('http://localhost:8080/api/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error("There was an error fetching doctors!", error));

        // Fetch appointments
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/appointments');
            setAppointments(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/appointments/${id}`);
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const validateAppointment = () => {
        const currentDateTime = new Date();
        const selectedDateTime = new Date(appointmentDate);

        // Check if appointment date is in the past
        if (selectedDateTime < currentDateTime) {
            setIsValid(false);
            return false;
        }

        // Check for overlapping appointments
        const overlap = appointments.some(appointment => {
            const appointmentStart = new Date(appointment.appointmentDate);
            const appointmentEnd = new Date(appointment.appointmentEndDate); // Assuming you have an end date

            return selectedDateTime >= appointmentStart && selectedDateTime <= appointmentEnd;
        });

        if (overlap) {
            setIsValid(false);
            return false;
        }

        setIsValid(true);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAppointment()) return; // Validate before proceeding

        const appointment = {
            appointmentDate,
            patient: { id: patientId },
            doctor: { id: doctorId }
        };

        axios.post('http://localhost:8080/api/appointments', appointment)
            .then(response => {
                console.log("Appointment created successfully:", response.data);
                fetchAppointments(); // Refresh the appointment list after adding a new appointment
                setSuccessMessage('Appointment added successfully!'); // Show success message
                // Reset form
                setAppointmentDate('');
                setPatientId('');
                setDoctorId('');
            })
            .catch(error => {
                console.error("There was an error creating the appointment!", error);
                setError('Failed to create appointment. Please try again.'); // Show error message
            });
    };

    // Function to filter appointments based on search criteria
    const filteredAppointments = appointments.filter(appointment => {
        const patientName = appointment.patient.name.toLowerCase();
        const doctorName = appointment.doctor.name.toLowerCase();
        const searchValue = searchTerm.toLowerCase();

        if (searchBy === 'patient') {
            return patientName.includes(searchValue);
        } else {
            return doctorName.includes(searchValue);
        }
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const toggleSortAppointments = () => {
        setSortAppointments(prev => !prev);
    };

    const sortedAppointments = sortAppointments 
        ? [...appointments].sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        : appointments;

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return <div>Error fetching appointments: {error.message}</div>;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Appointment Management
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type="datetime-local"
                                value={appointmentDate}
                                onChange={e => {
                                    setAppointmentDate(e.target.value);
                                    validateAppointment(); // Validate on change
                                }}
                                required
                                label="Appointment Date"
                                variant="outlined"
                                fullWidth
                        
                                InputLabelProps={{
                                    shrink: true, // This will force the label to shrink
                                }}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16), // Set minimum date to current date and time
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Select Patient"
                                value={patientId}
                                onChange={e => setPatientId(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                            >
                                {patients.map(patient => (
                                    <MenuItem key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Select Doctor"
                                value={doctorId}
                                onChange={e => setDoctorId(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                            >
                                {doctors.map(doctor => (
                                    <MenuItem key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="flex-start">
                                <Grid item>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        style={{ marginTop: '20px' }} 
                                        disabled={!isValid} // Disable button until validations are satisfied
                                    >
                                        Add Appointment
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        onClick={handleOpenDialog} 
                                        style={{ marginLeft: '10px',marginTop:'20px' }} 
                                        
                                    >
                                        Display All Appointments
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Search Appointments
                </Typography>
                <RadioGroup
                    row
                    value={searchBy}
                    onChange={e => setSearchBy(e.target.value)}
                >
                    <FormControlLabel value="patient" control={<Radio />} label="Search by Patient Name" />
                    <FormControlLabel value="doctor" control={<Radio />} label="Search by Doctor Name" />
                </RadioGroup>
                <TextField
                    placeholder={`Search by ${searchBy === 'patient' ? 'Patient' : 'Doctor'} Name`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />

{searchTerm && (
                                <Typography variant="h6" gutterBottom>
                                    Search Results:
                                </Typography>
                            )}
                {searchTerm && (
                <Grid container spacing={2}>
                    {filteredAppointments.map(appointment => (
                        <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Patient Name: {appointment.patient.name}</Typography>
                                    <Typography>Patient Contact: {appointment.patient.contactNumber}</Typography>
                                    <Typography>Doctor Name: {appointment.doctor.name}</Typography>
                                    <Typography>Doctor Specialty: {appointment.doctor.specialty}</Typography>
                                    <Typography>Appointment Date: {new Date(appointment.appointmentDate).toLocaleString()}</Typography>
                                </CardContent>
                                <CardActions>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteAppointment(appointment.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                )}

                {/* Dialog for displaying all appointments */}
                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                    <DialogTitle>All Appointments</DialogTitle>
                    <DialogContent>
                        <Grid container alignItems="center">
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={sortAppointments}
                                            onChange={toggleSortAppointments}
                                            color="primary"
                                        />
                                    }
                                    label="Sort by Appointment Date"
                                />
                            </Grid>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell>Doctor Name</TableCell>
                                        <TableCell>Appointment Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(sortAppointments ? sortedAppointments : appointments).map(appointment => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>{appointment.patient.name}</TableCell>
                                            <TableCell>{appointment.doctor.name}</TableCell>
                                            <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                    <Alert onClose={() => setSuccessMessage('')} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>

                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default AppointmentList;
