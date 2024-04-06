import {
  Avatar,
  Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  Button,
  Flex, Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text, useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IconChevronRight } from '@tabler/icons-react';
import UserParticipant from './UserParticipant';

function ParticipantList({ participants }) {
  // Used for the popup dialog
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        mb={'4'}
      >
        <Text
          fontSize={{ base: '16px', lg: '18px' }}
          color={useColorModeValue('green.500', 'green.300')}
          fontWeight={'500'}
          textTransform={'uppercase'}
        >
          Participants
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
        <Modal isOpen={isOpen} size={'xl'} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Participants</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List display='flex' flexDirection='row' gap='4'>
                {participants.map(participant => (
                  <ListItem key={participant.name}>
                    <Box textAlign='center'>
                      <UserParticipant firstName={participant.firstName} lastName={participant.lastName}
                                       avatarUrl={participant.avatarUrl} />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <List display='flex' flexDirection='row' gap='4'>
        {participants.map(participant => (
          <ListItem key={participant.name}>
            <Box textAlign='center'>
              <UserParticipant firstName={participant.firstName} lastName={participant.lastName} avatarUrl={participant.avatarUrl} />
            </Box>
          </ListItem>
        ))}
        <Breadcrumb mt={4} ml={2}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} onClick={onOpen}>
              and others
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </List>
    </Box>
  );
}

export default ParticipantList;