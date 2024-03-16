import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Grid} from "@chakra-ui/react";
import EventCard from "../event/EventCard";

const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/event');
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                // Handle error appropriately in your UI
            }
        };

        fetchEvents();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} margin={10}>
            {events.map(event => (
                <EventCard key={event.id} {...event} />
            ))}
        </Grid>
    );
};

export default HomePage;