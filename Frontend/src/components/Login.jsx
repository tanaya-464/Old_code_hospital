import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State for error dialog

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            console.log(response.data);
            login();
            navigate('/admindashboard'); // Redirect to Admin Dashboard
        } catch (error) {
            console.error('Login error:', error);
            setErrorDialogOpen(true); // Open error dialog on failure
        }
    };

    const handleCloseDialog = () => {
        setErrorDialogOpen(false);
    };

    const handleRegisterRedirect = () => {
        setErrorDialogOpen(false);
        navigate('/signup'); // Redirect to Signup page
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
            }}
        >
            <Card variant="outlined" style={{ width: '100%', padding: '20px' }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        If account is not created, please{' '}
                        <Button color="primary" onClick={() => navigate('/signup')}>
                            click here to register
                        </Button>.
                    </Typography>
                </CardContent>
            </Card>

            {/* Error Dialog */}
            <Dialog open={errorDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Login Failed</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Account not found. Would you like to register?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleRegisterRedirect} color="primary">Register</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Login;
