import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth } from '../utils/AuthContext'
import styled from 'styled-components'



const StyledMenuItem = styled(MenuItem)`
  display:block;
`

export default function BasicSelect({index}) {

  const { players, setPlayers, availability, setAvailability } = useAuth()
  
  const colorOptions = ['#f6e58d', '#7ed6df', '#ff7979', '#badc58']
  const colors = ['yellow','blue','red','green']

  const handleChange = (e,index) => {
    const oldColor = players[index]
    const newAvailability = availability.map(x=>x)
    if (oldColor !== '') {
      newAvailability[colorOptions.indexOf(oldColor)] = 1
    }
    newAvailability[colorOptions.indexOf(e.target.value)] = 0
    setAvailability(newAvailability)

    const newPlayers = players.map(x=>x)
    newPlayers[index] = e.target.value
    setPlayers(newPlayers)
  };


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="color"
          value={players[index]}
          onChange={(e)=>handleChange(e,index)}
        >
          <StyledMenuItem value={'#f6e58d'} disabled={!availability[0]}>yellow</StyledMenuItem>
          <StyledMenuItem value={'#7ed6df'} disabled={!availability[1]}>blue</StyledMenuItem>
          <StyledMenuItem value={'#ff7979'} disabled={!availability[2]}>red</StyledMenuItem>
          <StyledMenuItem value={'#badc58'} disabled={!availability[3]}>green</StyledMenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}