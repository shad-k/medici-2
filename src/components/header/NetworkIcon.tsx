import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useWallet from '../../hooks/useWallet';

import { MdSwapHoriz } from 'react-icons/md';
import { GET_CHAIN_BY_NAME, GOERLI, OPTIMISM } from '../../model/chains'

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
  const [switchingNetwork, setSwitchingNetwork] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  const { currentChain, setChain } = useWallet()
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (event: any) => {
    setAnchorEl(null);
    const selectedChain = GET_CHAIN_BY_NAME(event.target.textContent);;
    if (selectedChain) {
      console.log(selectedChain)
      setSwitchingNetwork(true)
      await setChain({ chainId: selectedChain.hexId })
      setSwitchingNetwork(false)
    }
  }

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
      { switchingNetwork ? (<div className="inline-flex gap-2"><MdSwapHoriz style={{height: '25px'}}/><h2 className="hidden md:block ml-2">Switching</h2></div>): <div className="inline-flex gap-2"><img src={currentChain?.icon} width="20px"/><h2 className="hidden md:block">{currentChain?.label}</h2></div> }
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
      <MenuItem onClick={event => handleSelect(event)} disableRipple>
      <div className="inline-flex gap-2">
      <img src={OPTIMISM.icon} width="20px"/>{OPTIMISM.label}
      </div>
      </MenuItem>
      <MenuItem onClick={event => handleSelect(event)} disableRipple>
      <div className="inline-flex gap-2">
      <img src={GOERLI.icon} width="20px"/>{GOERLI.label}
      </div>
      </MenuItem>
      {/* <MenuItem onClick={event => handleSelect(event)} disableRipple disabled={true}>
      <div className="inline-flex gap-2">
      <img src={POLYGON.icon} width="20px"/>{POLYGON.label}
      </div>
      </MenuItem> */}
      </StyledMenu>
    </div>
  );
}
export default NetworkIcon