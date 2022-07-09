import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import useWallet from '../../hooks/useWallet'
import { Typography } from '@mui/material'
import ContractsMenu from './ContractsMenu'
import Rocket from '../../rocket.png'

interface Props {
  selectProject: (input: any) => void
}

const ProjectSelector: React.FC<Props> = ({ selectProject }) => {
  const { wallet, connect, currentChain } = useWallet()
  return (
    <Card
      sx={{
        backgroundColor: "rgba(32,31,39,0.85)",
        backgroundImage: Rocket,
        boxShadow: '0 0px 25px 0 #8338EC',
        backdropFilter: 'blur (2px)',
        borderRadius: 10,
        width: '50%',
        mx: 'auto',
        position: 'fixed',
        zIndex: 2,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: 250,
      }}
    >
      <CardContent
        sx={{
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 8,
          height: '100%',
          transition: (theme) =>
            theme.transitions.create('all', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.complex,
            }),
        }}
      >
        <Typography variant="h6">
          {wallet
            ? 'Choose a project'
            : 'Connect wallet to start selecting a project'}
        </Typography>
        <CardActions>
          {(wallet && currentChain) ? (
            <ContractsMenu
              masterAddress={wallet.accounts[0].address}
              chainid={currentChain.id}
              selectProject={selectProject}
            />
          ) : (
            <Button
              onClick={() => connect({
                autoSelect: { 
                  label: 'Wallet Connect',
                  disableModals: false
                }
              })
            }
              sx={{ color: 'white', borderColor: 'white' }}
              variant="outlined"
            >
              Connect Wallet
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default ProjectSelector
