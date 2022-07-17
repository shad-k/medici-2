import React, { useState } from 'react';
import { useReward } from 'react-rewards';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import '../css/dropeditor.css';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import useWallet from '../hooks/useWallet';
import apiClient from '../utils/apiClient';
import { API_PATHS, CONFIG } from '../utils/config';
import { Contract, FormState, TemplateTier } from '../model/types';
import { claimsInit } from '../utils/web3';
import DrawerAccordions from '../components/dropEditor/DrawerAccordions';
import DrawerIcons from '../components/dropEditor/DrawerIcons';
import ProjectSelector from '../components/dropEditor/ProjectSelector';
import { ClaimPageRenderer } from '../pages/claimPage';
import { utils, BigNumber } from 'ethers';

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'auto',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  boxShadow: '2px 5px 4px 1px #000',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  zIndex: theme.zIndex.drawer,
}));

const formInitialState: FormState = {
  contract: '',
  artist: '',
  description: '',
  twitter: '',
  discord: '',
  email: '',
  primaryColor: '#1b1a1f',
  secondaryColor: '#1b1a1f',
  bgColor: '',
  fontFamily: '',
  tier: TemplateTier.FREE,
  chainid: '',
};

const DropEditor: React.FC<{}> = () => {
  const localenv = CONFIG.DEV;

  const { wallet, setChain, connect } = useWallet();
  const [contract, setContract] = useState<Contract>();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [claimCreationSuccess, setClaimCreationSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [expandedAccordion, setExpandedAccordion] = React.useState<string>('');
  const [formState, setFormState] = React.useState(formInitialState);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openDrawerAndExpandAccordion = (accordion: string) => {
    setExpandedAccordion(accordion);
    handleDrawerOpen();
  };

  const validateForm = (currentFormState: FormState) => {
    const {
      contract,
      artist,
      description,
      primaryColor,
      secondaryColor,
      fontFamily,
      tier,
    } = currentFormState;

    switch (tier) {
      case TemplateTier.LOW: {
        if (
          contract &&
          artist &&
          description &&
          primaryColor !== '' &&
          secondaryColor !== '' &&
          fontFamily &&
          tier
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
        break;
      }
      default: {
        if (
          contract &&
          primaryColor !== '' &&
          secondaryColor !== '' &&
          fontFamily &&
          tier
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      }
    }
  }

  const changeFormState = (key: string, value?: string) => {
    const newFormState = {
      ...formState,
      [key]: value,
    };
    setFormState(newFormState);
    validateForm(newFormState);
  };

  const changeProject = (contract: any) => {
    setContract(contract);
    changeFormState('contract', contract?.contractaddress);
  };

  const { reward } = useReward('claim-page-button', 'confetti', {
    elementCount: 200,
    elementSize: 10,
  });

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // useEffect(() => {
  //   if (showModal) {
  //     document.getElementById('modal-container')!.style.display = 'block'
  //   } else {
  //     document.getElementById('modal-container')!.style.display = 'none'
  //   }
  // }, [showModal])

  const readyToTransact = async (): Promise<boolean> => {
    if (!wallet) {
      await connect({
        autoSelect: { 
          label: 'Wallet Connect',
          disableModals: false
        }
      })
    }
    return setChain({ chainId: utils.hexValue(BigNumber.from(contract!.chainid)) });
  };

  const onConfirm = async () => {
    if (isFormValid && (await readyToTransact())) {
      handleOpen();
      const claimReady = await claimsInit(
        wallet,
        contract!.contractaddress,
        formState.tier as string
      );

      if (claimReady) {
        const {
          contract,
          artist,
          description,
          twitter,
          email,
          discord,
          primaryColor,
          secondaryColor,
          bgColor,
          fontFamily,
        } = formState;
        const params = {
          contract: contract,
          font: fontFamily,
          primarycolor: primaryColor,
          secondarycolor: secondaryColor,
          backgroundcolor: bgColor,
          artist: artist,
          description: description,
          email: email,
          twitter: twitter,
          discord: discord,
        };
        apiClient
          .post(API_PATHS.CLAIM_SETUP, params, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function (response) {
            console.log(response);
            setClaimCreationSuccess(true);
            reward();
          })
          .catch(function (error) {
            console.log(error);
            setClaimCreationSuccess(false);
          });
      }
    } else {
      alert('Missing some fields!');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ top: 64 }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <ChevronRightIcon
              sx={{ background: 'white', borderRadius: 100 }}
              color="primary"
            />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="h4"
            fontWeight={600}
            sx={{ flex: 1 }}
          >
            Launch Claim Site
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              fontSize: '12px',
              borderRadius: 4,
              color: (theme) => theme.palette.secondary.dark,
              borderColor: (theme) => theme.palette.secondary.dark,
            }}
            onClick={() => changeProject({})}
          >
            Change Contract
          </Button>
          <Tooltip
            title="Fill in all the details to launch the claim site"
            arrow
          >
            <span>
              <Button
                id="confirm-button"
                variant="contained"
                color="secondary"
                sx={{
                  px: 3,
                  ml: 2,
                  fontSize: '12px',
                  borderRadius: 4,
                  color: 'white',
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                  '&:disabled': {
                    color: (theme) => theme.palette.grey[600],
                    backgroundColor: (theme) => theme.palette.grey[800],
                    borderColor: (theme) => theme.palette.secondary.dark,
                  },
                }}
                onClick={onConfirm}
                disabled={!isFormValid}
              >
                Launch
              </Button>
            </span>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            top: '64px',
          },
          position: 'fixed',
        }}
      >
        <DrawerHeader onClick={handleDrawerClose}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {open ? (
          <DrawerAccordions
            expandedAccordion={expandedAccordion}
            changeFormState={changeFormState}
            formState={formState}
            setAccordion={(accordion) => setExpandedAccordion(accordion)}
          />
        ) : (
          <DrawerIcons
            openDrawerAndExpandAccordion={openDrawerAndExpandAccordion}
            formState={formState}
          />
        )}
      </Drawer>
      <Box sx={{ flexGrow: 1, paddingLeft: '70px', height: '100%' }}>
        <DrawerHeader />
        {!formState.contract && (
          <ProjectSelector
            selectProject={(contract) => changeProject(contract)}
          />
        )}
        <Box
          sx={{
            height: 'calc(100vh - 128px)',
          }}
        >
          <ClaimPageRenderer
            claim={formState}
            contractName={contract?.name}
            isPreview={true}
          />
        </Box>
      </Box>
      <Modal open={showModal} onClose={handleClose}>
        <div
          id="claim-modal"
          className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center"
        >
          {claimCreationSuccess ? (
            <h1 className="text-center text-2xl">Congratulations!</h1>
          ) : (
            <h1>Generating your claim page</h1>
          )}
          <br></br>
          {claimCreationSuccess && contract ? (
            <a href={'/page/' + contract.name}>
              <span
                id="claim-page-button"
                className="bg-medici-purple text-white  p-3 rounded-3xl w-2/5 min-w-[100px]"
              >
                Claim page
              </span>
            </a>
          ) : (
            <CircularProgress sx={{ color: '#B81CD4' }} />
          )}
        </div>
      </Modal>
    </Box>
  );
};

export default DropEditor;
