// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            // Redirect or update UI as needed
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">Login</Button>
                {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
            </form>
        </Container>
    );
}

export default Login;
