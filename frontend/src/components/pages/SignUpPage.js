import React from "react";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from "axios";
import {useAuth} from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    // Show or hide password
    const [showPassword, setShowPassword] = useState(false);

    // Form errors
    const [errors, setErrors] = useState({});
    
    // Credentials
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Use the login function from AuthContext
    const {login} = useAuth(); // Use the login function from AuthContext
    // Navigation
    const navigate = useNavigate();

    // Function to handle input changes
    const handleInputChange = (e, setter) => setter(e.target.value);

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior

        // Form data to be sent
        const userData = { firstName, lastName, email, password };

        try {
            // Using Axios to send a POST request to your registration endpoint
            const response = await axios.post('http://localhost:8080/api/user/auth/register', userData);
            const {token} = response.data; // Assuming the response contains the JWT token directly
            login(token); // Update auth state with the received token
            navigate('/'); // Redirect to homepage
            setErrors({}); // Clear previous errors if registration is successful
        } catch (error) {
            // Handle error (e.g., display an error message)
            console.error('Registration error:', error.response.data);
            // Populate the errors state with the errors from the server
            setErrors(error.response.data || {});
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <form onSubmit={handleRegister}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" value={firstName} onChange={(e) => handleInputChange(e, setFirstName)} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" value={lastName} onChange={(e) => handleInputChange(e, setLastName)} />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                type="submit"
                                loadingText="Submitting"
                                size="lg"
                                bg={'green.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link href={'/signin'} color={'green.400'}>Sign in</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
                </form>
            </Stack>
        </Flex>
    )
}