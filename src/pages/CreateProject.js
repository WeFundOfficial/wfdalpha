import React, { useState, useRef } from 'react'
import { MsgExecuteContract, WasmAPI } from '@terra-money/terra.js'
import {
  Input,
  Box,
  Flex,
  HStack
} from '@chakra-ui/react'
import {
  ButtonBackTransition,
  ButtonTransition,
} from '../components/ImageTransition'
import { useStore } from '../store'
import Footer from '../components/Footer'
import { 
  EstimateSend, 
  CheckNetwork, 
  FetchData, 
  Sleep,
  isNull,
  getVal
} from '../components/Util'
import Notification from '../components/Notification'
import PageLayout from '../components/PageLayout'
import Payment from '../components/CreateProject/Payment'
import CustomInput from '../components/CreateProject/CustomInput'
import CustomTextarea from '../components/CreateProject/CustomTextarea'
import CustomNumberInput from '../components/CreateProject/CustomNumberInput'
import CustomSimpleNumberInput from '../components/CreateProject/CustomSimpleNumberInput'
import CustomSelect from '../components/CreateProject/CustomSelect'
import CustomEmailInput from '../components/CreateProject/CustomEmailInput'
import CustomUpload from '../components/CreateProject/CustomUpload'
import VestingInput from '../components/CreateProject/VestingInput'
import Website from '../components/CreateProject/Website'
import Milestones from '../components/CreateProject/Milestones'
import TeamMembers from '../components/CreateProject/TeamMembers'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
  useConnectedWallet =
    require('@terra-money/wallet-provider').useConnectedWallet
}

export default function CreateProject() {
  const { state, dispatch } = useStore()
  const [isUST, setIsUST] = useState(true)

  const [logo, setLogo] = useState('')
  const [whitepaper, setWhitepaper] = useState('')

  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ecosystem, setEcosystem] = useState('Terra')
  const [tokenName, setTokenName] = useState('')
  const [collectedAmount, setCollectedAmount] = useState('')

  const [teammemberDescription, setTeammemberDescription] = useState([''])
  const [teammemberLinkedin, setTeammemberLinkedin] = useState([''])
  const [teammemberRole, setTeammemberRole] = useState([''])

  const [priceSeed, setPriceSeed] = useState('')
  const [pricePresale, setPricePresale] = useState('')
  const [priceIDO, setPriceIDO] = useState('')
  const [amountSeed, setAmountSeed] = useState('')
  const [amountPresale, setAmountPresale] = useState('')
  const [amountIDO, setAmountIDO] = useState('')
  const [unlockSeed, setUnlockSeed] = useState('')
  const [monthSeed, setMonthSeed] = useState('')
  const [afterSeed, setAfterSeed] = useState('')
  const [unlockPresale, setUnlockPresale] = useState('')
  const [monthPresale, setMonthPresale] = useState('')
  const [afterPresale, setAfterPresale] = useState('')
  const [unlockIDO, setUnlockIDO] = useState('')
  const [monthIDO, setMonthIDO] = useState('')
  const [afterIDO, setAfterIDO] = useState('')

  const [country, setCountry] = useState('')
  const [cofounderName, setCofounderName] = useState('')
  const [signature, setSignature] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [serviceWefund, setServiceWefund] = useState(5)
  const [serviceCharity, setServiceCharity] = useState(0)
  const [website, setWebsite] = useState('')

  const [milestoneTitle, setMilestoneTitle] = useState([''])
  const [milestoneType, setMilestoneType] = useState([''])
  const [milestoneAmount, setMilestoneAmount] = useState([''])
  const [milestoneDescription, setMilestoneDescription] = useState([''])
  const [milestoneStartdate, setMilestoneStartdate] = useState([''])
  const [milestoneEnddate, setMilestoneEnddate] = useState([''])

  //---------------wallet connect-------------------------------------
  let connectedWallet = ''

  if (typeof document !== 'undefined') {
    connectedWallet = useConnectedWallet()
  }

  //----------init api, lcd-------------------------
  const api = new WasmAPI(state.lcd_client.apiRequester)

  //------------notification setting---------------------------------
  const notificationRef = useRef()

  //---------------create project---------------------------------
  const checkInvalidation = async () => {
    if(CheckNetwork(connectedWallet, notificationRef, state) == false)
      return false;
  
    let { projectData, communityData, configData } = await FetchData(
      api,
      notificationRef,
      state,
      dispatch,
    )

    if (communityData == '') {
      notificationRef.current.showNotification(
        'There are no community members!',
        'error',
        4000,
      )
      return false;
    }

    if (title.length == 0) {
      notificationRef.current.showNotification(
        'Please fill in project name!',
        'error',
        4000,
      )
      return false;
    }

    if (parseInt(collectedAmount) < 6) {
      notificationRef.current.showNotification(
        'Collected money must be at least 6 UST',
        'error',
        4000,
      )
      return false;
    }

    let total_release = 0
    for (let i = 0; i < milestoneTitle.length; i++) {
      if (milestoneTitle[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone title!',
          'error',
          4000,
        )
        return false;
      }
      if (milestoneStartdate[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone Start Date!',
          'error',
          4000,
        )
        return false;
      }
      if (milestoneEnddate[i] == '') {
        notificationRef.current.showNotification(
          'Please fill in milestone End Date!',
          'error',
          4000,
        )
        return false;
      }
      if (parseInt(milestoneAmount[i]) < 6) {
        notificationRef.current.showNotification(
          'Collected money must be at least 6 UST',
          'error',
          4000,
        )
        return false;
      }
      total_release += parseInt(milestoneAmount[i])
    }
    if (total_release != parseInt(collectedAmount)) {
      notificationRef.current.showNotification(
        'Milestone total amount must equal collected amount',
        'error',
        4000,
      )
      return false;
    }
    return true;
  }

  const createDocxTemplate = async () => {
    var formData = new FormData()
    formData.append('tokenName', tokenName);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('ecosystem', ecosystem);
    formData.append('priceSeed', priceSeed);
    formData.append('pricePresale', pricePresale);
    formData.append('priceIDO', priceIDO);
    formData.append('cofounderName', cofounderName);
    formData.append('country', country);
    formData.append('email', email);

    formData.append('file', signature);

    const requestOptions = {
      method: 'POST',
      body: formData,
    }

    let realSAFT = '', err = false;
    await fetch(state.request + '/docxtemplatemake', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        realSAFT = data.data
        notificationRef.current.showNotification(data.data + 'SAFT Success', 'success', 1000)
      })
      .catch((e) => {
        console.log('Error:' + e)
        notificationRef.current.showNotification('SAFT failed', 'error', 1000)
        err = true;
      })

    if(err) return '';
    return realSAFT;
  }

  const uploadWhitepaper = async () => {
    let realWhitepaper = ''
    if (!isNull(whitepaper) != '') {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('file', whitepaper)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadWhitepaper', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realWhitepaper = data.data;
          notificationRef.current.showNotification(
            'Whitepaper upload success',
            'success',
            1000,
          )
        })
        .catch((e) => {
          console.log('Error:' + e)
          notificationRef.current.showNotification(
            'Whitepaper upload failed',
            'error',
            1000,
          )
        })
    }
    return realWhitepaper;
  }

  const uploadLogo = async () => {
    //---------upload logo-------------------------------------------------
    let realLogo = ''
    if (logo != '') {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('file', logo)

      const requestOptions = {
        method: 'POST',
        body: formData,
      }

      await fetch(state.request + '/uploadLogo', requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realLogo = data.data
          notificationRef.current.showNotification(
            data.data + 'Logo upload success',
            'success',
            1000,
          )
        })
        .catch((e) => {
          console.log('Error:' + e)
          notificationRef.current.showNotification(
            'Logo upload failed',
            'error',
            1000,
          )
        })
    }
    return realLogo;
  }

  async function createProject() {
    if(await checkInvalidation() == false)
      return false;

    notificationRef.current.showNotification('Please wait', 'success', 10000)

    let realSAFT = await createDocxTemplate();
    if(realSAFT == '') 
      return false;

    let realWhitepaer = await uploadWhitepaper();
    let realLogo = await uploadLogo();
    //---------------execute contract----------------------------------

    let project_milestones = []
    for (let i = 0; i < milestoneTitle.length; i++) {
      let milestone = {
        milestone_step: `${i}`,
        milestone_name: milestoneTitle[i],
        milestone_description: getVal(milestoneDescription[i]),
        milestone_startdate: getVal(milestoneStartdate[i]),
        milestone_enddate: getVal(milestoneEnddate[i]),
        milestone_amount: getVal(milestoneAmount[i]),
        milestone_status: '0',
        milestone_votes: [],
      }
      project_milestones.push(milestone)
    }

    const dt = new Date()
    const [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()]
    const createdate = day + '/' + ((month + 1) % 12) + '/' + year

    let AddProjectMsg = {
      add_project: {
        creator_wallet: connectedWallet.walletAddress,
        project_company: company,
        project_title: title,
        project_description: description,
        project_collected: collectedAmount,
        project_ecosystem: ecosystem,
        project_createddate: createdate,
        project_saft: realSAFT,
        project_logo: realLogo,
        project_whitepaper: realWhitepaer,
        project_website: website,
        project_email: email,
        project_milestones: project_milestones,
      },
    }

    let wefundContractAddress = state.WEFundContractAddress

    let msg = new MsgExecuteContract(
      connectedWallet.walletAddress,
      wefundContractAddress,
      AddProjectMsg,
    )
    await EstimateSend(
      connectedWallet,
      state.lcd_client,
      msg,
      'Create Project success',
      notificationRef,
    )
    await Sleep(2000)
    await FetchData(api, notificationRef, state, dispatch, true)
  }

  return (
    <PageLayout title="Create Your Project" subTitle1="Create a" subTitle2="New Project">
      <Flex width="100%" justify="center" mb={'150px'} zIndex={'1'} mt = '-30px'>
        <Box
          w = '900px'
          background = 'rgba(255, 255, 255, 0.05)'
          border = '1.5px solid rgba(255, 255, 255, 0.15)'
          borderTopColor =  'transparent'
          fontFamily = 'Sk-Modernist-Regular'
          paddingLeft = '50px'
          paddingRight = '50px'
          zIndex = '1'
        >
          <Payment isUST={isUST} setIsUST={setIsUST}/>
          <CustomInput
            typeText = "Company Name"
            type={company} 
            setType={setCompany} 
          />
          <CustomInput
            typeText = "Project Title"
            type={title} 
            setType={setTitle} 
          />
          <TeamMembers
            description = {teammemberDescription}
            setDescription = {setTeammemberDescription}
            role = {teammemberRole}
            setRole = {setTeammemberRole}
            linkedin = {teammemberLinkedin}
            setLinedin = {setTeammemberLinkedin}
          />
          <Flex direction="row">
            <CustomNumberInput
              typeText = "Amount Required"
              type = {collectedAmount}
              setType = {setCollectedAmount}
              notificationRef={notificationRef}
              style = {{width: '30%'}}
            />
            <CustomSelect
              typeText = "Blockchain"
              type = {ecosystem}
              setType = {setEcosystem}
              options = {['Terra', 'Ethereum', 'BSC', 'Harmony', 'Solana']}
              style = {{width: '30%', marginLeft: "30px"}}
            />
            <CustomInput
              typeText = "Token Name"
              type={tokenName} 
              setType={setTokenName}
              style = {{width: '30%', marginLeft: "30px"}}
            />
          </Flex>
          
          <Flex direction="row">
            <CustomSimpleNumberInput
              typeText = "Price set at Seed Sale"
              type={priceSeed} 
              setType={setPriceSeed}
              notificationRef={notificationRef}
              style={{width:'50%'}}
            />
            <CustomSimpleNumberInput
              typeText = "Token Amount at Seed Sale"
              type={amountSeed} 
              setType={setAmountSeed}
              notificationRef={notificationRef}
              style={{width:'50%', marginLeft: "30px"}}
            />
          </Flex>
          <VestingInput
            unlock={unlockSeed}
            setUnlock={setUnlockSeed}
            month={monthSeed}
            setMonth={setMonthSeed}
            after={afterSeed}
            setAfter={setAfterSeed}
          />
          
          <Flex direction='row'>
            <CustomSimpleNumberInput
              typeText = "Price set at Presale"
              type={pricePresale} 
              setType={setPricePresale}
              notificationRef={notificationRef}
              style={{width:'50%'}}
            />
            <CustomSimpleNumberInput
              typeText = "Token Amount at Presale"
              type={amountPresale} 
              setType={setAmountPresale}
              notificationRef={notificationRef}
              style={{width:'50%', marginLeft: "30px"}}
            />
          </Flex>
          <VestingInput
            unlock={unlockPresale}
            setUnlock={setUnlockPresale}
            month={monthPresale}
            setMonth={setMonthPresale}
            after={afterPresale}
            setAfter={setAfterPresale}
          />
          <Flex direction="row">
            <CustomSimpleNumberInput
              typeText = "Price set at IDO"
              type={priceIDO} 
              setType={setPriceIDO}
              notificationRef={notificationRef}
              style={{width:'50%'}}
            />
            <CustomSimpleNumberInput
              typeText = "Token Amount at IDO"
              type={amountIDO} 
              setType={setAmountIDO}
              notificationRef={notificationRef}
              style={{width:'50%', marginLeft: "30px"}}
            />
          </Flex>
          <VestingInput
            unlock={unlockIDO}
            setUnlock={setUnlockIDO}
            month={monthIDO}
            setMonth={setMonthIDO}
            after={afterIDO}
            setAfter={setAfterIDO}
          />
          <Flex direction="row">
            <CustomInput
              typeText = "Country"
              type={country} 
              setType={setCountry}
              style={{width:'50%'}} 
            />
            <CustomInput
              typeText = "Founder Name"
              type={cofounderName} 
              setType={setCofounderName}
              style={{width:'50%', marginLeft:'30px'}} 
            />
          </Flex>
          <Flex direction="row">
            <CustomInput
              typeText = "Address"
              type={address} 
              setType={setAddress}
              style={{width:'50%'}}
            />
            <CustomEmailInput
              typeText = "Email"
              type = {email}
              setType = {setEmail}
              style={{width:'50%', marginLeft:'30px'}}
            />
          </Flex>
          <Flex direction="row">
            <CustomSimpleNumberInput
              typeText = "% for WeFund Service"
              type = {serviceWefund}
              setType = {setServiceWefund}
              style = {{width:'50%'}}
            />
            <CustomSimpleNumberInput
              typeText = '% for Charity'
              type = {serviceCharity}
              setType= {setServiceCharity}
              style = {{width:'50%', marginLeft:'30px'}}
            />
          </Flex>
          <Flex direction='row'>
            <CustomUpload
              typeText = 'Signature'
              type = {signature}
              setType = {setSignature}
              style = {{width:'50%'}}
            />
            <CustomUpload
              typeText = 'Whitepaper'
              type = {whitepaper}
              setType = {setWhitepaper}
              style = {{width:'50%', marginLeft:'30px'}}
            />
          </Flex>
          <Website
            typeText = "Project website"
            type = {website}
            setType = {setWebsite}
          />
          <Milestones
            milestoneTitle = {milestoneTitle}
            setMilestoneTitle = {setMilestoneTitle}
            milestoneType = {milestoneType}
            setMilestoneType = {setMilestoneType}
            milestoneAmount = {milestoneAmount}
            setMilestoneAmount = {setMilestoneAmount}
            milestoneDescription = {milestoneDescription}
            setMilestoneDescription = {setMilestoneDescription}
            milestoneStartdate = {milestoneStartdate}
            setMilestoneStartdate = {setMilestoneStartdate}
            milestoneEnddate = {milestoneEnddate}
            setMilestoneEnddate = {setMilestoneEnddate}
            notificationRef={notificationRef}
          />
          
          <Flex w="100%" mt="30px" justify="center" mb="30px">
            <ButtonTransition
              unitid="submit"
              selected={false}
              width="400px"
              height="50px"
              rounded="33px"
            >
              <Box
                variant="solid"
                color="white"
                justify="center"
                align="center"
                onClick={() => createProject()}
              >
                Submit
              </Box>
            </ButtonTransition>
          </Flex>
        </Box>
      </Flex>
      <Footer />
      <Notification ref={notificationRef}/>
    </PageLayout>
  )
}
