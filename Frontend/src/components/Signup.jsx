import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Card,
    CardContent,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/signup', { username, password });
            console.log(response.data);
            // Redirect to login after successful signup
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
        }
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
                        Signup
                    </Typography>
                    <form onSubmit={handleSignup}>
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
                            Signup
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Already have an account?{' '}
                        <Button color="primary" onClick={() => navigate('/login')}>
                            Login here
                        </Button>.
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Signup;
