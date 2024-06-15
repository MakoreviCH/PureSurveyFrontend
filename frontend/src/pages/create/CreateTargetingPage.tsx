import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Chip, FormControl, FormGroup, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent } from '@mui/material';
import { addTargeting, getCountries } from '../../utils/service/TargetingService';
import { handleCreateResponse, handleGetCountriesResponse } from '../../functions/handleApiResponseFunctions';
import { ICountryResponse } from '../../interfaces/responses/ITargetingResponse';
import { useNavigate } from 'react-router';
import { ITargetingRequest } from '../../interfaces/requests/ITargetingRequest';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateTargetingPage() {
  const [targeting, setTargeting] = useState<ITargetingRequest>({name:'', countriesIds:[], surveyIds:[]});
  const [countries, setCountries] = useState<ICountryResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
      let response = await getCountries();
      let countriesList = handleGetCountriesResponse(response);
      setCountries(countriesList);
  };

  const handleSaveClick = async () => {
    await addTargeting(targeting).then((response: any) => {
        if (handleCreateResponse(response) !== null) {
          console.log(response);
          navigate("/survey-unit");
        }
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTargeting((prevState) => ({ ...prevState, [name]: value }));
  };



  return (
    <Box sx={{ width: '40%', mb: 2, ml: '5%', mt: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Create Targeting
        </Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <TextField
            id="nameInput"
            label="Targeting Name"
            name="name"
            value={targeting.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl sx={{ mt:3, width: 300 }}>
        <InputLabel id="countries-label">Countries</InputLabel>
        <Select
          labelId="countries-label"
          id="countries"
          name="countriesIds"
          multiple
          value={targeting.countriesIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Countries" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={countries.find((country) => country.id === value)?.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {countries.map((country) => (
            <MenuItem
              key={country.id}
              value={country.id}
            >
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Save
          </Button>
        </Box>
    </Box>
  );
}