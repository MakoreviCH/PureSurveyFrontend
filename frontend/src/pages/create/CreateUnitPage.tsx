import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputAdornment, Switch, TextField, Slider, Select, MenuItem, InputLabel } from '@mui/material';
import { getAppearances } from "../../utils/service/AppearanceService";
import { handleGetAppearancesResponse, handleCreateResponse } from "../../functions/handleApiResponseFunctions";
import { IUnitAppearanceResponse } from '../../interfaces/responses/IUnitAppearanceResponse';
import { addSurveyUnit } from "../../utils/service/SurveyUnitService";
import { useNavigate } from 'react-router';
import { ISurveyUnitRequest } from '../../interfaces/requests/ISurveyUnitRequest';

export default function CreateSurveyUnitPage() {
  const navigate = useNavigate();
  const [unitAppearances, setUnitAppearances] = useState<IUnitAppearanceResponse[]>([]);
  const [surveyUnit, setSurveyUnit] = useState<ISurveyUnitRequest>({
    name: "",
    oneSurveyTakePerDevice: 1,
    maximumSurveysPerDevice: 1,
    hideAfterNoSurveys: false,
    messageAfterNoSurveys: false,
    appearanceId: 0
  });

  useEffect(() => {
    getUnitAppearanceList();
  }, []);

  const getUnitAppearanceList = async () => {
    let response = await getAppearances();
    setUnitAppearances(handleGetAppearancesResponse(response));
  };

  const handleSaveClick = async (event: any) => {
    await addSurveyUnit(surveyUnit).then((response: any) => {
      if (handleCreateResponse(response) !== null) {
        console.log(response);
        navigate("/survey-unit");
      }
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setSurveyUnit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSliderChange = (name: string) => (event: any, value: number | number[]) => {
    setSurveyUnit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSwitchChange = (event: any) => {
    const { name, checked } = event.target;
    setSurveyUnit((prevState) => ({ ...prevState, [name]: checked }));
  };

  return (
    <Box sx={{ width: '40%', mb: 2, ml: '5%', mt: 2 }}>
      <FormControl sx={{ mt: 3 }} fullWidth>
        <TextField
          id="nameInput"
          label="Unit Name"
          name="name"
          value={surveyUnit.name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl sx={{ mt: 3 }} fullWidth>
        <Typography gutterBottom>One Survey Take Per Device</Typography>
        <Slider
          value={surveyUnit.oneSurveyTakePerDevice}
          onChange={handleSliderChange('oneSurveyTakePerDevice')}
          aria-labelledby="one-survey-take-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={30}
        />
      </FormControl>

      <FormControl sx={{ mt: 3 }} fullWidth>
        <Typography gutterBottom>Maximum Surveys Per Device</Typography>
        <Slider
          value={surveyUnit.maximumSurveysPerDevice}
          onChange={handleSliderChange('maximumSurveysPerDevice')}
          aria-labelledby="maximum-surveys-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={50}
        />
      </FormControl>

      <FormControl sx={{ mt: 3 }} fullWidth>
        <Typography component="div">Hide After No Surveys</Typography>
        <Switch
          checked={surveyUnit.hideAfterNoSurveys}
          onChange={handleSwitchChange}
          name="hideAfterNoSurveys"
        />
      </FormControl>

      <FormControl sx={{ mt: 3 }} fullWidth>
        <Typography component="div">Message After No Surveys</Typography>
        <Switch
          checked={surveyUnit.messageAfterNoSurveys}
          onChange={handleSwitchChange}
          name="messageAfterNoSurveys"
        />
      </FormControl>

      <FormControl sx={{ mt: 3 }} fullWidth>
        <InputLabel>Appearance</InputLabel>
        <Select
          name="appearanceId"
          value={surveyUnit.appearanceId}
          onChange={handleChange}
          label="Appearance"
        >
          {unitAppearances.map((appearance) => (
            <MenuItem key={appearance.id} value={appearance.id}>
              {appearance.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" onClick={() => navigate("/survey-unit")} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleSaveClick}>Save</Button>
      </Box>
    </Box>
  );
}
