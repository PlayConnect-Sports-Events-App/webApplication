import React, {useState} from "react";
import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue, InputGroup, InputRightElement, Link,
} from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useAuth} from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';


export default function SignInPage() {
    
    // Credentials
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Show or hide password
    const [showPassword, setShowPassword] = useState(false);
    
    // Use the login function from AuthContext
    const {login} = useAuth();
    
    // Navigate when the user logs in
    const navigate = useNavigate();

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        try {
            const response = await axios.post('http://localhost:8080/api/user/auth/authenticate', 
                {email, password});
            const {token} = response.data; // Assuming the response contains the JWT token directly
            login(token); // Update auth state with the received token
            navigate('/'); // Redirect to homepage
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            // Handle login error (e.g., show an error message)
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'} marginBottom={6}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={handleLogin}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    marginTop={4}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Don't have an account? <Link href={'/signup'} color={'green.400'}>Sign up</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}