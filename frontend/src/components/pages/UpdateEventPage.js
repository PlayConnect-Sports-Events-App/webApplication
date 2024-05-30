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
    ListItem,
    Avatar,
    Badge,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    HStack,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
} from '@chakra-ui/react';
import {IconClockHour3, IconMapPin, IconYoga, IconPin} from '@tabler/icons-react';
import UserEventComment from '../comment/UserEventComment';
import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../auth/AuthContext';
import useUserInfo from "../hooks/UserInfoHook";

export default function UpdateEventPage() {
    const [startDate, setStartDate] = useState(new Date());

    // Date and time strings
    const [dateString, setDateString] = useState('');
    const [timeString, setTimeString] = useState('');

    // Alert on events
    const toast = useToast();

    // Used for the popup dialog
    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef()
    // Navigation
    const navigate = useNavigate();

    // Event details
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [sportType, setSportType] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [description, setDescription] = useState('');

    // Initial event object
    const [event, setEvent] = useState('');

    // User authentication
    const {userEmail, authToken} = useAuth();
    // using the useUserInfo custom hook to get user
    const {userInfo, loading, error} = useUserInfo(userEmail, authToken);

    // Get the event ID from the URL
    let {eventId} = useParams();

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

    // Fetch event object from backend
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/${eventId}`);
                const eventData = response.data;
                setEvent(eventData); // Assuming you still want to keep the whole event object for any reason
                setTitle(eventData.title);
                setLocation(eventData.location);
                setSportType(eventData.sportType);
                setMaxParticipants(eventData.maxParticipants);
                setDescription(eventData.description);
                setDateString(eventData.eventDate); // Assuming eventData has eventDate
                setTimeString(eventData.eventTime); // Assuming eventData has eventTime
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
                // Handle error
            }
        };
        fetchEventDetails();
    }, [eventId]); // Dependency array to re-fetch if eventId changes

    // Function to update event
    const updateEvent = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const eventData = {
            hostUserId: userInfo.id,
            title,
            description,
            sportType,
            eventDate: dateString,
            eventTime: timeString,
            location,
            maxParticipants: maxParticipants,
        };
        console.log(eventData);

        try {
            const response = await axios.put(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/${eventId}`, eventData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            toast({
                title: "Event updated.",
                description: "Great! Your event has been updated successfully!",
                status: "success",
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: "top-right", // Position of the toast notification
            });
            setTimeout(() => {
                navigate(`/created`);
            }, 2000);
        } catch (error) {
            console.error('There was an error updating the event: ', error);
            toast({
                title: "Oops! Something went wrong.",
                description: "There was an error updating the event. Please try again!",
                status: "error",
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: "top-right", // Position of the toast notification
            });
        }
    };

    // Function to delete event
    const deleteEvent = async () => {
        try {
            const response = await axios.delete(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data);
            toast({
                title: "Event deleted.",
                description: "Great! Your event has been deleted successfully!",
                status: "success",
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: "top-right", // Position of the toast notification
            });
            setTimeout(() => {
                navigate(`/created`);
            }, 2000);
        } catch (error) {
            console.error('There was an error deleting the event: ', error);
            toast({
                title: "Oops! Something went wrong.",
                description: "There was an error deleting the event. Please try again!",
                status: "error",
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: "top-right", // Position of the toast notification
            });
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
                            `https://source.unsplash.com/random?${event?.sportType}`
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
                            <FormControl id='name'>
                                <InputGroup borderColor='#E0E1E7'>
                                    <Input
                                        lineHeight={1.1}
                                        fontWeight={600}
                                        fontSize={{base: '2xl', sm: '4xl', lg: '5xl'}}
                                        variant='unstyled'
                                        type='text'
                                        value={title} onChange={(e) => setTitle(e.target.value)}/>
                                </InputGroup>
                            </FormControl>
                        </Heading>
                    </Box>
                    <Stack
                        spacing={{base: 4, sm: 6}}
                        direction={'column'}
                        divider={
                            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')}/>
                        }>
                        <VStack spacing={{base: 4, sm: 6}}>
                            <FormControl>
                                <Input
                                    color={useColorModeValue('gray.500', 'gray.400')}
                                    fontSize={'2xl'}
                                    fontWeight={'300'}
                                    variant='unstyled'
                                    type='text'
                                    value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </FormControl>
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
                            <List spacing={6}>
                                <ListItem display='flex' alignItems='center'>
                                    <IconClockHour3 boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Event Time & Date:
                                    </Text>{' '}
                                    <FormControl>
                                        <Stack direction='column' spacing={2}>
                                            <Input variant='unstyled' type='date' id='date' width='130px'
                                                   value={dateString}
                                                   onChange={(e) => setDateString(e.target.value)}/>
                                            <Input variant='unstyled' type='time' id='time' width='130px'
                                                   value={timeString}
                                                   onChange={(e) => setTimeString(e.target.value)}/>
                                        </Stack>
                                    </FormControl>
                                </ListItem>
                                <ListItem display='flex' alignItems='center'>
                                    <IconMapPin boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Location:
                                    </Text>{' '}
                                    <FormControl>
                                        <Input
                                            variant='unstyled'
                                            type='text'
                                            value={location} onChange={(e) => setLocation(e.target.value)}/>
                                    </FormControl>
                                </ListItem>
                                <ListItem display='flex' alignItems='center'>
                                    <IconYoga boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Sport Type:
                                    </Text>{' '}
                                    <FormControl>
                                        <Input
                                            variant='unstyled'
                                            type='text'
                                            value={sportType} onChange={(e) => setSportType(e.target.value)}/>
                                    </FormControl>
                                </ListItem>
                                <ListItem display='flex' alignItems='center'>
                                    <IconPin boxSize={6}/>
                                    <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
                                        Available spots:
                                    </Text>{' '}
                                    <FormControl>
                                        <Input
                                            variant='unstyled'
                                            type='number'
                                            value={event?.maxParticipants}/>
                                    </FormControl>
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>
                    <HStack spacing={4} mt={8}> {/* Adjust the `spacing` value as needed for your design */}
                        <Button
                            flex={1} // Makes the button expand to fill the container
                            rounded={'none'}
                            size={'lg'}
                            py={'7'}
                            bg={'green.600'}
                            color={'white'}
                            borderRadius={20}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={updateEvent}
                        >
                            Save
                        </Button>
                        <Button
                            flex={1} // Makes the button expand to fill the container
                            rounded={'none'}
                            size={'lg'}
                            py={'7'}
                            bg={'red.600'}
                            color={'white'}
                            borderRadius={20}
                            textTransform={'uppercase'}
                            _hover={{
                                transform: 'translateY(2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={onOpen}
                        >
                            Delete Event
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete Event
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure you want to delete this event? You can't undo this action
                                        afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={() => {
                                            deleteEvent(); // This function should handle the event deletion
                                            onClose(); // Then close the dialog
                                        }} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </HStack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}