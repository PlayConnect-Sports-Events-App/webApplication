import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    useColorModeValue, List, ListItem, ListIcon, Button,
} from '@chakra-ui/react'

import {IconClockHour3, IconMapPin, IconYoga} from "@tabler/icons-react"
import { useNavigate } from 'react-router-dom';


export default function EventCard({ id, eventId, title, description, eventDate, eventTime, location, sportType }) {
    const navigate = useNavigate();

    // Function to navigate to the event details page and pass the event id as a parameter
    const navigateToDetails = () => {
        navigate(`/event/${eventId}`);
    };
    
    // Function to format the event date
    const formatDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} `;
    };

    // Function to format the event time
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        const ampm = h >= 12 ? 'pm' : 'am';
        const formattedHour = ((h + 11) % 12 + 1); // Convert 24h to 12h format
        return `${formattedHour}:${m < 10 ? `0${m}` : m} ${ampm}`;
    };
    
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                borderRadius={'xl'}
                p={6}
                overflow={'hidden'}>
                <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
                    <Image
                        src={`https://source.unsplash.com/random?${sportType}`}
                        alt="Example"
                        objectFit="cover" // This will ensure the image covers the area, but is cropped to maintain aspect ratio
                        objectPosition="center center" // Adjust as needed to focus on a certain part of the image
                        w="full" // Ensure the image width fills the container
                        h="100%" // Ensure the image height fills the container
                    />
                </Box>
                <Stack>
                    <Heading
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        {title}
                    </Heading>
                </Stack>
                <Box>
                    <List spacing={2} marginTop={4}>
                        <ListItem>
                            <ListIcon as={IconClockHour3} boxSize={6} color="green.500" />
                            {formatDate(eventDate)} at {formatTime(eventTime)}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={IconMapPin} boxSize={6} color="green.500" />
                            {location}
                        </ListItem>
                        <ListItem>
                            <ListIcon as={IconYoga} boxSize={6} color="green.500" />
                            {sportType}
                        </ListItem>
                    </List>
                </Box>
                <Stack mt={4} direction={'row'} spacing={4}>
                    <Button
                      mt={4}
                      w={'full'}
                      rounded={'xl'}
                      bgGradient="linear(to-r, teal.300, green.400)"
                      color="white"
                      _hover={{
                          bgGradient: "linear(to-r, teal.400, green.500)",
                      }}
                      _focus={{
                          outline: "none",
                          bgGradient: "linear(to-r, teal.400, green.500)",
                      }}
                      onClick={navigateToDetails}
                    >
                        See Details
                    </Button>
                </Stack>
            </Box>
        </Center>
    )
}