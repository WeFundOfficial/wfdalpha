import React from 'react';
import { Image, Flex, Text } from '@chakra-ui/react';

export default function faqHeader() {
  return (
    <Flex id="heroSection" direction="column">
      <Image src="stars.svg" id="starsBg" />
      <Image src="cloud.svg" id="cloudBg" />
      <Image src="stage.png" id="stageBg" />
      <Image src="horizontallogo.svg" id="heroLogo" />
      <Flex id="ArrowDownButton">
        <a href="#aboutSection">
          <Image src="ArrowDown.png" id="ArrowDownButtonImage" />
        </a>
      </Flex>
    </Flex>
  );
}
