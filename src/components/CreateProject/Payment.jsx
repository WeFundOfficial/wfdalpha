import React from 'react'
import {
  Flex,
  Text,
  Img,
} from '@chakra-ui/react'

import {
  ImageTransition,
} from '../ImageTransition'

export default function Payment({isUST, setIsUST}) {

  return (
    <>
    {/* --------Select UST or WFD------------------ */}
      <Text fontSize="18px" pt="50px" textAlign='left'>
        Select Payment Method
      </Text>

      <Flex direction="row" mt="40px">
        {/* ------------UST---------------------- */}
        <ImageTransition
          unitid="coinust"
          border1="linear-gradient(180deg, #00A3FF 0%, rgba(0, 71, 255, 0) 100%)"
          background1="linear-gradient(180deg, #2B226B 0%, #1B0131 100%)"
          border2="linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%)"
          background2="linear-gradient(180deg, #31173A 0%, #421D50 0.01%, #21052C 100%)"
          border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
          selected={isUST}
          width="120px"
          height="160px"
          rounded="10px"
          onClick={() => {
            setIsUST(true)
          }}
        >
          <Img
            mt="23px"
            boxSize="50px"
            objectFit="cover"
            src="/media/UST.svg"
            alt="UST Avatar"
          />
          <Text mt="13px">UST</Text>
          <Img
            mt="15px"
            mb="20px"
            boxSize="20px"
            objectFit="cover"
            src={isUST ? '/group_dot.svg' : '/group_undot.svg'}
            alt="UST Avatar"
          />
        </ImageTransition>

        {/* --------------------------WFD------------------------- */}
        <ImageTransition
          unitid="coinwfd"
          border1="linear-gradient(180deg, #00A3FF 0%, rgba(0, 71, 255, 0) 100%)"
          background1="linear-gradient(180deg, #2B226B 0%, #1B0131 100%)"
          border2="linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%)"
          background2="linear-gradient(180deg, #31173A 0%, #421D50 0.01%, #21052C 100%)"
          border3="linear-gradient(180deg, #00A3FF 0%, #0047FF 100%)"
          background3="linear-gradient(180deg, #171347 0%, #171347 100%)"
          selected={!isUST}
          width="120px"
          height="160px"
          rounded="10px"
          ml="20px"
          onClick={() => {
            setIsUST(false)
          }}
        >
          <Img
            mt="23px"
            height="35px"
            objectFit="cover"
            src="/media/WeFund-Logos-only.png"
            alt="UST Avatar"
          />
          <Text mt="13px">WFD</Text>
          <Img
            mt="25px"
            mt="15px"
            boxSize="20px"
            objectFit="cover"
            src={isUST ? '/group_undot.svg' : '/group_dot.svg'}
            alt="UST Avatar"
          />
        </ImageTransition>
      </Flex>
    </>
  )
};