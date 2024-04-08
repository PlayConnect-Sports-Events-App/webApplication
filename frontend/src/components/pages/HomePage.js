import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import EventCard from '../event/EventCard';
import SearchComponent from '../search/SearchComponent';
import { useAuth } from '../auth/AuthContext';
import MyEventCard from '../event/MyEventCard';
import useUserInfo from "../hooks/UserInfoHook";

const HomePage = () => {
  // User authentication and user info
  const { userEmail, authToken } = useAuth();

  // using the useUserInfo custom hook to get user info
  const { userInfo, loading, error } = useUserInfo(userEmail, authToken);
  
  // Search events
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState({
    sportType: '',
    location: '',
    date: '',
    // 'time' parameter omitted for compatibility with backend
  });
  
  // Fetch all events initially and on reset
  const fetchAllEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/search');
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching all events:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);
  
  // Fetch events based on search parameters, or all events if search parameters are empty
  useEffect(() => {
    const isSearchParamsEmpty = Object.values(searchParams).every(param => param === '');

    if (isSearchParamsEmpty) {
      fetchAllEvents(); // Call this function when search params are reset to fetch all events again
    } else {
      if (Object.values(searchParams).some(param => param !== '')) {
        const fetchEvents = async () => {
          try {
            // Determine the correct endpoint and parameters based on the provided searchParams
            let url = 'http://localhost:8080/api/search';
            if (searchParams.location) {
              url += `/location?location=${encodeURIComponent(searchParams.location)}`;
            } else if (searchParams.sportType) {
              url += `/sportType?sportType=${encodeURIComponent(searchParams.sportType)}`;
            } else if (searchParams.date) {
              url += `/date?eventDate=${encodeURIComponent(searchParams.date)}`;
            } else if (searchParams.startDate && searchParams.endDate) { // Assuming you add startDate and endDate to searchParams for date range searches
              url += `/dateRange?startDate=${encodeURIComponent(searchParams.startDate)}&endDate=${encodeURIComponent(searchParams.endDate)}`;
            }

            const response = await axios.get(url);
            setEvents(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching events based on search:', error);
          }
        };
        fetchEvents();
      }
      // Your existing search logic here
    }
  }, [searchParams, fetchAllEvents]); // Ensure fetchAllEvents is included in the dependency array if it's a useCallback
  
  // Reset search parameters and fetch all events
  const resetSearch = () => {
    setSearchParams({
      sportType: '',
      location: '',
      date: '',
    });
    fetchAllEvents();
  };

  return (
    <div>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight='bold'
          fontSize={{ base: '2xl', sm: '4xl', md: '7xl' }}
          lineHeight={'110%'}>
          Discover the best events <br />
          <Text as={'span'} color={'green.400'}>
            just for your liking!
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Find events that match your interests and preferences. Join in and have fun!
        </Text>
      </Stack>
      <Container maxW='container.xl' centerContent>
        <Box p={5} borderBottom='2px solid' borderColor='gray.200' flex='2'>
          <SearchComponent onSearch={setSearchParams} />
        </Box>
      </Container>
      <Box marginX={10}>
        <Grid templateColumns='repeat(3, 1fr)' gap={2} margin={10} w='full'>
          {events.map(event => (
            userInfo && event.hostUserId === userInfo.id ?
              <MyEventCard key={event.eventId} {...event} /> :
              <EventCard key={event.eventId} {...event} />
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default HomePage;