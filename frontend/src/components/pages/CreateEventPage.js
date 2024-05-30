import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea, SimpleGrid, chakra, InputLeftAddon, AlertIcon, Alert, useColorModeValue, Select,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {CalendarIcon, Search2Icon} from '@chakra-ui/icons';
import React from 'react';
import axios from 'axios';
import {useAuth} from '../auth/AuthContext';
import {useToast} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

export default function CreateEventPage() {
    const [startDate, setStartDate] = useState(new Date());
    // Date and time state
    const [dateString, setDateString] = useState('');
    const [timeString, setTimeString] = useState('');

    // The modal is shown in the top right to confirm action
    const toast = useToast();
    // Navigation
    const navigate = useNavigate();

    // Event form state
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [sportType, setSportType] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');

    // User authentication
    const {userEmail, authToken} = useAuth();
    // User state
    const [user, setUser] = useState('');

    const handleDateChange = (date) => {
        setStartDate(date);

        // Extracting the date string
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is zero-based
        const day = date.getDate();
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log(dateStr);
        setDateString(dateStr);

        // Extracting the time string
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        console.log(timeStr);
        setTimeString(timeStr);
    };

    // Used in the select dropdown for sport type
    const handleSportChange = (event) => {
        setSportType(event.target.value);
    };

    // Fetch user object from the backend
    useEffect(() => {
        if (userEmail && authToken) { // Check both userEmail and authToken are available
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/user/email/${userEmail}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`, // Include the authorization header
                        },
                    });
                    setUser(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    // Optionally, handle error state here
                }
            };

            fetchUserInfo();
        }
    }, [userEmail, authToken]);

    // Function to create an event
    const createEvent = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const eventData = {
            hostUserId: user.id,
            title,
            description,
            sportType,
            eventDate: dateString,
            eventTime: timeString,
            location,
            maxParticipants: maxParticipants,
        };

        try {
            const response = await axios.post('https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event', eventData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            console.log(eventData);
            // Show success toast
            toast({
                title: 'Event created.',
                description: 'Amazing! Your event has been created!',
                status: 'success',
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: 'top-right', // Position of the toast notification
            });
            setTimeout(() => {
                navigate(`/event/${response.data}`);
            }, 2000);
        } catch (error) {
            console.error('There was an error creating the event: ', error);
            toast({
                title: 'Oops! Something went wrong.',
                description: `There was an error creating the event. Please try again!`,
                status: 'error',
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: 'top-right', // Position of the toast notification
            });
        }
    };

    return (
        <Container maxW='full' mt={0} centerContent overflow='hidden'>
            <Flex>
                <Box
                    bg='green.400'
                    color='white'
                    borderRadius='lg'
                    m={{sm: 2, md: 8, lg: 5}}
                    p={{sm: 8, md: 10, lg: 20}}>
                    <Box p={4}>
                        <Wrap spacing={{base: 20, sm: 3, md: 5, lg: 20}}>
                            <WrapItem>
                                <Box>
                                    <Heading>Create Event</Heading>
                                    <Text mt={{sm: 3, md: 3, lg: 5}} color='gray.500'>
                                        Fill up the form below to contact
                                    </Text>
                                </Box>
                            </WrapItem>
                            <WrapItem>
                                <Box bg={useColorModeValue('white', 'gray.700')} borderRadius='lg'
                                     p={{sm: 8, md: 10, lg: 12}} // Increased padding for more internal space
                                >
                                    <Box m={8} color={useColorModeValue('#0B0E3F', 'white')}>
                                        <form onSubmit={createEvent}>
                                            <SimpleGrid columns={{base: 1, sm: 2}} spacing={5}>
                                                <FormControl id='name'>
                                                    <FormLabel>Title</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <Input type='text' variant='filled' placeholder='Enter title'
                                                               value={title}
                                                               onChange={(e) => setTitle(e.target.value)}/>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl flex='1' id='name'>
                                                    <FormLabel htmlFor='location'>Location</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <InputLeftElement pointerEvents='none'>
                                                            <Search2Icon color='gray.300'/>
                                                        </InputLeftElement>
                                                        <Input type='text' variant='filled' placeholder='Enter location'
                                                               value={location}
                                                               onChange={(e) => setLocation(e.target.value)}/>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl flex='1' id='name'>
                                                    <FormLabel>Sport Type</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <Select
                                                            variant='filled'
                                                            placeholder='Select sport'
                                                            value={sportType}
                                                            onChange={handleSportChange}
                                                        >
                                                            <option value='football'>Football</option>
                                                            <option value='tennis'>Tennis</option>
                                                            <option value='basketball'>Basketball</option>
                                                        </Select>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl flex='1' id='name'>
                                                    <FormLabel>Nr. of spots</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <Input type='number' variant='filled'
                                                               placeholder='Enter free spots' value={maxParticipants}
                                                               onChange={(e) => setMaxParticipants(e.target.value)}/>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl flex='1' id='name'>
                                                    <FormLabel htmlFor='date'>Date</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <Input type='date' id='date' variant='filled'
                                                               placeholder='Enter date' value={dateString}
                                                               onChange={(e) => setDateString(e.target.value)}/>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl flex='1' id='name'>
                                                    <FormLabel htmlFor='time'>Time</FormLabel>
                                                    <InputGroup size='lg' borderColor='#E0E1E7'>
                                                        <Input type='time' id='time' variant='filled'
                                                               placeholder='Enter time' value={timeString}
                                                               onChange={(e) => setTimeString(e.target.value)}/>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id='description'
                                                             gridColumn={{base: '1 / -1', sm: 'span 2/span 2'}}>
                                                    <FormLabel>Description</FormLabel>
                                                    <Textarea borderColor='gray.300' _hover={{borderRadius: 'gray.300'}}
                                                              variant='filled' placeholder='Enter description' size='lg'
                                                              value={description}
                                                              onChange={(e) => setDescription(e.target.value)}/>
                                                </FormControl>
                                            </SimpleGrid>
                                            <Button
                                                mt={8}
                                                type='submit'
                                                w='full'
                                                variant='solid'
                                                bgGradient="linear(to-r, teal.300, green.400)"
                                                color="white"
                                                _hover={{
                                                    bgGradient: "linear(to-r, teal.400, green.500)",
                                                }}
                                                _focus={{
                                                    outline: "none",
                                                    bgGradient: "linear(to-r, teal.400, green.500)",
                                                }}>
                                                Create Event
                                            </Button>
                                        </form>
                                    </Box>
                                </Box>
                            </WrapItem>
                        </Wrap>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}