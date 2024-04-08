import {
    Avatar,
    Box,
    Button,
    Flex, IconButton, Input,
    List,
    ListItem,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text, Tooltip,
    useColorModeValue,
    useDisclosure, useToast,
} from '@chakra-ui/react';
import {IconChevronRight, IconSend} from '@tabler/icons-react';
import UserEventComment from './UserEventComment';
import {useEffect, useState} from 'react';
import {useAuth} from "../auth/AuthContext";
import axios from "axios";


function CommentSection({comments, user, eventId}) {
    const [newComment, setNewComment] = useState('');
    
    // State to keep all comments, the one fetched from a backend and ones just posted
    const [commentsState, setCommentsState] = useState(comments);
    const [userInfos, setUserInfos] = useState({});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const { authToken } = useAuth();
    const toast = useToast();

    // Update commentsState when comments prop changes (after fetching new comments or adding a new comment)
    useEffect(() => {
        setCommentsState(comments);
    }, [comments]);

    
    useEffect(() => {
        // Get unique user IDs from the comments
        const uniqueUserIds = Array.from(new Set(comments.map(comment => comment.userId))); 
        // Fetch user info by ID
        const fetchUserById = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${userId}/common`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Assuming authToken is available
                    },
                });
                console.log(`User info for user ID ${userId}:`, response.data);
                return response.data;
            } catch (error) {
                console.error(`Error fetching user info for user ID ${userId}:`, error);
                // Optionally, handle error state here
                return null;
            }
        };

        // Store user info for all unique user IDs 
        const fetchAllUsersInfo = async () => {
            // Fetch user info for all unique user IDs
            const userInfoPromises = uniqueUserIds.map(userId => fetchUserById(userId));
            const usersInfoArray = await Promise.all(userInfoPromises);

            // Create an object with user IDs as keys and user info objects as values
            const usersInfo = usersInfoArray.reduce((acc, userInfo, index) => {
                if (userInfo) { // Ensure userInfo is not null
                    acc[uniqueUserIds[index]] = userInfo;
                }
                return acc;
            }, {});

            setUserInfos(usersInfo); // Assuming setUserInfos is the state setter for storing user information
        };

        if (uniqueUserIds.length > 0 && authToken) {
            fetchAllUsersInfo();
        }
    }, [comments, authToken]); // Depend on comments and authToken

    // Function to add a new comment
    const addComment = async () => {
        const newCommentData = {
            userId: user.id,
            eventId: eventId, 
            content: newComment,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/comment', newCommentData,{});

            // the backend responds with the added comment, including its ID and createdAt
            const addedComment = response.data;

            // Update your local comments state or trigger a re-fetch as needed
            setCommentsState(prevComments => [...prevComments, addedComment]);

            // Reset input field after submission
            setNewComment('');
            toast({
                title: "Success.",
                description: "Your comment has been added.",
                status: "success",
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: "top-right", // Position of the toast notification
            });
        } catch (error) {
            toast({
                title: 'Oops! Something went wrong.',
                description: 'There was an error when adding your comment. Please try again.',
                status: 'error',
                duration: 3000, // Duration in milliseconds; adjust as needed
                isClosable: true,
                position: 'top-right', // Position of the toast notification
            });
        }
    };

    return (
        <Box>
            <Flex
                alignItems='center'
                justifyContent='space-between'
                mb={4}
            >
                <Text
                    fontSize={{base: '16px', lg: '18px'}}
                    color={useColorModeValue('green.500', 'green.300')}
                    fontWeight='500'
                    textTransform='uppercase'
                >
                    Comments
                </Text>
                <Button
                    rightIcon={<IconChevronRight size={18}/>}
                    variant='ghost'
                    colorScheme='teal'
                    size='sm'
                    onClick={onOpen}
                >
                    View All
                </Button>
            </Flex>
            {/* Comment list */}
            <List spacing={2}>
                {commentsState.map(comment => (
                    <ListItem key={comment.commentId}>
                        <UserEventComment
                            avatarUrl={userInfos[comment.userId]?.avatarUrl || 'https://source.unsplash.com/random?user'}
                            firstName={userInfos[comment.userId]?.firstName || 'User'}
                            commentText={comment.content}
                            createdAt={comment.createdAt}
                        />
                    </ListItem>
                ))}
            </List>
            <Flex align='center' mt={10}>
                <Avatar src={'https://source.unsplash.com/random?user'} size='md' mr={2} ml={5}/>
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Add a comment...'
                    size='md'
                    variant='flushed'
                    flexGrow={1}
                    mr={2}
                />
                <Tooltip label='Send'>
                    <IconButton
                        icon={<IconSend size={25}/>}
                        onClick={addComment}
                        aria-label='Send comment'
                        variant='ghost'
                    />
                </Tooltip>
            </Flex>

            {/* Modal for viewing all comments */}
            <Modal isOpen={isOpen} size='xl' onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Comments</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <List spacing={2}>
                            {commentsState.map(comment => (
                                <ListItem key={comment.commentId}>
                                    <UserEventComment
                                        avatarUrl={userInfos[comment.userId]?.avatarUrl || 'https://source.unsplash.com/random?user'}
                                        firstName={userInfos[comment.userId]?.firstName || 'User'}
                                        commentText={comment.content}
                                        createdAt={comment.createdAt}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default CommentSection;


