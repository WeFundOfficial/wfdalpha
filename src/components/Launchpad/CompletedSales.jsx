import React from 'react';
import { Box, Button, Center, Container, Divider, HStack, Image, VStack, chakra, SimpleGrid, Text, Stack, Hide } from '@chakra-ui/react';

const sales = [
  {
    image: '/media/Launchpad/secret-partner.png',
    name: 'Top Secret',
    registration_start: 'TBA',
    platform_raise: 'TBA',
    ath_since_tge: 'TBA',
    link: '',
  },
  {
    image: '/media/Launchpad/secret-partner.png',
    name: 'Top Secret',
    registration_start: 'TBA',
    platform_raise: 'TBA',
    ath_since_tge: 'TBA',
    link: '',
  },
  {
    image: '/media/Launchpad/secret-partner.png',
    name: 'Top Secret',
    registration_start: 'TBA',
    platform_raise: 'TBA',
    ath_since_tge: 'TBA',
    link: '',
  }
]

function SaleItem(props) {
  const {image, name, registration_start, platform_raise, ath_since_tge, link} = props;
  const {selected = false} = props;
  return (
    <Box width={'full'} background={selected?'linear-gradient(90deg, rgba(38, 138, 255, 0.63) 0%, #2ABFFF 55.52%);':'linear-gradient(90deg, #3F1780 0%, #0E0D5A 55.52%);'} padding={'18px'} borderRadius={'18px'}
      borderStyle={'solid'} borderWidth={'3px'} borderColor={'#6ACEF5'}>
      
      <HStack spacing={'24px'} height={'215px'}>
        <Center background={'radial-gradient(50% 50% at 50% 50%, #AF63FA 0%, #19117A 100%);'} width={'160px'} height={'160px'} borderRadius={'full'} >
            <Image padding={'20px'} borderRadius={'full'} boxSize={'160px'} src={image} backgroundColor={'white'} />
        </Center>
        <Stack direction={{base: 'column', md:'row'}} flex={{base: 1, md: null}} alignItems={{base: null, md: 'center'}}>
        <Text flex={1} fontSize={'30px'} fontFamily={'PilatExtended-Bold'} color={selected?'#430E82':'white'}>{name}</Text>
        <Hide below='md'>
        <Box height={'120px'} width={'2px'} backgroundColor={selected?'#430E82':'#69E4FF'} marginX={'8px'} />
        </Hide>
        
        <SimpleGrid templateColumns={'1fr 40px'} padding={{base:'0px', md: '24px'}} textColor={selected?'#430E82':'white'} fontFamily={'Poppins'} flex={1} spacingY={{base: null, md: '12px'}}>
          <Text textAlign={'left'}>Registration Start</Text>
          <Text fontWeight={'bold'}>{registration_start}</Text>
          <Text textAlign={'left'}>Platform Raise</Text>
          <Text fontWeight={'bold'}>{platform_raise}</Text>
          <Text textAlign={'left'}>ATH Since TGE</Text>
          <Text fontWeight={'bold'}>{ath_since_tge}</Text>
        </SimpleGrid>
        <Button as={'a'} href={link} textDecor={'inherit'} paddingX={'24px'} backgroundColor={selected?'#0D1776':'#0084FF'} color={'white'} fontWeight={'bold'}>RESEARCH</Button>
        </Stack>
      </HStack>
    </Box>
  )
}

export default function CompletedSales() {
  return (
    <Box paddingY={'32px'}>
      <Container maxW={'container.xl'}>
        <Center marginTop={'48px'}>
          <Text
            color="#63CDFA"
            fontFamily="PilatExtended-Bold"
            fontSize={{ base: '20px', md: '25px', lg: '30px' }}>
            COMPLETED <chakra.span color={'white'}>SALES</chakra.span> 
          </Text>
        </Center>
        <Box
          borderRadius={'16px'} background={'linear-gradient(180deg, rgba(37, 5, 77, 0.48) 0%, rgba(69, 16, 138, 0.63) 100%);'}
          borderStyle={'solid'} borderWidth={'3px'} borderColor={'#6ACEF5'}
          maxH={'900px'} marginY={'36px'} overflowY={'scroll'} css={{
            '&::-webkit-scrollbar': {
              width: '24px',
              backgroundColor: '#6ACEF5',
              borderRadius: '12px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#45108AA1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#45108AA1',
              borderRadius: '12px',
            },
          }}>
          <Box padding={'36px'}>
            <VStack spacing={'18px'}>
              {sales.map((sale, i) => <SaleItem {...sale} selected={i === 0} />)}
            </VStack>
          </Box>
          
        </Box>
      </Container>
    </Box>
  )
}