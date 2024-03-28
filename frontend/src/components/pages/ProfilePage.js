import React, { useState } from 'react';
import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Tag,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Spacer,
} from '@chakra-ui/react';

// Initial user data
const initialUserData = {
    name: 'Jane Doe',
    bio: 'Frontend Developer | React & Chakra UI Enthusiast',
    avatarUrl: 'https://bit.ly/dan-abramov',
    hobbies: ['Coding', 'Hiking', 'Traveling', 'Photography'],
    bannerUrl: 'https://source.unsplash.com/random?nature'
};

const ProfilePage = () => {
    const [userData, setUserData] = useState(initialUserData);
    const [editMode, setEditMode] = useState(false);
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const color = useColorModeValue('gray.800', 'white');
    const avatarBg = useColorModeValue('green.500', 'green.200');

    // Handles updating user data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <Flex direction="column" minHeight="100vh">
            <Box bgImage={userData.bannerUrl} bgPos="center" bgSize="cover" h="40vh"> {/* Increased banner height */}
                {/* Empty Box to adjust avatar position lower */}
                <Box pt="25vh" /> {/* Adjust this value to move the avatar lower */}
            </Box>
            <Box position="relative" width="100%" mt={-16}> {/* Move the avatar lower */}
                <Flex justify="center">
                    <Box bg={avatarBg} p={2} borderRadius="lg"> {/* Square box with different color */}
                        <Image
                            boxSize="150px"
                            objectFit="cover"
                            src={userData.avatarUrl}
                            alt={userData.name}
                            borderRadius="md" // Slightly rounded corners for the square
                        />
                    </Box>
                </Flex>
            </Box>
            <VStack spacing={4} align="center" mt={5} bg={bgColor} color={color} p={5} flex="1">
                <Editable defaultValue={userData.name} isPreviewFocusable={false}>
                    <EditablePreview />
                    <EditableInput name="name" onChange={handleInputChange} />
                </Editable>
                <Editable defaultValue={userData.bio} isPreviewFocusable={false}>
                    <EditablePreview />
                    <EditableInput name="bio" onChange={handleInputChange} />
                </Editable>
                <HStack spacing={2}>
                    {userData.hobbies.map((hobby, index) => (
                        <Tag key={index} size="md" variant="solid" colorScheme="green">
                            {hobby}
                        </Tag>
                    ))}
                </HStack>
                {editMode && (
                    <FormControl id="editUserInfo" mt={4} width="full">
                        <FormLabel>Name</FormLabel>
                        <Input name="name" value={userData.name} onChange={handleInputChange} />
                        <FormLabel mt={4}>Bio</FormLabel>
                        <Input name="bio" value={userData.bio} onChange={handleInputChange} />
                        <Button mt={4} colorScheme="blue" onClick={() => setEditMode(false)}>
                            Save Changes
                        </Button>
                    </FormControl>
                )}
                <Button mt={4} colorScheme="green" onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
                <Spacer />
            </VStack>
        </Flex>
    );
};

export default ProfilePage;