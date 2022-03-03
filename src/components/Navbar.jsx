import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Icon,
  Flex,
  Image,
  VStack,
  HStack,
  ChakraProvider,
} from '@chakra-ui/react'
import { LCDClient, WasmAPI } from '@terra-money/terra.js'
import theme from '../theme'
import '../styles/Navbar.css'
import { Link, navigate } from '@reach/router'
import ConnectWallet from './ConnectWallet'
import { RiAccountPinBoxFill } from 'react-icons/ri'
import { Container } from '../components/Container'
import { ButtonBackTransition } from '../components/ImageTransition'
import { useStore } from '../store'
import { FetchData } from './Util'
export default function Navbar() {
  const [nextNetwork, setNextNetwork] = useState('Test');
  const {state, dispatch} = useStore();

  useEffect(()=>{
    if(state.net == 'testnet')
      setNextNetwork("mainnet")
    else
      setNextNetwork("testnet")
  }, [])

  function switchNetwork(){
    let lcdClient;
    if(state.net == 'testnet'){
      dispatch({
        type: 'setNet',
        message: "mainnet"
      })
      lcdClient = new LCDClient({ //mainnet
        URL: 'https://lcd.terra.dev',
        chainID: 'columbus-4',
      })
      dispatch({
        type: 'setLcdClient',
        message: lcdClient
      })
      dispatch({
        type: 'setWefundContract',
        message: "terra1j0yx7nrxuyt6vrhtagdn4z8z8qy3ch7aglj32k"
      })
      dispatch({
        type: 'setVestingContract',
        message: "terra1lc80529cg7lm2eyzjvax3p60jwst6u4v7yswza"
      })
      setNextNetwork("testnet")
    } else {
      dispatch({
        type: 'setNet',
        message: "testnet"
      })
      lcdClient = new LCDClient({ //mainnet
        URL: 'https://bombay-lcd.terra.dev/',
        chainID: 'bombay-12',
      })
      dispatch({
        type: 'setLcdClient',
        message: lcdClient
      })
      dispatch({
        type: 'setWefundContract',
        message: "terra16n9af2cd5rf03w9v88zp4ua6zsk4k803zvh5fe"
      })
      dispatch({
        type: 'setVestingContract',
        message: "terra15tpq4hvvl0mmr72n290m3lzl4nm4kz5w0np804"
      })
      setNextNetwork("mainnet");
    }
    dispatch({
      type: 'setProjectData',
      message: ''
    })
    dispatch({
      type: 'setConfigData',
      message: ''
    })
    dispatch({
      type: 'setCommunityData',
      message: ''
    })
    dispatch({
      type: 'setActiveProjectData',
      message: ''
    })
    // navigate("/");
  }
  const SwitchButton = () => {
    return(
      <div onClick={switchNetwork} style={{cursor:"pointer", border:'1px solid red', padding:'1px'}}>
        Switch to {nextNetwork}
      </div>
    )
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Container>
        <VStack display={{ base: 'none', md: 'none', lg: 'block' }}>
          <Flex
            direction="row"
            justify="space-between"
            h="80px"
            zIndex="99"
            w="100%"
            position="relative"
            backdropFilter="blur(54px)"
            borderBottom="2px solid rgba(255, 255, 255, 0.103)"
          >
            <Flex w="50%" h="100%" align="center" justify="space-between">
              <Flex ml="90px">
                <Link className="navbar-brand" to="/">
                  <Image
                    alt="Wefund"
                    src="/media/WeFund-Logos-only.png"
                    h="30px"
                  />
                </Link>
                <Flex ml="10px" border="1px solid rgba(255,255,255, 0.2)" />
              </Flex>
              <DesktopNav />
              <SwitchButton />
            </Flex>
            <Flex mr="20px" align="center" justify="center" w="40%" h="100%">
              <ButtonBackTransition
                unitid="CreateYourProject"
                selected={false}
                width="197px"
                height="40px"
                rounded="33px"
              >
                <Link to="/create">
                  <Box
                    variant="solid"
                    color="white"
                    justify="center"
                    align="center"
                  >
                    Create Your Project
                  </Box>
                </Link>
              </ButtonBackTransition>

              <Flex w="197px" ml="20px" mr={'10px'}>
                <ConnectWallet />
              </Flex>
              <Link to="walletInfo">
                <Icon as={RiAccountPinBoxFill} fontSize={'45px'} />
              </Link>

            </Flex>
          </Flex>
        </VStack>
        <VStack display={{ base: 'block', md: 'block', lg: 'none' }}>
          <Flex
            h="60px"
            w="100%"
            zIndex="99"
            direction="row"
            position="relative"
            justify="space-between"
            backdropFilter="blur(54px)"
            borderBottom="2px solid rgba(255, 255, 255, 0.103)"
          >
            <Flex ml="30px" align="center">
              <Link className="navbar-brand" to="/">
                <Image
                  alt="Wefund"
                  src="/media/WeFund-Logos-only.png"
                  h="25px"
                />
              </Link>
              <SwitchButton/>
            </Flex>
            <HStack>
              <Flex mr="10px" className="dropdown2">
                <Flex className="dropbtn">
                  <Image alt="menu1" src="/media/menuButton1.svg" h="20px" />
                </Flex>
                <div className="dropdown-content2">
                  <ConnectWallet />
                </div>
              </Flex>
              <Flex pr="30px" className="dropdown">
                <Flex className="dropbtn" mr={'20px'}>
                  <Image alt="menu2" src="/media/menuButton2.svg" h="20px" />
                </Flex>
                <Link to="walletInfo">
                  <Icon as={RiAccountPinBoxFill} fontSize={'30px'} />
                </Link>
                <div className="dropdown-content">
                  {NAV_ITEMS.map((navItem, index) => (
                    <Link to={navItem.href} key={index}>
                      {navItem.label}
                    </Link>
                  ))}
                  <Link to="/create">Create Project</Link>
                </div>
              </Flex>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}
const DesktopNav = () => {
  return (
    <>
      {NAV_ITEMS.map((navItem, index) => (
        <Flex key={index} className="btn-group" cursor="pointer" align="center">
          <Link to={navItem.href} className="btn btn-danger">
            <Text
              color="rgba(255, 255, 255, 0.84)"
              fontSize="16px"
              lineHeight="18px"
            >
              {navItem.label}
            </Text>
          </Link>
        </Flex>
      ))}
    </>
  )
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/explorer',
  },
  {
    label: 'Invest in WeFund',
    href: '/invest_step0',
  },
  // {
  //   label: 'Dashboard',
  //   href: 'dashboard',
  // },
  //  {
  //    label: 'Career',
  //    href: '#',
  //  },
  //  {
  //    label: 'Contact',
  //    href: '#',
  //  },
  {
    label: 'Blog',
    href: '/blog',
  },
  // {
  //   label: 'FAQ',
  //   href: 'faq',
  // },
]
