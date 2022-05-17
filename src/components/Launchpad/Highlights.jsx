import React from 'react'
import { Flex, Text, Image, Button } from '@chakra-ui/react'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

export default function Problem() {
  return (
    <Flex
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      my={{ base: '5em', md: '8em', lg: '10em' }}
    >
      <Text
        fontSize='48px'
        fontWeight='700'
        color='#6ACEF5'
      >
        HIGHLIGHTS
      </Text>
      <Flex
        mt='28px'
        pb="2em"
        width="100%"
        position="relative"
        bgRepeat="no-repeat"
        flexDirection="column"
        backgroundSize="cover"
        justifyContent="flex-start"
      >
        <Carousel
          infinite
          autoPlay={false}
          swipeable={true}
          draggable={true}
          showThumbs={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          responsive={responsive}
          transitionDuration={500}
          arrows={false}
          showDots={true}
        >
          {projects.map((item, index) => (
            <Flex
              zIndex={'4'}
              margin="0 auto"
              border='3px solid #69E4FF'
              borderRadius="20px"
              alignItems={'center'}
              position={'relative'}
              flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
              justifyContent={'center'}
              // width={{ base: '95%', md: '90%', lg: '65em' }}
              mx={{ base: '20px', md: '20px', lg: '120px' }}
              key={index}
            >
              <Flex
                display={{sm:'flex', md:'flex', lg:'none'}}
                w='100%'
                p = '6px'
              >
                <Image src={item.img} />
              </Flex>
              <Flex 
                direction='column'
                px={{ base: '11px', md: '11px', lg: '60px' }}
                py={{ base:'19px', md:'19px', lg:'19px'}}
              >
                <Text 
                  fontFamily='PilatExtended-Bold' 
                  fontSize={{sm:'15px', md:'15px', lg:'32px' }}
                  fontWeight='400'
                >
                  {item.title}
                </Text>
                <Text 
                  fontFamily={'Poppins'} 
                  fontSize={{sm:'8px', md:'8px', lg:'20px' }}
                  fontWeight={'600'} 
                  textAlign='justify'
                  mt='43px'
                >
                  {item.description}
                </Text>
                <Flex w='100%' justify={'center'}>
                  <Button
                    mt='48px'
                    w={{sm:'139px', md: '139px', lg: '243px'}}
                    h={{sm:'33px', md:'33px', lg: '43px'}}
                    bg={'linear-gradient(180deg, #6ACEF5 0%, #4C9BE8 100%)'}
                    rounded='33px'
                  >
                    <Text fontFamily={'Gilroy'} fontWeight='800' fontSize='20px'>
                      Join us
                    </Text>
                  </Button>
                </Flex>
              </Flex>
              <Flex
                display={{sm:'none', md:'none', lg:'flex'}}
                rounded='20px'
                minW='407px'
                p='19px'
              >
                <Image src={item.img} />
              </Flex>
            </Flex>
          ))}
          
        </Carousel>
      </Flex>
    </Flex>
  )
}

const projects = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: '/media/Launchpad/Highlights/1.png',
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: '/media/Launchpad/Highlights/1.png',
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: '/media/Launchpad/Highlights/1.png',
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: '/media/Launchpad/Highlights/1.png',
  },
]
