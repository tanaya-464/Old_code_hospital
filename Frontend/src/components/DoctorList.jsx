// src/components/DoctorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Snackbar,
    Alert,
    Paper,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false); 
    const [openDialogdisplay, setOpenDialogdisplay] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);// State for the dialog

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const addDoctor = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/doctors', newDoctor);
            setDoctors([...doctors, response.data]);
            setNewDoctor({ name: '', specialty: '' });
            setSuccessMessage('Doctor added successfully!');
        } catch (error) {
            setError('Failed to add doctor. Please try again.');
        }
    };

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/doctors/${id}`);
            fetchDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    // Search functionality
    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Open dialog to display all doctors
    const handleOpenDialog = () => {
        setOpenDialogdisplay(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDialogdisplay(false);
    };

    const openEditDialog = (doctor) => {
        setSelectedDoctor(doctor);
        setNewDoctor({
            name: doctor.name,
            specialty: doctor.specialty,
            
        });
        //setEditMode(true);
        setOpenDialog(true);
    };
    const updateDoctor = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8080/api/doctors/${selectedDoctor.id}`, newDoctor);
            const updatedDoctors = doctors.map(doctor => 
                doctor.id === response.data.id ? response.data : doctor
            );

            setDoctors(updatedDoctors);
            //setEditMode(false);
            setOpenDialog(false);
            setSuccessMessage('Doctor updated successfully!');
        } catch (error) {
            console.error('Failed to update doctor:', error);
            setError('Failed to update doctor. Please try again.');
        }
    };


    // Validation functions
    const isNameValid = (name) => /^[A-Za-z\s.]+$/.test(name); // Only letters and spaces, no numbers
    const isSpecialtyValid = (specialty) => specialty.trim() !== ''; // Specialty should not be empty

    const isFormValid = () => {
        return (
            isNameValid(newDoctor.name) &&
            isSpecialtyValid(newDoctor.specialty)
        );
    };

    return (
        <Container maxWidth="md" className="container">
            <Paper elevation={3} className="paper">
                <Typography variant="h4" gutterBottom className="title">
                    Doctor Management
                </Typography>
                
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Typography variant="h5" gutterBottom className="form-title">
                            Add New Doctor
                        </Typography>
                        <form onSubmit={addDoctor}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={newDoctor.name}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                        required
                                        error={!isNameValid(newDoctor.name) && newDoctor.name !== ''}
                                        helperText={!isNameValid(newDoctor.name) && newDoctor.name !== '' ? 'Name cannot contain numbers or special characters.' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Specialty"
                                        variant="outlined"
                                        fullWidth
                                        value={newDoctor.specialty}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                        required
                                        error={!isSpecialtyValid(newDoctor.specialty) && newDoctor.specialty !== ''}
                                        helperText={!isSpecialtyValid(newDoctor.specialty) && newDoctor.specialty !== '' ? 'Specialty cannot be empty.' : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        color="primary" 
                                        disabled={!isFormValid()} // Disable button based on form validity
                                    >
                                        Add Doctor
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        onClick={handleOpenDialog} 
                                    >
                                        Display All Doctors
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Search Doctor
                        </Typography>
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                    </Grid>

                    <Grid item>
                    
                            {searchQuery && (
                                <Typography variant="h6" gutterBottom>
                                    Search Results:
                                </Typography>
                            )}
                             {searchQuery && (
                                <Grid container spacing={2}>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                                        <Card className="patient-card">
                                            <CardContent>
                                                <Typography variant="h6">{doctor.name}</Typography>
                                                <Typography>Specialty: {doctor.specialty}</Typography>
                                            </CardContent>
                                            <CardActions>
                                            <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(doctor)}>
                                            <EditIcon />
                                        </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => deleteDoctor(doctor.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography className="no-patients">No doctors found.</Typography>
                                </Grid>
                            )}
                        </Grid>
                    )}
                    </Grid>
                </Grid>

                {/* Dialog for displaying all doctors */}
                <Dialog open={openDialogdisplay} onClose={handleCloseDialog} fullWidth>
                    <DialogTitle>All Doctors</DialogTitle>
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Specialty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {doctors.map(doctor => (
                                        <TableRow key={doctor.id}>
                                            <TableCell>{doctor.name}</TableCell>
                                            <TableCell>{doctor.specialty}</TableCell>
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

                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                    <DialogTitle>Update Doctor</DialogTitle>
                    <DialogContent>
                        <form onSubmit={updateDoctor}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={newDoctor.name}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Speciality"
                                        variant="outlined"
                                        fullWidth
                            
                                        value={newDoctor.specialty}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                        required
                                    />
                                </Grid>
                                
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                        <Button type="submit" onClick={updateDoctor} color="primary">Update</Button>
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

export default DoctorList;
