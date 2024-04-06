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
  useDisclosure,
} from '@chakra-ui/react';
import { IconChevronRight, IconSend } from '@tabler/icons-react';
import UserEventComment from './UserEventComment';
import { useState } from 'react';


function CommentSection({ comments }) {
  const [newComment, setNewComment] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Placeholder for adding a comment. Implement the logic as needed.
  const addComment = () => {
    // Placeholder: Add comment to your state or backend
    alert(`Adding comment: ${newComment}`);
    // Reset input field after submission
    setNewComment('');
  };

  return (
    <Box>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        mb={4}
      >
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          color={useColorModeValue('green.500', 'green.300')}
          fontWeight='500'
          textTransform='uppercase'
        >
          Comments
        </Text>
        <Button
          rightIcon={<IconChevronRight size={18} />}
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
        {comments.map(comment => (
          <ListItem key={comment.id}>
            <UserEventComment
              avatarUrl={comment.avatarUrl}
              firstName={comment.firstName}
              commentText={comment.commentText}
            />
          </ListItem>
        ))}
      </List>
      <Flex align='center' mt={10}>
        <Avatar src={'https://source.unsplash.com/random?user'} size='md' mr={2} ml={5} />
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
            icon={<IconSend size={25} />}
            onClick={addComment}
            aria-label='Send comment'
            variant='ghost'
          />
        </Tooltip>
      </Flex>

      {/* Modal for viewing all comments */}
      <Modal isOpen={isOpen} size='xl' onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={2}>
              {comments.map(comment => (
                <ListItem key={comment.id}>
                  <UserEventComment
                    avatarUrl={comment.avatarUrl}
                    firstName={comment.firstName}
                    commentText={comment.commentText}
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


