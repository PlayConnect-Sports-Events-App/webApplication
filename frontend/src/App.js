import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import NavbarAnonymous from "./components/navbar/NavbarAnonymous";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarLayout from "./components/layout/NavbarLayout";
import HomePage from "./components/pages/HomePage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import BasicLayout from "./components/layout/BasicLayout";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    {/* Route with Navbar */}
                    <Route element={<NavbarLayout />}>
                        <Route path="/" element={<HomePage />} />
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
