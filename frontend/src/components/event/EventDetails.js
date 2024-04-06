import { Box, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';
import { IconClockHour3, IconMapPin, IconYoga, IconPin} from '@tabler/icons-react';


function EventDetails({ event, participantsCount }) {
  
  // Function to format the event date
  const formatDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear().toString()}`;
  };

  // Function to format the event time
  const formatTime = (time) => {
    if (!time) return ''; // Return an empty string or some default value if time is undefined

    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const ampm = h >= 12 ? 'pm' : 'am';
    const formattedHour = ((h + 11) % 12 + 1); // Convert 24h to 12h format
    return `${formattedHour}:${m < 10 ? `0${m}` : m} ${ampm}`;
  };

  // Function to get the number of free spots of an event
  const getFreeSpots = () => {
    return event?.maxParticipants - participantsCount;
  };

  return (
    <Box>
      <Text
        fontSize={{ base: '16px', lg: '18px' }}
        color={useColorModeValue('green.500', 'green.300')}
        fontWeight={'500'}
        textTransform={'uppercase'}
        mb={'4'}>
        Details
      </Text>
      <List spacing={2}>
        <ListItem display='flex' alignItems='center'>
          <IconClockHour3 boxSize={6} />
          <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
            Event Time & Date:
          </Text>
          {formatDate(event.eventDate)} at {formatTime(event.eventTime)}
        </ListItem>
        <ListItem display='flex' alignItems='center'>
          <IconMapPin boxSize={6} />
          <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
            Location:
          </Text>
          {event.location}
        </ListItem>
        <ListItem display='flex' alignItems='center'>
          <IconYoga boxSize={6} />
          <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
            Sport Type:
          </Text>
          {event.sportType}
        </ListItem>
        <ListItem display='flex' alignItems='center'>
          <IconPin boxSize={6} />
          <Text as={'span'} fontWeight={'bold'} ml={2} mr={2}>
            Available spots:
          </Text>
          {getFreeSpots()}/{event.maxParticipants}
        </ListItem>
      </List>
    </Box>
  );
}

export default EventDetails;