import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useWallet from '../../hooks/useWallet';

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

const WalletMenu: React.FC<{}> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (chainId: string) => {
    setAnchorEl(null);
  };
  
  const { wallet, disconnect } = useWallet()
  const connectedWallet = wallet?.accounts[0]


  const onDisconnect = async () => {
    if (wallet) {
      await disconnect({label: wallet!.label});
      window.localStorage.removeItem('connectedWallets');
    }
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        className="px-5 py-2"
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
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: 'light',
          lineHeight: '1.25rem',
          '&:hover': {
            color: '#6618E4',
            backgroundColor: 'black',
          },}}
      >
        {connectedWallet?.ens?.name ??
          `${connectedWallet?.address.slice(
            0,
            6
          )}...${connectedWallet?.address.slice(-6)}`}
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
      <MenuItem onClick={event => onDisconnect()} disableRipple>
      Disconnect Wallet
      </MenuItem>
      </StyledMenu>
    </div>
  );
}
export default WalletMenu