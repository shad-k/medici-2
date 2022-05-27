import React from 'react'
import FreeTier from '../components/templates/freetier'
import { Claim, TemplateTier } from '../model/types'
import { API_ENDPOINT, API_PATHS } from '../utils/config'

// TODO: remove
const mockData: Claim = {
  contract: '0x4EC52Aaf9311F80637C6Bfc32a3c02CA90b3c0bC',
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

  React.useEffect(() => {
    ;(async () => {
      const res = await fetch(`${API_ENDPOINT}${API_PATHS.CLAIM}`, {
        method: 'POST',
        body: JSON.stringify({
          artist: 'Sarah',
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
        setClaim(res.data)
      } else {
        // TODO:
        setClaim(mockData)
      }
    })()
  }, [])

  switch (tier) {
    case TemplateTier.FREE:
      return <FreeTier claim={mockData} />
    default:
      return null
  }
}

export default ClaimPage
