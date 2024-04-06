import React from 'react';
import { Box, Avatar, Text, Stack, Flex, HStack } from '@chakra-ui/react';

// UserEventComment component, used to display comments on an event
const UserEventComment = ({ avatarUrl, firstName, commentText }) => {
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
                2 hours ago
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