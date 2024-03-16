import NavbarAnonymous from "../navbar/NavbarAnonymous";
import React from "react";
import {Outlet} from "react-router-dom";
import {useAuth} from "../auth/AuthContext";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";


const NavbarLayout = () => {
    const {authToken} = useAuth();
    
    return (
        <>
            {authToken ? <NavbarLoggedIn/> : <NavbarAnonymous/>}
            <Outlet/>
        </>
    )
};

export default NavbarLayout;

{/*<Flex>
            <Sidebar width="20%" minWidth="200px" height="100vh" position="fixed"/>
            <Flex flex="1" marginLeft={{ base: "0", md: "200px" }} paddingTop="4">
                <Outlet/>
            </Flex>
        </Flex>*/}