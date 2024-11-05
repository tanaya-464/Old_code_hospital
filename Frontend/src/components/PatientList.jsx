// src/components/PatientList.js
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
import '../assests/PatientList.css' // Import the CSS file

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: '',
        age: '',
        gender: '',
        contactNumber: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogdisplay, setOpenDialogdisplay] = useState(false); // State for the dialog
    const [editMode, setEditMode] = useState(false); // State for edit mode
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const addPatient = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/patients', newPatient);
            setPatients([...patients, response.data]);
            setNewPatient({ name: '', age: '', gender: '', contactNumber: '' });
            setSuccessMessage('Patient added successfully!');
        } catch (error) {
            setError('Failed to add patient. Please try again.');
        }
    };

    const deletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/patients/${id}`);
            fetchPatients();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    // Filter patients based on the search query
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Open dialog to display all patients
    const handleOpenDialog = () => {
        setOpenDialogdisplay(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpenDialogdisplay(false);
    };

    const openEditDialog = (patient) => {
        setSelectedPatient(patient);
        setNewPatient({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            contactNumber: patient.contactNumber
        });
        setEditMode(true);
        setOpenDialog(true);
    };

    const updatePatient = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8080/api/patients/${selectedPatient.id}`, newPatient);
            const updatedPatients = patients.map(patient => 
                patient.id === response.data.id ? response.data : patient
            );

            setPatients(updatedPatients);
            setEditMode(false);
            setOpenDialog(false);
            setSuccessMessage('Patient updated successfully!');
        } catch (error) {
            console.error('Failed to update patient:', error);
            setError('Failed to update patient. Please try again.');
        }
    };

    // Validation functions
    const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name); // Only letters and spaces, no special characters
    const isAgeValid = (age) => /^\d+$/.test(age) && age > 0; // Only positive numbers
    const isGenderValid = (gender) => gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female';
    const isContactNumberValid = (contactNumber) => /^\d{10}$/.test(contactNumber); // Exactly 10 digits

    const isFormValid = () => {
        return (
            isNameValid(newPatient.name) &&
            isAgeValid(newPatient.age) &&
            isGenderValid(newPatient.gender) &&
            isContactNumberValid(newPatient.contactNumber)
        );
    };

    return (
        <Container maxWidth="md" className="container">
            <Paper elevation={3} className="paper">
                <Typography variant="h4" gutterBottom className="title">
                    Patient Management
                </Typography>
                
                <Grid container spacing={2} direction="column">
                <Grid item>
    <Typography variant="h5" gutterBottom className="form-title">
        Add New Patient
    </Typography>
    <form onSubmit={addPatient}>
        <Grid container spacing={2}>
            {/* Form Fields */}
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    required
                    error={!isNameValid(newPatient.name) && newPatient.name !== ''}
                    helperText={!isNameValid(newPatient.name) && newPatient.name !== '' ? 'Name cannot contain numbers or special characters.' : ''}
                    className="text-field"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Age"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    required
                    error={!isAgeValid(newPatient.age) && newPatient.age !== ''}
                    helperText={!isAgeValid(newPatient.age) && newPatient.age !== '' ? 'Age must be a positive number.' : ''}
                    className="text-field"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Gender"
                    variant="outlined"
                    fullWidth
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    required
                    error={!isGenderValid(newPatient.gender) && newPatient.gender !== ''}
                    helperText={!isGenderValid(newPatient.gender) && newPatient.gender !== '' ? 'Gender must be "male" or "female".' : ''}
                    className="text-field"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    value={newPatient.contactNumber}
                    onChange={(e) => setNewPatient({ ...newPatient, contactNumber: e.target.value })}
                    required
                    error={!isContactNumberValid(newPatient.contactNumber) && newPatient.contactNumber !== ''}
                    helperText={!isContactNumberValid(newPatient.contactNumber) && newPatient.contactNumber !== '' ? 'Contact number must be 10 digits.' : ''}
                    className="text-field"
                />
            </Grid>
        </Grid>
        {/* Button Container */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}> {/* Add margin-top for spacing */}
            <Grid item>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '20px' }}
                    className="add-button" 
                    disabled={!isFormValid()} // Disable button based on form validity
                >
                    Add Patient
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    style={{ marginTop: '20px' }}
                    onClick={handleOpenDialog} 
                >
                    Display All Patients
                </Button>
            </Grid>
        </Grid>
    </form>
</Grid>


                    <Grid item>
                        <Typography variant="h5" gutterBottom className="patient-list-title">
                            Search Patient
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
                                
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map(patient => (
                                        <Grid item xs={12} sm={6} md={4} key={patient.id}>
                                            <Card className="patient-card">
                                                <CardContent>
                                                    <Typography variant="h6">{patient.name}</Typography>
                                                    <Typography>Age: {patient.age}</Typography>
                                                    <Typography>Contact: {patient.contactNumber}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(patient)}>
                                            <EditIcon />
                                        </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deletePatient(patient.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography className="no-patients">No patients found.</Typography>

                                        </Grid>
                                )}
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                

                <Dialog open={openDialogdisplay} onClose={handleCloseDialog} fullWidth>
                    <DialogTitle>All Patients</DialogTitle>
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Contact Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {patients.map(patient => (
                                        <TableRow key={patient.id}>
                                            <TableCell>{patient.name}</TableCell>
                                            <TableCell>{patient.age}</TableCell>
                                            <TableCell>{patient.contactNumber}</TableCell>
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
                    <DialogTitle>Update Patient</DialogTitle>
                    <DialogContent>
                        <form onSubmit={updatePatient}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={newPatient.name}
                                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Age"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        value={newPatient.age}
                                        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Gender"
                                        variant="outlined"
                                        fullWidth
                                        value={newPatient.gender}
                                        onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Contact Number"
                                        variant="outlined"
                                        fullWidth
                                        value={newPatient.contactNumber}
                                        onChange={(e) => setNewPatient({ ...newPatient, contactNumber: e.target.value })}
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                        <Button type="submit" onClick={updatePatient} color="primary">Update</Button>
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

export default PatientList;
