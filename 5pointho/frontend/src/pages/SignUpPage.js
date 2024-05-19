// frontend/src/pages/SignUpPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { register } from '../services/userService';
import { UserContext } from '../contexts/UserContext';

const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '500px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2]
}));

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(name, email, password);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <FormContainer>
            <Typography variant="h5" align="center" mb={2}>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                >
                    Sign Up
                </Button>
            </form>
        </FormContainer>
    );
};

export default SignUpPage;
