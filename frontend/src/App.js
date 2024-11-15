import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarLayout from "./components/layout/NavbarLayout";
import HomePage from "./components/pages/HomePage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import BasicLayout from "./components/layout/BasicLayout";
import EventDetailsPage from "./components/pages/EventDetailsPage";
import ProfilePage from "./components/pages/ProfilePage";
import CreateEventPage from './components/pages/CreateEventPage';
import EventsCreatedPage from './components/pages/EventsCreatedPage';
import EventsJoinedPage from './components/pages/EventsJoinedPage';
import UpdateEventPage from './components/pages/UpdateEventPage';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    {/* Route with Navbar */}
                    <Route element={<NavbarLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="event/:eventId" element={<EventDetailsPage />} />
                        <Route path="profile" element={<ProfilePage/>} />
                        <Route path="create" element={<CreateEventPage/>} />
                        <Route path='joined' element={<EventsJoinedPage/>} />
                        <Route path='created' element={<EventsCreatedPage/>} />
                        <Route path="event/:eventId/edit" element={<UpdateEventPage/>} />
                    </Route>
                    {/* Routes without Navbar */}
                    <Route element={<BasicLayout />}>
                        <Route path="signin" element={<SignInPage />} />
                        <Route path="signup" element={<SignUpPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
);
}

export default App;
