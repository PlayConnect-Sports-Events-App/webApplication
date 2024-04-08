import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure, Avatar, MenuList, Center, MenuItem, MenuDivider, Menu, MenuButton, useColorMode,Image
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon, MoonIcon, SunIcon,
} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../auth/AuthContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {IconLogout, IconUserCircle} from "@tabler/icons-react"
import useUserInfo from "../hooks/UserInfoHook";

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Events',
        children: [
            {
                label: 'Events Joined',
                subLabel: 'Get an overview of the events you have joined.',
                href: '/joined',
            },
            {
                label: 'Events Created',
                subLabel: 'See the vents you have created and their details.',
                href: '/created',
            },
            {
                label: 'Create Event',
                subLabel: 'Create a new event and invite others to join.',
                href: '/create',
            },
        ],
    },
    {
        label: 'About Us',
        href: '#',
    },
    {
        label: 'Contact Us',
        href: '#',
    },
];

export default function NavbarLoggedIn() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
    const { logout, authToken, userEmail } = useAuth(); // Destructure to get logout from the auth context
    const navigate = useNavigate();
    const { userInfo, loading, error } = useUserInfo(userEmail, authToken);

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        window.location.href="/"; // Reload the page to clear the state and redirect to the homepage
    };
    
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button 
                        bg={useColorModeValue('white', 'gray.800')}
                        onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'sm'}
                                src={'https://source.unsplash.com/random?user'}
                            />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar
                                    size={'2xl'}
                                    src={'https://source.unsplash.com/random?user'}
                                />
                            </Center>
                            <br />
                            <Center>
                                <p>{userInfo?.firstName} {userInfo?.lastName}</p>
                            </Center>
                            <br />
                            <MenuDivider />
                            <MenuItem icon={<IconUserCircle/>} onClick={() => navigate('/profile')}>Account</MenuItem>
                            <MenuItem icon={<IconLogout/>} onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'white');
    const linkHoverColor = useColorModeValue('green.500', 'green.200'); // Emphasizing green on hover
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('green.500', 'green.200'); // Green border for popover

    return (
      <Stack direction={'row'} spacing={4} align="center">
          {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                    <PopoverTrigger>
                        <Box
                          as="a"
                          p={2}
                          href={navItem.href ?? '#'}
                          fontSize={'sm'}
                          fontWeight={600} // Slightly bolder font for modern look
                          color={linkColor}
                          _hover={{
                              textDecoration: 'none',
                              color: linkHoverColor,
                              transform: 'translateY(-2px)', // Subtle lift effect on hover
                              transition: 'all .2s ease-out', // Smooth transition for hover effects
                          }}
                        >
                            {navItem.label}
                        </Box>
                    </PopoverTrigger>

                    {navItem.children && (
                      <PopoverContent
                        border={0}
                        boxShadow={'xl'}
                        bg={popoverContentBgColor}
                        p={4}
                        rounded={'xl'}
                        minW={'sm'}
                        borderColor={borderColor} // Adding a green-themed border
                        borderWidth={1} // Defining border width for visibility
                      >
                          <Stack>
                              {navItem.children.map((child) => (
                                <DesktopSubNav key={child.label} {...child} />
                              ))}
                          </Stack>
                      </PopoverContent>
                    )}
                </Popover>
            </Box>
          ))}
      </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'green.500' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'green.500'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};