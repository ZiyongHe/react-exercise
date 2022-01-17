import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ColorContext from '../utils/ColorContext';

export default function BasicSelect({index, card}) {

  const { players, setPlayers, availability, setAvailability } = React.useContext(ColorContext)
  
  const colorOptions = ['#f6e58d', '#7ed6df', '#ff7979', '#badc58']
  const colors = ['yellow','blue','red','green']

  const handleChange = (e,index,card) => {
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
    card.current.style.background = e.target.value
    console.log(Object.values(players)[indexedDB])
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="color"
          onChange={(e)=>handleChange(e,index,card)}
        >
          <MenuItem value={'#f6e58d'} disabled={!availability[0]}>yellow</MenuItem>
          <MenuItem value={'#7ed6df'} disabled={!availability[1]}>blue</MenuItem>
          <MenuItem value={'#ff7979'} disabled={!availability[2]}>red</MenuItem>
          <MenuItem value={'#badc58'} disabled={!availability[3]}>green</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}