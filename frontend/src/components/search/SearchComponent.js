import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  InputGroup,
  InputLeftAddon,
  Stack, Flex, useColorModeValue, InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import {IconSearch} from "@tabler/icons-react"

const SearchComponent = ({ onSearch }) => {
  const [sportType, setSportType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ sportType, location, date, time });
  };

  return (
    <Box my={6} textAlign="left">
      <form onSubmit={handleSubmit}>
        <Flex align="center" wrap="wrap" gap={6} mb={6}>
          <FormControl flex="1" minW="240px">
            <FormLabel htmlFor="sport-type">Sport Type</FormLabel>
            <Select id="sport-type" placeholder="Select sport type" variant="filled" size="lg" onChange={(e) => {
              setSportType(e.target.value);
              console.log({
                sportType: e.target.value,
                location,
                date,
                time,
              });
            }}>
              <option value='football'>Football</option>
              <option value='tennis'>Tennis</option>
              <option value='basketball'>Basketball</option>
            </Select>
          </FormControl>

          <FormControl flex="1" minW="240px">
            <FormLabel htmlFor="location">Location</FormLabel>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
              <Input id="location" type="text" placeholder="Enter location" variant="filled" 
                     onChange={(e) => {
                setLocation(e.target.value);
                console.log({
                  sportType,
                  location: e.target.value,
                  date,
                  time,
                });
              }}/>
            </InputGroup>
          </FormControl>

          <FormControl flex="1" minW="240px">
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input id="date" type="date" variant="filled" size="lg" onChange={(e) => {
              setDate(e.target.value);
              console.log({
                sportType,
                location,
                date: e.target.value,
                time,
              });
            }}/>
          </FormControl>

          <FormControl flex="1" minW="240px">
            <FormLabel htmlFor="time">Time</FormLabel>
            <Input id="time" type="time" variant="filled" size="lg" onChange={(e) => {
              setTime(e.target.value);
              console.log({
                sportType,
                location,
                date,
                time: e.target.value,
              });
            }}/>
          </FormControl>
        </Flex>

        <Flex justifyContent="center">
          <Button
            mt={4}
            type="submit"
            width="40%"
            px={8}
            h={12}
            rounded="xl"
            boxShadow="md"
            fontSize="lg"
            bgGradient="linear(to-r, teal.300, green.400)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, teal.400, green.500)",
              boxShadow: "lg",
            }}
            _focus={{
              outline: "none",
              bgGradient: "linear(to-r, teal.400, green.500)",
            }}
          >
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SearchComponent;