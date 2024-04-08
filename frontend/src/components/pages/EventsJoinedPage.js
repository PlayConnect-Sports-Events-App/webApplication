import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import EventCard from '../event/EventCard';
import { useAuth } from '../auth/AuthContext';
import useUserInfo from "../hooks/UserInfoHook";

const EventsJoinedPage = () => {
  // List of events joined by the user
  const [events, setEvents] = useState([]);
  
  // User info
  const { userEmail, authToken } = useAuth();
  const { userInfo, loading, error } = useUserInfo(userEmail, authToken);
  
  // Fetch events joined by the user
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/event/user/${userInfo.id}`);
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error appropriately in your UI
      }
    };

    fetchEvents();
  }, [userInfo]); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <Box p={{ base: '4', md: '6' }} pt={{ base: '6', md: '8' }} pl={{ base: '4', md: '28' }}>
        <Heading fontWeight='bold' fontSize={{ base: 'xl', sm: '2xl', md: '6xl' }} lineHeight={'110%'}>Events Joined</Heading>
        <Text color={'gray.500'} mt='2'>
          Here are all the events you have joined. You can view the details of each event and see who else is
          participating.
        </Text>
      </Box>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} margin={10}>
        {events.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </Grid>
    </div>
  );
};

export default EventsJoinedPage;