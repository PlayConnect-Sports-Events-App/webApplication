import axios from 'axios';
import {
  Box,
  Flex,
  Avatar,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Spacer,
  Divider,
  useColorModeValue,
  useToast,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialog, useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Assuming useAuth is a custom hook for authentication context
import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  // Use color mode values for dynamic color theming
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');

  // User authentication and user info
  const [user, setUser] = useState(null);
  const [initialUser, setInitialUser] = useState(null);
  const { userEmail, authToken, logout } = useAuth();
  
  // Alert on events
  const toast = useToast();
  // Navigation
  const navigate = useNavigate();
  
  // Used for the popup dialog
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  
  // Function to update user profile
  const handleUpdate = async () => {
    const updateUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
    
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${user.id}`, updateUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
      setInitialUser(response.data);
      
      toast({
        title: 'Profile updated.',
        description: 'Great! Your profile has been updated successfully!',
        status: 'success',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: 'There was an error updating your profile. Please try again!',
        status: 'error',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setUser(initialUser);
  };
  
  // Function to delete user account
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      logout();
      toast({
        title: 'Account deleted.',
        description: 'Sad to see you go!',
        status: 'success',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
      setTimeout(() => {
        navigate(`/signup`);
      }, 2000);
    } catch (error) {
      console.error('Error fetching user info:', error);
      toast({
        title: 'Oops! Something went wrong.',
        description: 'There was an error deleting your profile. Please try again!',
        status: 'error',
        duration: 3000, // Duration in milliseconds; adjust as needed
        isClosable: true,
        position: 'top-right', // Position of the toast notification
      });
    }
  };

  // Fetch user object from backend
  useEffect(() => {
    if (userEmail && authToken) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/email/${userEmail}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUser(response.data);
          setInitialUser(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
          // Optionally, handle error state here
        }
      };
      fetchUserInfo();
    }
  }, [userEmail, authToken]);

  // Render loading state while fetching user info
  if (!user) {
    return <Text>Loading...</Text>; // Or some other loading state representation
  }

  return (
    <Flex
      direction='column'
      align='center'
      p={6}
      w='full'
      bg={bgColor} // Change the background color for the whole page to be more modern
    >
      <Box
        p={8}
        shadow='2xl'
        borderWidth='1px'
        borderRadius='2xl'
        bg={cardBgColor} // Use color mode value for dynamic color theming
        width='full'
        maxWidth='800px'
      >
        <Flex direction='row' align='center' mb={6}>
          <Avatar size='2xl' name={user.firstName} src='https://source.unsplash.com/random?user' />
          <Box ml={6} flex='1'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Text fontSize='3xl' fontWeight='bold' lineHeight='shorter' color={textColor}>
                {user.firstName} {user.lastName}
              </Text>
              <Button leftIcon={<EditIcon />} variant='ghost' colorScheme='teal' size='sm'>
                Edit Profile
              </Button>
            </Flex>
          </Box>
        </Flex>

        <Divider my={6} />

        <Box my={4}>
          <Text fontSize='xl' fontWeight='bold' mb={4}>Account Settings</Text>
          <Flex direction={['column', 'row']} gap={6}>
            <FormControl id='first-name'>
              <FormLabel>First Name</FormLabel>
              <Input variant='filled' value={user.firstName}
                     onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
            </FormControl>
            <FormControl id='last-name'>
              <FormLabel>Last Name</FormLabel>
              <Input variant='filled' value={user.lastName}
                     onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            </FormControl>
          </Flex>
          <FormControl id='email' mt={4}>
            <FormLabel>Email Address</FormLabel>
            <Input isDisabled variant='filled' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </FormControl>
          {/*<Flex direction={['column', 'row']} gap={6} mt={4}>
            <FormControl id='phone-number' isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input variant='filled' placeholder='(408) 996–1010' />
            </FormControl>
            <FormControl id='city'>
              <FormLabel>City</FormLabel>
              <Select variant='filled' placeholder='Select city'>
                <option>New York</option>
              </Select>
            </FormControl>
          </Flex> */}
          <Divider my={6} />
          <Flex justifyContent='space-between' mt={4} alignItems='center'>
            <Button
              rounded={'full'}
              size={'lg'}
              fontSize={'md'}
              bgGradient='linear(to-r, teal.300, green.400)'
              color='white'
              shadow='md'
              _hover={{
                bgGradient: 'linear(to-r, teal.400, green.500)',
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              _active={{
                bgGradient: 'linear(to-r, teal.500, green.600)',
                transform: 'translateY(0)',
              }}
              rightIcon={<ChevronRightIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              mr={4}
              size={'lg'}
              variant='outline'
              colorScheme='teal'
              fontSize={'md'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              colorScheme='red'
              fontSize={'md'}
              size={'lg'}
              rounded={'full'}
              shadow='md'
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              isDisabled={!user}
              onClick={onOpen}
            >
              Delete Account
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete your account? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme='red' onClick={() => {
                      handleDelete(); // This function should handle the event deletion
                      onClose(); // Then close the dialog
                    }}  ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProfilePage;