import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useWallet from '../hooks/useWallet';

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
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setChain({ chainId: '0xA' })
  };
  
  const { wallet, connecting, connectedChain, connect, setChain } = useWallet()
  const connectedWallet = wallet?.accounts[0]

  React.useEffect(() => {
    if (connectedWallet){
      if (connectedChain?.id === '0xA') {
        setCurrChainLabel("Optimism");
      } else if (connectedChain?.id === '0x5') {
        setCurrChainLabel("Goerli");
      } else {
        return;
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
          borderRadius: '20px',
          '&:hover': {
            color: '#6618E4',
            backgroundColor: 'black',
          },}}
      >
      {currChainLabel}
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
      <MenuItem onClick={handleClose} disabled={true} disableRipple>
        Optimism (coming soon!)
      </MenuItem>
      <MenuItem onClick={handleClose} disableRipple>
        Goerli
      </MenuItem>
      </StyledMenu>
    </div>
  );
}
export default NetworkIcon