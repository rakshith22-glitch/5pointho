import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { becomeMember, cancelMembership } from '../services/userService';
import { Typography, Box, Button, List, ListItem, Paper, Grid, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { UserContext } from '../contexts/UserContext';

const PageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    background: theme.palette.background.default,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    padding: theme.spacing(1.5),
    fontSize: '1rem',
    fontWeight: 'bold',
}));

const BecomeMemberPage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (user) {
            setIsMember(user.isMember);
        }
    }, [user]);

    const handleMembershipChange = async () => {
        try {
            if (isMember) {
                await cancelMembership();
                setUser((prevUser) => ({ ...prevUser, isMember: false }));
            } else {
                await becomeMember();
                setUser((prevUser) => ({ ...prevUser, isMember: true }));
            }
        } catch (error) {
            console.error('Membership update failed:', error);
            alert('Failed to update membership status. Please try again.');
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item>
                <PageContainer>
                    <Alert severity="info" sx={{ marginBottom: 2 }}>
                        Membership is free for a limited time!
                    </Alert>
                    <Typography variant="h4" gutterBottom>{isMember ? 'Membership Details' : 'Become a Member'}</Typography>
                    {!isMember && <Typography variant="body1">Membership Fee: $50/year</Typography>}
                    <Typography variant="h6" gutterBottom>Benefits include:</Typography>
                    <List>
                        <ListItem>Access to all Round Robin events</ListItem>
                        <ListItem>Exclusive Pickleball tips and tricks</ListItem>
                        <ListItem>Monthly member newsletters</ListItem>
                    </List>
                    <StyledButton variant="contained" color="primary" onClick={handleMembershipChange}>
                        {isMember ? 'Cancel Membership' : 'Become a Member'}
                    </StyledButton>
                </PageContainer>
            </Grid>
        </Grid>
    );
};

export default BecomeMemberPage;
