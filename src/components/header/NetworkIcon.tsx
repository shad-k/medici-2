import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/material';
import useWallet from '../../hooks/useWallet';

import Ethereum from '../svgComponents/Ethereum';
import Optimism from '../svgComponents/Optimism';
import { BsExclamationTriangle } from 'react-icons/bs'
import { MdSwapHoriz } from 'react-icons/md';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'white' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
      backgroundColor: "#000000",
    },
    '& .MuiMenuItem-root': {
      backgroundColor: "#000000",
      '&:hover': {
        backgroundColor: '#6618E4',
    }},
  },
}));

const NetworkIcon: React.FC<{}> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currChainLabel, setCurrChainLabel] = React.useState<string>();
  const [switchingNetwork, setSwitchingNetwork] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("handle click")
  };

  const handleClose = async (chainId: string) => {
    setAnchorEl(null);
    if (chainId === "0xa" || chainId === "0x5") {
      setSwitchingNetwork(true)
      await setChain({ chainId: chainId })
      setSwitchingNetwork(false)
    }
  };
  
  const { wallet, connecting, connectedChain, connect, setChain } = useWallet()
  const connectedWallet = wallet?.accounts[0]

  React.useEffect(() => {
    if (connectedWallet && connectedChain) {
      if (connectedChain?.id === '0xa') {
        setCurrChainLabel("Optimism");
        document.getElementById("invalid-icon")!.style.display = 'none';
        document.getElementById("eth-icon")!.style.display = 'none';
        document.getElementById("optimism-icon")!.style.display = 'block';
      } else if (connectedChain?.id === '0x5') {
        setCurrChainLabel("Goerli");
        document.getElementById("invalid-icon")!.style.display = 'none';
        document.getElementById("eth-icon")!.style.display = 'block';
        document.getElementById("optimism-icon")!.style.display = 'none';
      } else {
        setCurrChainLabel("Unsupported Network");
        document.getElementById("invalid-icon")!.style.display = 'block';
        document.getElementById("eth-icon")!.style.display = 'none';
        document.getElementById("optimism-icon")!.style.display = 'none';
      }
    }
  }, [connectedChain])
  
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          marginTop: '3px',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem'/* 20px */,
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: 'light',
          lineHeight: '1.25rem',
          '&:hover': {
            color: '#6618E4',
            backgroundColor: 'black',
          },}}
      >
      <div id="optimism-icon">
      { switchingNetwork ? <MdSwapHoriz style={{height: '25px'}}/> : <Optimism/> }
      </div>
      <div id="eth-icon">
      { switchingNetwork ? <MdSwapHoriz style={{height: '25px'}}/> : <Ethereum/>}
      </div>
      <div id="invalid-icon">
      { switchingNetwork ? <MdSwapHoriz style={{height: '25px'}}/> : <BsExclamationTriangle style={{height: '23px', marginRight: '5px'}}/> }
      </div>
      { switchingNetwork ? <h2 className="hidden md:block ml-2">Switching</h2> : <h2 className="hidden md:block ml-2">{currChainLabel} </h2> }
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
      <MenuItem onClick={event => handleClose("0xa")} disableRipple>
      <Optimism/> <p className="ml-1">Optimism</p>
      </MenuItem>
      <MenuItem onClick={event => handleClose("0x5")} disableRipple>
      <Ethereum/> <p className="ml-1">Goerli</p>
      </MenuItem>
      </StyledMenu>
    </div>
  );
}
export default NetworkIcon