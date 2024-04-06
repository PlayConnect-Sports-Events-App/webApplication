import { Avatar, Text } from '@chakra-ui/react';
import React from 'react';

// Display user participant
const UserParticipant = ({ avatarUrl, firstName, lastName }) => {
  return (
    <div>
      <Avatar name={`${firstName} ${lastName}`} src={avatarUrl} />
      <Text mt='1'>{firstName}</Text>
    </div>
  );
};

export default UserParticipant;