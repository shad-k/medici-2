import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FontPicker from 'font-picker-react';
import { ColorPicker } from 'material-ui-color';

import { Accordions, FormState, TemplateTier } from '../../model/types';

interface Props {
  expandedAccordion: string;
  formState: FormState;
  changeFormState: (key: string, value: any) => void;
  setAccordion: (accordion: string) => void;
}

const DrawerAccordions: React.FC<Props> = ({
  expandedAccordion,
  formState,
  changeFormState,
  setAccordion,
}) => {
    switch(formState.tier) {
    case TemplateTier.LOW:
    return (
      <Box>
        <Accordion expanded={expandedAccordion === Accordions.DETAIL}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.DETAIL ? '' : Accordions.DETAIL
              )
            }
          >
            Details
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <TextField
                id="input-artist"
                label="Artist"
                variant="outlined"
                onChange={(event) =>
                  changeFormState('artist', event.target.value)
                }
                value={formState.artist}
                sx={{
                  width: '100%',
                }}
              />
            </div>
            <div>
              <TextField
                id="input-description"
                label="Description"
                multiline
                onChange={(event) =>
                  changeFormState('description', event.target.value)
                }
                rows={10}
                value={formState.description}
                sx={{
                  width: '100%',
                  mt: 2,
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.SOCIAL}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.SOCIAL ? '' : Accordions.SOCIAL
              )
            }
          >
            Social Links
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <TextField
                id="input-twitter"
                label="Twitter"
                type="text"
                onChange={(event) =>
                  changeFormState('twitter', event.target.value)
                }
                value={formState.twitter}
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="input-discord"
                label="Discord"
                type="text"
                onChange={(event) =>
                  changeFormState('discord', event.target.value)
                }
                value={formState.discord}
                sx={{
                  width: '100%',
                  my: 2,
                }}
              />
              <TextField
                id="input-email"
                label="Email"
                type="email"
                onChange={(event) => changeFormState('email', event.target.value)}
                value={formState.email}
                sx={{
                  width: '100%',
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.FONT}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.FONT ? '' : Accordions.FONT
              )
            }
          >
            Font
          </AccordionSummary>
          <AccordionDetails>
            {/* @ts-expect-error */}
            <FontPicker
              apiKey={process.env.REACT_APP_GOOGLE_FONTS_API_KEY!}
              activeFontFamily={formState.fontFamily}
              onChange={(nextFont: any) =>
                changeFormState('fontFamily', nextFont.family)
              }
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.TIER}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.TIER ? '' : Accordions.TIER
              )
            }
          >
            Claim Tier
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                value={formState.tier}
                name="claim-tier"
                id="tier-select"
                onChange={(event) => changeFormState('tier', event.target.value)}
              >
                <FormControlLabel value="free" control={<Radio />} label="Free" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="mid"
                  control={<Radio />}
                  label="Mid (coming soon!)"
                  disabled
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High (coming soon!)"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.COLORS}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.COLORS ? '' : Accordions.COLORS
              )
            }
          >
            Colors
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <div id="primary-color-picker">
                <label htmlFor="primary-color-picker" className="block">
                  Primary Color
                </label>
                <ColorPicker
                  value={formState.primaryColor}
                  onChange={(event) =>
                    changeFormState('primaryColor', `#${event.hex}`)
                  }
                />
              </div>
              <div id="secondary-color-picker">
                <label htmlFor="secondary-color-picker" className="block">
                  Secondary Color
                </label>
                <ColorPicker
                  value={formState.secondaryColor}
                  onChange={(event) =>
                    changeFormState('secondaryColor', `#${event.hex}`)
                  }
                />
              </div>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
    default:
      return (
      <Box>
        {/* <Accordion expanded={expandedAccordion === Accordions.DETAIL}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.DETAIL ? '' : Accordions.DETAIL
              )
            }
          >
            Details
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <TextField
                id="input-artist"
                label="Artist"
                variant="outlined"
                onChange={(event) =>
                  changeFormState('artist', event.target.value)
                }
                value={formState.artist}
                sx={{
                  width: '100%',
                }}
              />
            </div>
            <div>
              <TextField
                id="input-description"
                label="Description"
                multiline
                onChange={(event) =>
                  changeFormState('description', event.target.value)
                }
                rows={10}
                value={formState.description}
                sx={{
                  width: '100%',
                  mt: 2,
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion> */}
        <Accordion expanded={expandedAccordion === Accordions.SOCIAL}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.SOCIAL ? '' : Accordions.SOCIAL
              )
            }
          >
            Social Links
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <TextField
                id="input-twitter"
                label="Twitter"
                type="text"
                onChange={(event) =>
                  changeFormState('twitter', event.target.value)
                }
                value={formState.twitter}
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                id="input-discord"
                label="Discord"
                type="text"
                onChange={(event) =>
                  changeFormState('discord', event.target.value)
                }
                value={formState.discord}
                sx={{
                  width: '100%',
                  my: 2,
                }}
              />
              <TextField
                id="input-email"
                label="Email"
                type="email"
                onChange={(event) => changeFormState('email', event.target.value)}
                value={formState.email}
                sx={{
                  width: '100%',
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.FONT}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.FONT ? '' : Accordions.FONT
              )
            }
          >
            Font
          </AccordionSummary>
          <AccordionDetails>
            {/* @ts-expect-error */}
            <FontPicker
              apiKey={process.env.REACT_APP_GOOGLE_FONTS_API_KEY!}
              activeFontFamily={formState.fontFamily}
              onChange={(nextFont: any) =>
                changeFormState('fontFamily', nextFont.family)
              }
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.TIER}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.TIER ? '' : Accordions.TIER
              )
            }
          >
            Claim Tier
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                value={formState.tier}
                name="claim-tier"
                id="tier-select"
                onChange={(event) => changeFormState('tier', event.target.value)}
              >
                <FormControlLabel value="free" control={<Radio />} label="Free" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="mid"
                  control={<Radio />}
                  label="Mid (coming soon!)"
                  disabled
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High (coming soon!)"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedAccordion === Accordions.COLORS}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() =>
              setAccordion(
                expandedAccordion === Accordions.COLORS ? '' : Accordions.COLORS
              )
            }
          >
            Colors
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <div id="primary-color-picker">
                <label htmlFor="primary-color-picker" className="block">
                  Primary Color
                </label>
                <ColorPicker
                  value={formState.primaryColor}
                  onChange={(event) =>
                    changeFormState('primaryColor', `#${event.hex}`)
                  }
                />
              </div>
              {/* <div id="secondary-color-picker">
                <label htmlFor="secondary-color-picker" className="block">
                  Secondary Color
                </label>
                <ColorPicker
                  value={formState.secondaryColor}
                  onChange={(event) =>
                    changeFormState('secondaryColor', `#${event.hex}`)
                  }
                />
              </div> */}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
};

export default DrawerAccordions;
