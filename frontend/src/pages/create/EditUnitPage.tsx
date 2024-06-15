import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputAdornment, Switch, TextField, Slider, Select, MenuItem, InputLabel, OutlinedInput, ListItemText, Checkbox } from '@mui/material';
import { getAppearances } from "../../utils/service/AppearanceService";
import { handleGetAppearancesResponse, handleCreateResponse, handleGetUnitResponse } from "../../functions/handleApiResponseFunctions";
import { IUnitAppearanceResponse } from '../../interfaces/responses/IUnitAppearanceResponse';
import { editSurveyUnit, getSurveyUnit } from "../../utils/service/SurveyUnitService";
import { useNavigate, useParams } from 'react-router';
import { ISurveyUnitRequest, ISurveyUnitEditRequest } from '../../interfaces/requests/ISurveyUnitRequest';
import { ISurveyResponse } from '../../interfaces/responses/ISurveyResponse';
import { handleGetSurveysResponse } from '../../functions/handleApiResponseFunctions';
import { getSurveys } from '../../utils/service/SurveyService';

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

export default function EditSurveyUnitPage() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [unitAppearances, setUnitAppearances] = useState<IUnitAppearanceResponse[]>([]);
  const [availableSurveys, setAvailableSurveys] = useState<ISurveyResponse[]>([]);
  const [surveyUnit, setSurveyUnit] = useState<ISurveyUnitEditRequest>({
    id: 0, 
    name: "",
    oneSurveyTakePerDevice: 1,
    maximumSurveysPerDevice: 1,
    hideAfterNoSurveys: false,
    messageAfterNoSurveys: false,
    appearanceId: 0,
    surveyIds: []
  });

  useEffect(() => {
    getUnitAppearanceList();
    getAvailableSurveys();
    if (unitId) {
        getSurveyUnitById(parseInt(unitId));
      }
    }, [unitId]);

  const getUnitAppearanceList = async () => {
    let response = await getAppearances();
    setUnitAppearances(handleGetAppearancesResponse(response));
  };

  const getAvailableSurveys = async () => {
    let response = await getSurveys();
    setAvailableSurveys(handleGetSurveysResponse(response));
  };

  const getSurveyUnitById = async (id: number) => {
    let response = await getSurveyUnit(id);
    let data = handleGetUnitResponse(response);
    if (data) {
        
        const appearanceId = parseInt(Object.keys(data.appearanceIdName)[0] || '0');
      setSurveyUnit({
        id:data.id,
        name: data.name,
        oneSurveyTakePerDevice: data.oneSurveyTakePerDevice,
        maximumSurveysPerDevice: data.maximumSurveysPerDevice,
        hideAfterNoSurveys: data.hideAfterNoSurveys,
        messageAfterNoSurveys: data.messageAfterNoSurveys,
        appearanceId: appearanceId,
        surveyIds: Object.keys(data.surveyIdNames).map(Number)
      });
    }
  };

  const handleSaveClick = async (event: any) => {
    if (unitId) {
      await editSurveyUnit( surveyUnit).then((response: any) => {
        if (handleCreateResponse(response) !== null) {
          navigate("/survey-unit");
        }
      });
    }
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

      <FormControl sx={{ mt: 3 }} fullWidth>
        <InputLabel id="survey-select-label">Surveys</InputLabel>
        <Select
          labelId="survey-select-label"
          id="survey-select"
          multiple
          value={surveyUnit.surveyIds} 
          onChange={handleChange}
          input={<OutlinedInput label="Surveys" />}
          renderValue={(selected) => {
            const selectedSurveyNames = (selected as number[]).map(selectedId => {
              const foundSurvey = availableSurveys.find(survey => survey.id === selectedId);
              return foundSurvey ? foundSurvey.name : ''; 
            });
            return selectedSurveyNames.join(', ');
          }}
          MenuProps={MenuProps}
          name="surveyIds" 
        >
          {availableSurveys.map((survey) => (
            <MenuItem key={survey.id} value={survey.id}>
              <Checkbox checked={surveyUnit.surveyIds.includes(survey.id)} />
              <ListItemText primary={survey.name} />
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