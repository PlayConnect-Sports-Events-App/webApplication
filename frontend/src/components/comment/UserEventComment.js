import React from 'react';
import { Box, Avatar, Text, Stack } from '@chakra-ui/react';

const UserEventComment = ({ avatarUrl, firstName, commentText }) => {
    return (
        <Box p={5} borderWidth="1px" flex="1" borderRadius={10}>
            <Stack direction="row" align="center" spacing={4}>
                <Avatar name={firstName} src={avatarUrl} />
                <Box>
                    <Text fontWeight="bold">{firstName}</Text>
                    <Text mt={2}>{commentText}</Text>
                </Box>
            </Stack>
        </Box>
    );
};

export default UserEventComment;