import React, { useState, useRef} from 'react';
import { useNavigate } from '@reach/router'
import {
  Flex,
  Input,
  Button,
  Box, 
  } from "@chakra-ui/react";
import { toast } from 'react-toastify';


import PageLayout from '../components/PageLayout'
import { errorOption } from '../components/Util';
import { InputTransition, ButtonTransition } from "../components/ImageTransition";
import { useStore } from '../store'

export default function InvestStep1() {
  const [showInput, setShowInput] = useState(false);
  const passRef = useRef();
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  function onPresale(){
    dispatch({
      type: 'setPresale',
      message: true,
    })
    navigate('/invest_step1?project_id=' + state.wefundID);
  }
  function onSeed(){
    setShowInput(!showInput);
  }

  function onConfirm(){
    const CryptoJS = require('crypto-js');
  
    if(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(passRef.current.value)) === 'V2VGdW5kVkMyMDIy')
    {
      dispatch({
        type: 'setPresale',
        message: false,
      })
      navigate('/invest_step1?project_id=' + state.wefundID);
    }
    else{
      toast("Sorry, wrong password", errorOption);
    }
  }
  return (
    <PageLayout title="Back the Project" subTitle1="Invest" subTitle2="in WeFund">
      <Box pt='100px'>
        <ButtonTransition 
          unitid='presale'
          selected={false}
          width='200px' 
          height='50px'
          rounded='33px'
          onClick = {onPresale}
        >
          Presale
        </ButtonTransition>

        <ButtonTransition 
          unitid='Seed'
          selected={false}
          width='200px' 
          height='50px'
          rounded='33px'
          onClick = {onSeed}
          mt = '50px'
        >
          Private Sale
        </ButtonTransition>
        <Flex 
          display={showInput? 'block' : 'none'} 
          mt='30px'
          pb='100px'
        >
          <InputTransition
            unitid="inputpassword"
            selected = {false}
            width= "300px"
            height= "45px"
            rounded= "md"
          >
            <Input
              background={'transparent'}
              border = '0px'
              h= '45px'
              type={'password'}
              placeholder='Enter password'
              boxShadow={''}
              rounded= 'md'
              ref= {passRef}
            />
          </InputTransition>
          <Button 
            w='120px'
            h='35px'
            mt= '15px'
            onClick={onConfirm}
            background={'blue'}
          >
            Ok
          </Button>
        </Flex>
      </Box>
    </PageLayout>
  )
}