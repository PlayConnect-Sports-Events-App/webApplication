import React from 'react';
import { Box, Avatar, Text, Stack, Flex, HStack } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

// UserEventComment component, used to display comments on an event
const UserEventComment = ({ avatarUrl, firstName, commentText, createdAt }) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  return (
    <Box p={5} borderBottom="1px solid" borderColor="gray.200" flex="1">
      <Stack direction="row" align="center" spacing={4}>
        <Box>
          <HStack spacing={3}>
            <Avatar size="md" name={firstName} src={avatarUrl} />
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