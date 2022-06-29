import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'

import FreeTier from '../components/templates/freetier'
import { Claim, TemplateTier } from '../model/types'
import { API_ENDPOINT, API_PATHS } from '../utils/config'

// TODO: remove
const mockData: Claim = {
  contract: '0x4B3f9c118e3840E9240778b27f411d5dbf839e9F',
  tier: TemplateTier.FREE,
  fontFamily: null,
  primaryColor: null,
  secondaryColor: null,
  bgColor: null,
  artist: 'Sarah Meyohas',
  description: 'Good art',
  email: null,
  twitter: null,
  discord: null,
}

export const ClaimPageRenderer: React.FC<{
  claim: Claim
  contractName?: string
}> = ({ claim, contractName }) => {
  switch (claim.tier) {
    case TemplateTier.LOW:
      return <FreeTier claim={claim} contractName={contractName} />
    default:
      return <FreeTier claim={claim} contractName={contractName} />
  }
}

const ClaimPage: React.FC<{}> = () => {
  const [claim, setClaim] = React.useState<Claim>()

  const { name: contractName } = useParams()

  React.useEffect(() => {
    ;(async () => {
      const params = new URLSearchParams({
        collection: contractName!
      })
      const headers = new Headers()
      headers.set('Content-Type', 'application/json')
      const res = await fetch(`${API_ENDPOINT}${API_PATHS.CLAIM_FETCH}?` + params, {
        method: 'GET',
        headers,
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      if (res) {
        console.log(res)
        const {
          artist,
          description,
          backgroundcolor,
          collection_discord,
          collection_twitter,
          collection_email,
          contract,
          font,
          primarycolor,
          secondarycolor,
          tier,
        } = res[0]
        setClaim({
          artist,
          bgColor: backgroundcolor,
          discord: collection_discord,
          email: collection_email,
          twitter: collection_twitter,
          contract,
          description,
          fontFamily: font,
          primaryColor: primarycolor,
          secondaryColor: secondarycolor,
          tier,
        })
      }
    })()
  }, [contractName])
  if (!claim) {
    return null
  }
  return (
    <Box sx={{ height: '100vh', marginTop: '-64px' }}>
      <ClaimPageRenderer claim={claim} contractName={contractName as string} />
    </Box>
  )
}

export default ClaimPage
