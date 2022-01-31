import { Box, SimpleGrid, Image, Text,Link,Center } from '@chakra-ui/react'
import * as React from 'react'

export default function Partners() {
  return (
    <Box as="section" p="10" mb={'28'}>
      <Box
        maxW="7xl"
        mx="auto"
        px={{
          base: '6',
          md: '8',
        }}
        alignSelf={'center'}
        alignContent={'center'}
      >
        <Text 
          fontSize="36px" color={'white'} 
          style={{ fontFamily: 'PilatExtended-Bold' }} 
          textAlign={'center'} mb={'35px'}>
            Our Partners
        </Text>
        <SimpleGrid
          ml={'50px'}
          align='center'
          columns={{
            base: 1,
            md: 4,
          }}
          spacing="5"
        >
          <Link href='https://kommunitas.net/'
          backgroundColor={'#f0f3fa'}
          >
            <Center
            height={'100%'}
            >
              <Image src="/media/Kommunitas.png" />
            </Center>
          </Link>
          <Link href='https://www.youtube.com/channel/UCmNM2yxDyy6NonRrzGSXQVA'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/pandai.png" />
            </Center>
          </Link>
          <Link href='https://linktr.ee/DanceroNFT'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/dancero.jpg" />
            </Center>
          </Link>
          <Link href='https://baksomania.com/'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/Baksomania.png" />
            </Center>
          </Link>
          <Link href='https://moggiesverse.com/'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/Moggie.jpg" />
            </Center>
          </Link>
          <Link href='https://www.pinecone.community/#/home'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/pinecone.png" />
            </Center>
          </Link>
          <Link href='https://terraspaces.org/'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/terraspace.jpg" />
            </Center>
          </Link>
          <Link href='https://www.lunapad.co/'
          backgroundColor={'#f0f3fa'}>
            <Center
            height={'100%'}
            >
              <Image src="/media/lunapad.png" />
            </Center>
          </Link>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
