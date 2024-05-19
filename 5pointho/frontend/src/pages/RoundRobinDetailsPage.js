import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Container, Grid, TextField, Link } from '@mui/material';
import { getRoundRobin } from '../services/roundRobinService';
import { getUserProfile } from '../services/userService';

const RoundRobinDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roundRobin, setRoundRobin] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getUserProfile();
                const roundRobinDetails = await getRoundRobin(id);
               

                // Format the date to YYYY-MM-DD
                roundRobinDetails.date = new Date(roundRobinDetails.date).toISOString().split('T')[0];

                setRoundRobin(roundRobinDetails);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);


    if (!roundRobin) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center">{roundRobin.title}</Typography>
                    <Typography variant="body1" align="center">Date: {roundRobin.date}</Typography>
                    <Typography variant="body1" align="center">Description: {roundRobin.description}</Typography>
                    {roundRobin.link && (
                        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                            Click on the link to join the round robin: 
                            <Link href={roundRobin.link} target="_blank" rel="noopener" sx={{ ml: 1 }}>
                                {roundRobin.link}
                            </Link>
                        </Typography>
                    )}
                    <Grid container justifyContent="center">
                        <Grid item xs={4}>
                            <TextField
                                type="date"
                                label="Date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                name="date"
                                value={roundRobin.date}
                                onChange={(e) => setRoundRobin({ ...roundRobin, date: e.target.value })}
                            />
                        </Grid>
                       
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RoundRobinDetailsPage;
