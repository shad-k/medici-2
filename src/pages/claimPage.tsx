import React from 'react'
import { useParams } from 'react-router-dom'

import FreeTier from '../components/templates/freetier'
import { Claim, TemplateTier } from '../model/types'
import { API_ENDPOINT, API_PATHS } from '../utils/config'

// TODO: remove
const mockData: Claim = {
  contract: '0x4B3f9c118e3840E9240778b27f411d5dbf839e9F',
  tier: TemplateTier.FREE,
  font: null,
  primarycolor: null,
  secondarycolor: null,
  backgroundcolor: null,
  artist: 'Sarah Meyohas',
  description: 'Good art',
  collection_email: null,
  collection_twitter: null,
  collection_discord: null,
}

const ClaimPage: React.FC<{}> = () => {
  const [claim, setClaim] = React.useState<Claim>()
  const { tier } = claim ?? {}

  const { name: contractName } = useParams()

  React.useEffect(() => {
    ;(async () => {
      const headers = new Headers()
      headers.set('Content-Type', 'application/json')
      const res = await fetch(`${API_ENDPOINT}${API_PATHS.CLAIM_FETCH}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contractName,
        }),
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
        setClaim(res[0])
      }
    })()
  }, [contractName])

  switch (tier) {
    case TemplateTier.FREE:
      return claim ? <FreeTier claim={claim} contractName={contractName as string} /> :
       <FreeTier claim={mockData} contractName={contractName as string} />
    case TemplateTier.LOW:
    return claim ? <FreeTier claim={claim} contractName={contractName as string} /> :
      <FreeTier claim={mockData} contractName={contractName as string} />
    default:
      return null
  }
}

export default ClaimPage
