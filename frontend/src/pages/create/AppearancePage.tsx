import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputAdornment } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { handleCreateResponse, handleGetAppearancesResponse, handleGetTemplatesResponse } from "../../functions/handleApiResponseFunctions";
import { ITemplateResponse } from "../../interfaces/responses/ITemplateResponse";
import { addUnitAppearance, getSystemTemplates, getAppearances, editUnitAppearance } from "../../utils/service/AppearanceService";
import { SurveyUnitLocalizedStrings } from "../../functions/localizedStrings";
import { GeneralLocalizedStrings } from "../../functions/localizedStrings";
import TextField from '@mui/material/TextField';
import { MuiColorInput } from 'mui-color-input'
import { Param, ParamObject } from '../../interfaces/responses/IUnitAppearanceResponse';
import { IAppearanceEditRequest, IUnitAppearanceRequest } from '../../interfaces/requests/IUnitAppearanceRequest';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import LayersIcon from '@mui/icons-material/Layers';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import { useNavigate, useParams } from 'react-router';

const transformParams = (params: ParamObject): Param[] => {
  if (!params) return [];
  return Object.entries(params).map(([name, value]) => ({
    name,
    value
  }));
};

export default function AppearancePage() {
  const nav = useNavigate();
  const { appearanceId } = useParams();
  const [templates, setTemplates] = useState<ITemplateResponse[]>([]);
  const [appearance, setAppearance] = useState<IUnitAppearanceRequest | IAppearanceEditRequest>({ name: "", templateId: 0, type: "", params: {} });
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplateResponse>({ defaultParams: {}, name: "", id: 0, templateCode: "" });
  const [templateContent, setTemplateContent] = useState('');

  useEffect(() => {
    getTemplates();
  }, []);

  useEffect(() => {
    if(appearanceId)
      fetchAppearance(appearanceId);
  }, [appearanceId, templates]);


  const getTemplates = async () => {
    await getSystemTemplates().then((response)=>{
      setTemplates(handleGetTemplatesResponse(response));
    });
  }

  const fetchAppearance = async (id: string) => {
    await getAppearances().then((response) => { 
      const appearanceData  = handleGetAppearancesResponse(response).find((appearance: any) => appearance.id === parseInt(id));
      if(appearanceData){
        const foundTemplate = templates.find(template => template.id === +appearanceData.templateId) as ITemplateResponse;
          setSelectedTemplate(foundTemplate);
            if(foundTemplate)
            setTemplateContent(foundTemplate.templateCode);
          setAppearance({
            id:appearanceData.id,
            name: appearanceData.name,
            templateId: appearanceData.templateId,
            type: appearanceData.type,
            params: appearanceData.params
          });
          console.log(appearanceData);
    }
    });
  }

    const handleTemplateChange = (event: any) => {
    const selectedId = event.target.value as number;
    const foundTemplate = templates.find(template => template.id === selectedId) as ITemplateResponse;
    if (foundTemplate) {
      setSelectedTemplate(foundTemplate);
      setTemplateContent(foundTemplate.templateCode);
      setAppearance((prevState) => ({
        ...prevState, 
        templateId: selectedId, 
        params: JSON.parse(JSON.stringify(foundTemplate.defaultParams || {})) 
      })); // Deep copy defaultParams
    }
  }



  const handleNameChange = (event: any) => {
    setAppearance((prevState) => ({ ...prevState, name: event.target.value }));
  }

  const handleSaveClick = async (event: any) => {
    if (appearanceId) {
      await editUnitAppearance(appearance).then((response) => {
        if (handleCreateResponse(response) !== null) {
          nav("/appearance");
        }
      });
    } else {
      await addUnitAppearance(appearance).then((response) => {
        if (handleCreateResponse(response) !== null) {
          nav("/appearance");
        }
      });
    }
  }

  const handleParamChange = (name: string, value: string) => {
    setAppearance((prevState) => ({ ...prevState, params: { ...prevState.params, [name]: value } }));
  }

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAppearance((prevState) => ({ ...prevState, type: newAlignment }));
  };

  const renderTemplate = () => {
    if(selectedTemplate){
      let replacedTemplate = selectedTemplate.templateCode;
      Object.keys(appearance.params).forEach(key => {
        replacedTemplate = replacedTemplate.replace(key, appearance.params[key]);
      });
      setTemplateContent(replacedTemplate);
    }
  }

  useEffect(() => {
    renderTemplate();
  }, [selectedTemplate, appearance.params]);

  return (
    <Box sx={{ width: '40%', mb: 2, ml: '5%', mt: 2 }}>
      <FormControl sx={{ mt: 3 }} fullWidth>
        <TextField sx={{ mb: 2 }}
          id="nameInput"
          label="Appearance Name"
          name="name"
          value={appearance.name}
          onChange={handleNameChange}
        ></TextField>
      </FormControl>

      <ToggleButtonGroup
        value={appearance.type}
        exclusive
        onChange={handleAlignment}
        aria-label="Type"
      >
        <ToggleButton value="Left" aria-label="Left">
          <AlignHorizontalLeftIcon />
        </ToggleButton>
        <ToggleButton value="Right" aria-label="Right">
          <AlignHorizontalRightIcon />
        </ToggleButton>
        <ToggleButton value="Overlay" aria-label="Overlay">
          <LayersIcon />
        </ToggleButton>
        <ToggleButton value="InText" aria-label="In text">
          <FormatIndentIncreaseIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <FormControl sx={{ mt: 3 }} fullWidth>
        <InputLabel>Template</InputLabel>
        <Select
          name="template"
          id="my-input"
          value={selectedTemplate ? selectedTemplate.id : ''}
          onChange={handleTemplateChange}
          label="Template"
        >
          {templates.map((temp) => {
            return (
              <MenuItem
                key={temp.id}
                value={temp.id}
              >{temp.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {transformParams(selectedTemplate?.defaultParams).map((param: Param) => (
        (param.name.toLowerCase().includes("color")) ? (
          <FormControl sx={{ mt: 3 }} fullWidth key={param.name}>
            <MuiColorInput label={param.name}
              format="hex"
              value={appearance.params[param.name] || ''}
              onChange={(value) => handleParamChange(param.name, value)} />
          </FormControl>
        ) : (
          <FormControl sx={{ mt: 3 }} fullWidth key={param.name}>
            <TextField
              label={param.name}
              value={appearance.params[param.name] || ''}
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>
              }}
              onChange={(event) => handleParamChange(param.name, event?.target.value)} />
          </FormControl>
        )))}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          onClick={() => nav("/appearance")}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleSaveClick}>
          Save
        </Button>
      </Box>
      <Box sx={{ mt: 4 }} id="templatePlacement" dangerouslySetInnerHTML={{ __html: templateContent }} />
    </Box>
  )
}
