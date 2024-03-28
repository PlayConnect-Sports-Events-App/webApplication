import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem, Avatar,
} from '@chakra-ui/react'
import {IconClockHour3, IconMapPin, IconYoga, IconPin} from "@tabler/icons-react"
import UserEventComment from "../comment/UserEventComment";
import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../auth/AuthContext";

export default function EventDetailsPage() {
    
    // User authentication
    const { userEmail, authToken } = useAuth();
    
    // User info
    const [userInfo, setUserInfo] = useState(null);
    const [isUserParticipant, setIsUserParticipant] = useState(false);
    
    // Color for the free spots message
    const freeSpotsColor = useColorModeValue('red.400', 'red.400');
    
    // Get the event ID from the URL
    let {eventId} = useParams();
    
    // Event details
    const [event, setEvent] = useState(null);
    const [participantsCount, setParticipantsCount] = useState(0);
    
    // Function to format the event date
    const formatDate = (date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear().toString()}`;
    };

    // Function to format the event time
    const formatTime = (time) => {
        if (!time) return ''; // Return an empty string or some default value if time is undefined

        const [hour, minute] = time.split(':');
        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        const ampm = h >= 12 ? 'pm' : 'am';
        const formattedHour = ((h + 11) % 12 + 1); // Convert 24h to 12h format
        return `${formattedHour}:${m < 10 ? `0${m}` : m} ${ampm}`;
    };

    // Function to get the number of free spots
    const getFreeSpots = () => {
        return event?.maxParticipants - participantsCount;
    };

    // Fetch user info
    useEffect(() => {
        if (userEmail && authToken) { // Check both userEmail and authToken are available
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/user/email/${userEmail}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the authorization header
                        }
                    });
                    setUserInfo(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    // Optionally, handle error state here
                }
            };

            fetchUserInfo();
        }
    }, [userEmail, authToken]);

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/event/${eventId}`);
                setEvent(response.data);
                console.log(response.data);
                // Set the number of participants
                setParticipantsCount(response.data.participants.length);
                // Check if the user is a participant, and set the state accordingly
                const isParticipant = response.data.participants.some(participant => participant.userId === userInfo?.id);
                setIsUserParticipant(isParticipant);
                console.log(isParticipant);
            } catch (error) {
                console.error("Error fetching event details:", error);
                // Handle error
            }
        };
        
        fetchEventDetails();
    }, [eventId, userInfo]); // Dependency array to re-fetch if eventId changes
    
    // Join event
    const handleJoinEvent = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/event/join`, 
                {
                    userId: userInfo?.id,
                    eventId: eventId
                }
            , {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response.data);
            // Update the number of participants and the state
            setParticipantsCount(participantsCount + 1);
            setIsUserParticipant(true);
            // Redirect to the home page
            window.location.href = `/`;
        } catch (error) {
            console.error("Error joining event:", error);
            // Handle error
        }
    };
    
    // Leave event
    const handleLeaveEvent = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/event/leave`,
                {
                    userId: userInfo?.id,
                    eventId: eventId
                }
                , {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            console.log(response.data);
            // Update the number of participants and the state
            setParticipantsCount(participantsCount - 1);
            setIsUserParticipant(false);
            // Redirect to the home page
            window.location.href = `/`;
        } catch (error) {
            console.error("Error joining event:", error);
            // Handle error
        }
    };

    return (
        <Container maxW={'7xl'}>
            <SimpleGrid
                columns={{base: 1, lg: 2}}
                spacing={{base: 8, md: 10}}
                py={{base: 18, md: 24}}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={
                            'https://source.unsplash.com/random?football'
                        }
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{base: '100%', sm: '400px', lg: '500px'}}
                    />
                </Flex>
                <Stack spacing={{base: 6, md: 10}}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{base: '2xl', sm: '4xl', lg: '5xl'}}>
                            {event?.title}
                        </Heading>
                    </Box>
                    <Stack
                        spacing={{base: 4, sm: 6}}
                        direction={'column'}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')}/>
                        }>
                        <VStack spacing={{base: 4, sm: 6}}>
                            <Text
                                color={useColorModeValue('gray.500', 'gray.400')}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                {event?.description}
                            </Text>
                        </VStack>
                        <Box>
                            <Text
                                fontSize={{base: '16px', lg: '18px'}}
                                color={useColorModeValue('green.500', 'green.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Details
                            </Text>
                            <List spacing={2}>
                                <ListItem display="flex" alignItems="center">
                                    <IconClockHour3 boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Event Time & Date:
                                    </Text>{' '}
                                    {formatDate(event?.eventDate)} at {formatTime(event?.eventTime)}
                                </ListItem>
                                <ListItem display="flex" alignItems="center">
                                    <IconMapPin boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Location:
                                    </Text>{' '}
                                    {event?.location}
                                </ListItem>
                                <ListItem display="flex" alignItems="center">
                                    <IconYoga boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Sport Type:
                                    </Text>{' '}
                                    {event?.sportType}
                                </ListItem>
                                <ListItem display="flex" alignItems="center">
                                    <IconPin boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Available spots:
                                    </Text>{' '}
                                    {getFreeSpots()}/{event?.maxParticipants}
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{base: '16px', lg: '18px'}}
                                color={useColorModeValue('green.500', 'green.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Participants
                            </Text>
                            <List display="flex" flexDirection="row" gap="4">
                                <ListItem>
                                    <Box textAlign="center">
                                        <Avatar name="Dan Abrahmov" src="https://source.unsplash.com/random?dan" />
                                        <Text mt="1">Dan</Text>
                                    </Box>
                                </ListItem>
                                <ListItem>
                                    <Box textAlign="center">
                                        <Avatar name="Peter Johnson" src="https://source.unsplash.com/random?peter" />
                                        <Text mt="1">Peter</Text>
                                    </Box>
                                </ListItem>
                                <ListItem>
                                    <Box textAlign="center">
                                        <Avatar name="John Doe" src="https://source.unsplash.com/random?john" />
                                        <Text mt="1">John</Text>
                                    </Box>
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                            <Text
                                fontSize={{base: '16px', lg: '18px'}}
                                color={useColorModeValue('green.500', 'green.300')}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Comments
                            </Text>
                            <List spacing={2}>
                                <ListItem>
                                    <UserEventComment avatarUrl={'https://source.unsplash.com/random?user'}
                                                      firstName={'John'} commentText={'I`ll bring the ball!'}/>
                                    <UserEventComment avatarUrl={'https://source.unsplash.com/random?user'}
                                                      firstName={'John'} commentText={'I`ll bring the ball!'}/>
                                    <UserEventComment avatarUrl={'https://source.unsplash.com/random?user'}
                                                      firstName={'John'} commentText={'I`ll bring the ball!'}/>
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>
                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={isUserParticipant ? 'red.600' : 'green.600'}
                        color={'white'}
                        borderRadius={20}
                        textTransform={'uppercase'}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}
                        onClick={isUserParticipant ? handleLeaveEvent : handleJoinEvent}
                    >
                        {isUserParticipant ? 'Leave Event' : 'Join Event'}
                    </Button>

                    <Stack direction="row" alignItems="center" justifyContent={'center'}>
                        {getFreeSpots() < 10 ?
                            <Text color={freeSpotsColor}>Only {getFreeSpots()} places remaining!</Text>
                            :
                            <p></p>
                        }
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}