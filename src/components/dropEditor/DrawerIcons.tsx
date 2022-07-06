import React from 'react'
import TitleIcon from '@mui/icons-material/Title'
import LanguageIcon from '@mui/icons-material/Language'
import FontDownloadIcon from '@mui/icons-material/FontDownload'
import ArticleIcon from '@mui/icons-material/Article'
import PaletteIcon from '@mui/icons-material/Palette'
import IconButton from '@mui/material/IconButton'
import { Accordions, FormState, TemplateTier } from '../../model/types'

interface Props {
  openDrawerAndExpandAccordion: (accordion: string) => void
  formState: FormState
}

const DrawerIcons: React.FC<Props> = ({ openDrawerAndExpandAccordion, formState }) => {
  switch (formState.tier) {
  case TemplateTier.LOW:
    return (
    <>
      <IconButton
        sx={{
          borderRadius: 1,
          minWidth: 0,
          width: '80%',
          mx: 'auto',
          my: 4,
        }}
        onClick={() => openDrawerAndExpandAccordion(Accordions.DETAIL)}
      >
        <TitleIcon />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 1,
          minWidth: 0,
          width: '80%',
          mx: 'auto',
          my: 4,
        }}
        onClick={() => openDrawerAndExpandAccordion(Accordions.SOCIAL)}
      >
        <LanguageIcon />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 1,
          minWidth: 0,
          width: '80%',
          mx: 'auto',
          my: 4,
        }}
        onClick={() => openDrawerAndExpandAccordion(Accordions.FONT)}
      >
        <FontDownloadIcon />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 1,
          minWidth: 0,
          width: '80%',
          mx: 'auto',
          my: 4,
        }}
        onClick={() => openDrawerAndExpandAccordion(Accordions.TIER)}
      >
        <ArticleIcon />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: 1,
          minWidth: 0,
          width: '80%',
          mx: 'auto',
          my: 4,
        }}
        onClick={() => openDrawerAndExpandAccordion(Accordions.COLORS)}
      >
        <PaletteIcon />
      </IconButton>
    </>
  );

  default: 
    return (
      <>
        <IconButton
          sx={{
            borderRadius: 1,
            minWidth: 0,
            width: '80%',
            mx: 'auto',
            my: 4,
          }}
          onClick={() => openDrawerAndExpandAccordion(Accordions.SOCIAL)}
        >
          <LanguageIcon />
        </IconButton>
        <IconButton
          sx={{
            borderRadius: 1,
            minWidth: 0,
            width: '80%',
            mx: 'auto',
            my: 4,
          }}
          onClick={() => openDrawerAndExpandAccordion(Accordions.FONT)}
        >
          <FontDownloadIcon />
        </IconButton>
        <IconButton
          sx={{
            borderRadius: 1,
            minWidth: 0,
            width: '80%',
            mx: 'auto',
            my: 4,
          }}
          onClick={() => openDrawerAndExpandAccordion(Accordions.TIER)}
        >
          <ArticleIcon />
        </IconButton>
        <IconButton
          sx={{
            borderRadius: 1,
            minWidth: 0,
            width: '80%',
            mx: 'auto',
            my: 4,
          }}
          onClick={() => openDrawerAndExpandAccordion(Accordions.COLORS)}
        >
          <PaletteIcon />
        </IconButton>
      </>
    )
  }
}

export default DrawerIcons
