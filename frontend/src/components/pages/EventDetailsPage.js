﻿import {
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
  Badge, Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import ParticipantList from '../participants/ParticipantsList';
import CommentList from '../comment/CommentList';
import EventDetails from '../event/EventDetails';
import { useToast } from '@chakra-ui/react';
import useUserInfo from '../hooks/UserInfoHook';
import UnsplashImage from "../images/UnsplashImage";

export default function EventDetailsPage() {
  const [imageUrl, setImageUrl] = useState('');
  
  // User authentication
  const { userEmail, authToken } = useAuth();
  
  //Alert on events
  const toast = useToast();

  // User info
  //const [userInfo, setUserInfo] = useState(null);
  const [isUserParticipant, setIsUserParticipant] = useState(false);

  // using the useUserInfo custom hook
  const { userInfo, loading, error } = useUserInfo(userEmail, authToken);
  
  // Color for the free spots message
  const freeSpotsColor = useColorModeValue('red.400', 'red.400');

  // Get the event ID from the URL
  let { eventId } = useParams();

  // Event details
  const [event, setEvent] = useState(null);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [comments, setComments] = useState([]);
  
  //Participant List - hardcoded for now
  const hardcodedParticipants = [
    { avatarUrl: 'https://picsum.photos/seed/john/100', firstName: 'John', lastName: 'Doe' },
    { avatarUrl: 'https://picsum.photos/seed/jane/100', firstName: 'Jane', lastName: 'Smith' },
    { avatarUrl: 'https://picsum.photos/seed/dan/100', firstName: 'Dan', lastName: 'Abramov' }
    // Add more participants as needed
  ];
  
  // Function to get the number of free spots
  const getFreeSpots = () => {
    return event?.maxParticipants - participantsCount;
  };

  // Scroll to the top of the page on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch user object from backend

  // Fetch event object from backend
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/${eventId}`);
        setEvent(response.data);
        console.log(response.data);
        // Set the number of participants
        setParticipantsCount(response.data.participants.length);
        // Check if the user is a participant, and set the state accordingly
        const isParticipant = response.data.participants.some(participant => participant.userId === userInfo?.id);
        setIsUserParticipant(isParticipant);
        console.log(isParticipant);
      } catch (error) {
        console.error('Error fetching event details:', error);
        // Handle error
      }
    };
    fetchEventDetails();
    fetchEventComments();
  }, [eventId, userInfo]); // Dependency array to re-fetch if eventId changes
  
  // Fetch comments for the event
  const fetchEventComments = async () => {
    try {
      const response = await axios.get(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/comment/${eventId}`);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching event comments:', error);
    }
  }
  
  // Function to join event
  const handleJoinEvent = async () => {
    try {
      const response = await axios.post(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/join`,
        {
          userId: userInfo?.id,
          eventId: eventId,
        }
        , {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      console.log(response.data);
      // Update the number of participants and the state
      setParticipantsCount(participantsCount + 1);
      setIsUserParticipant(true);
      // Show success toast
      toast({
        title: 'Success.',
        description: `You're now part of this event.`,
        status: 'success',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
    } catch (error) {
      console.error('Error joining event:', error);
      // Handle error
    }
  };

  // Function to leave event
  const handleLeaveEvent = async () => {
    try {
      const response = await axios.post(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/event/leave`,
        {
          userId: userInfo?.id,
          eventId: eventId,
        }
        , {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      console.log(response.data);
      // Update the number of participants and the state
      setParticipantsCount(participantsCount - 1);
      setIsUserParticipant(false);
      // Show success toast
      toast({
        title: 'Success.',
        description: `You have left the event.`,
        status: 'success',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
    } catch (error) {
      console.error('Error joining event:', error);
      // Handle error
    }
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          {event ? (
              <>
                <UnsplashImage query={event.sportType} onLoad={setImageUrl} />
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt="Event Image"
                        objectFit="cover"
                        align="center"
                        width="100%"
                        height={{ base: '100%', sm: '400px', lg: '500px' }}
                        borderRadius="md"
                    />
                )}
              </>
          ) : (
              <Spinner size="xl" />
          )}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {event?.title}
            </Heading>
            {isUserParticipant ?
              <Badge variant='subtle' colorScheme='green' px={2} py={1} borderRadius={5} mt={2}>
                Joined
              </Badge>
              :
              <p></p>
            }
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {event?.description}
              </Text>
            </VStack>
            <Box>
              {event && <EventDetails event={event} participantsCount={participantsCount} />}
            </Box>
            <Box>
              <ParticipantList participants={hardcodedParticipants} />
            </Box>
            <Box>
              <CommentList comments={comments} user={userInfo} eventId={eventId} />
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
            onClick={
              userInfo ?
                  (isUserParticipant ? handleLeaveEvent : handleJoinEvent) :
                  () => window.location.href = '/signup'
            }
          >
            {isUserParticipant ? 'Leave Event' : 'Join Event'}
          </Button>

          <Stack direction='row' alignItems='center' justifyContent={'center'}>
            {getFreeSpots() < 10 ?
              <Text color={freeSpotsColor}>Only {getFreeSpots()} places remaining!</Text>
              :
              <p></p>
            }
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}