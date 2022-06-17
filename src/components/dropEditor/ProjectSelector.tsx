import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import useWallet from '../../hooks/useWallet'
import { Typography } from '@mui/material'
import ContractsMenu from '../ContractsMenu'

interface Props {
  selectProject: (input: any) => void
}

const ProjectSelector: React.FC<Props> = ({ selectProject }) => {
  const { wallet, connect } = useWallet()
  return (
    <Card
      sx={{
        background: 'rgba( 255, 255, 255, 0.4 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 5px )',
        borderRadius: 10,
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
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
          {wallet ? (
            <ContractsMenu
              masterAddress={wallet.accounts[0].address}
              selectProject={selectProject}
            />
          ) : (
            <Button
              onClick={() => connect({})}
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
