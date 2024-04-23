import React from 'react';
import {Box, Avatar, Text, Stack, Flex, HStack, IconButton, Tooltip} from '@chakra-ui/react';
import {formatDistanceToNow} from 'date-fns';
import {IconTrash} from '@tabler/icons-react';

// UserEventComment component, used to display comments on an event
const UserEventComment = ({avatarUrl, firstName, commentText, createdAt, isUserComment, onDelete}) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), {addSuffix: true});

    return (
        <Box position="relative" p={5} borderBottom="1px solid" borderColor="gray.200" flex="1">
            {isUserComment && (
                <Tooltip label="Delete">
                    <IconButton
                        aria-label="Delete comment"
                        icon={<IconTrash/>}
                        size="sm"
                        position="absolute"
                        right="2"
                        top="2"
                        variant="ghost"
                        onClick={onDelete}  // Only render this button if isUserComment is true
                    />
                </Tooltip>
            )}
            <Stack direction="row" align="center" spacing={4}>
                <Box>
                    <HStack spacing={3}>
                        <Avatar size="md" name={firstName} src={avatarUrl}/>
                        <Flex direction="column">
                            <Text fontWeight="bold" fontSize="md">
                                {firstName}
                            </Text>
                            <Text fontWeight="light" fontSize="xs">
                                {timeAgo}
                            </Text>
                        </Flex>
                    </HStack>
                    <Text mt={2}>{commentText}</Text>
                </Box>
            </Stack>
        </Box>
    );
};

export default UserEventComment;