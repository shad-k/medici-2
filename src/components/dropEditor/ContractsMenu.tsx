import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { Contract } from '../../model/types'
import useAllLaunchedContracts from '../../hooks/useAllLaunchedContracts'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const ContractsMenu: React.FC<{
  masterAddress: string
  connectedChain: string
  selectProject: (input: any) => void
}> = ({ masterAddress, connectedChain, selectProject }) => {
  const { data: contracts, error } = useAllLaunchedContracts(masterAddress, connectedChain)

  if (!contracts && !error) {
    return null
  }

  if (!contracts) {
    return null
  }

  const onSelectOption = async (contractIndex: string) => {
    const selected = contracts[parseInt(contractIndex) - 1]
    selectProject(selected)
  }

  return (
    <div className="w-1/2 md:text-left flex flex-col my-2">
      <FormControl sx={{m: 1, width: 300}}>
        <InputLabel id="contract-name" sx={{color: 'white', '&.Mui-focused': { color: 'white'}}}>Project Name</InputLabel>
        <Select
          labelId="contract-name"
          id="contract"
          onChange={(event) => onSelectOption(event.target.value)}
          input={<OutlinedInput label="Contract name"/>}
          MenuProps={MenuProps}
          defaultValue={''}
          sx={{ 
          "& .MuiSvgIcon-root": {
            color: "white",
          }}}
        >
          {contracts.map((contract: Contract, i) => (
            <MenuItem value={i + 1} key={contract.name}>
              {contract.name} ({contract.symbol})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ContractsMenu
