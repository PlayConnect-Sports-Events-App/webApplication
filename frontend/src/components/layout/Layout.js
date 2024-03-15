import NavbarAnonymous from "../navbar/NavbarAnonymous";
import React from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../navbar/Sidebar";

const Layout = () => {
    return (
        <>
            <NavbarAnonymous/>
            <Outlet/>
        </>
    )
};

export default Layout;

{/*<Flex>
            <Sidebar width="20%" minWidth="200px" height="100vh" position="fixed"/>
            <Flex flex="1" marginLeft={{ base: "0", md: "200px" }} paddingTop="4">
                <Outlet/>
            </Flex>
        </Flex>*/}