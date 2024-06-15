import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {handleGetStatsResponse, handleGetSurveyResponse, handleGetUnitsResponse} from "../../functions/handleApiResponseFunctions";
import {getSurveyById, getQuestionStats} from "../../utils/service/SurveyService";
import {useNavigate, useParams } from 'react-router';
import IconButton from '@mui/material/IconButton';
import NavBar from '../../components/NavBarComponent';
import { IOptionTranslationLine, IQuestionTranslationLine, ISurveyResponse, IQuestion } from '../../interfaces/responses/ISurveyResponse';
import { BarChart, Label, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IStatsResponse } from '../../interfaces/responses/IStatsResponse';
import { countryList } from '../../enums/country-code';
import { CountryCodeList } from '../../interfaces/responses/ITargetingResponse';

 export default function SurveyStatsPage() {

  const [survey, setSurvey] = useState<ISurveyResponse>();
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [filter, setFilter] = useState<string>('All');
  const [stats, setStats] = useState<IStatsResponse>();
  const [languages, setLanguages] = useState<string[]>([]);
  const navigate = useNavigate();
  const {surveyId} = useParams();

  useEffect(() => {
    getSurvey(surveyId);
}, []);

useEffect(() => {
  if (selectedQuestion !== null) {
    fetchStats(selectedQuestion);
    console.log(selectedQuestion)
  }
}, [selectedQuestion, filter]);

const getSurvey = async (surveyId:any) => {
    let surveyResponse = await getSurveyById(surveyId)
    const handledSurvey = handleGetSurveyResponse(surveyResponse);

    if (!handledSurvey) {
      console.error('Handled survey is undefined');
      return;
  }
    const langs = new Set<string>();
    handledSurvey.questions.forEach((question) => {
      question.questionLine.questionTranslations.forEach((translation) => {
        langs.add(translation.language);
      });
    });
    console.log(handledSurvey);
    setSurvey(handledSurvey);
    setLanguages(Array.from(langs));
}   



const fetchStats = async (questionId: number) => {
 await getQuestionStats(questionId).then((response)=>setStats(handleGetStatsResponse(response)));
  
};

const handleQuestionChange = (event: any) => {
  setSelectedQuestion(event.target.value as number);
};

const handleLanguageChange = (event:any) => {
  setSelectedLanguage(event.target.value as string);
};

const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
  setFilter(newFilter);
};

const getQuestionTranslation = (translations: IQuestionTranslationLine[]):string => {
  const translation = translations.find(t => t.language === selectedLanguage);
  return translation ?  translation.questionTranslationLine  : 'Translation not available';
};

const getOptionTranslation = (translations: IOptionTranslationLine[] ):string => {
  const translation = translations.find(t => t.language === selectedLanguage);
  return translation ? translation.optionLine : 'Translation not available';
};

const getOptionName = (optionId: number): string => {
  console.log(survey);
  if (!survey || !selectedQuestion) return `Option ${optionId}`;
  let question:IQuestion|null=null;
  for (let i = 0; i < survey.questions.length; i++) {
    if (survey.questions[i].id === selectedQuestion) {
      question = survey.questions[i];
      break;
    }
  }
  if (!question) return `Option ${optionId}`;

  let optionName = `Option ${optionId}`;
  for (let j = 0; j < question.questionOptions.length; j++) {
    if (question.questionOptions[j].id === optionId) {
      optionName = getOptionTranslation(question.questionOptions[j].optionTranslations);
      break;
    }
  }
  return optionName;
};

const transformData = (): { [key: string]: any }[] => {
  if (!stats) return [];

  let transformedData: { [key: string]: any }[] = [];

  
  if (filter === 'Gender') {
    const groupedData = stats.statsForGender.reduce((acc: { [key: string]: any }, stat) => {
      const optionName = getOptionName(stat.optionId);
      if (!acc[optionName]) acc[optionName] = { option: optionName };
      acc[optionName][stat.gender] = stat.answered;
      return acc;
    }, {});

    transformedData = Object.values(groupedData);
  } else if (filter === 'Geo') {
    const groupedData = stats.statsForGeo.reduce((acc: { [key: string]: any }, stat) => {
      const optionName = getOptionName(stat.optionId);
      if (!acc[optionName]) acc[optionName] = { option: optionName };
      acc[optionName][stat.geo] = stat.answered;
      return acc;
    }, {});

    transformedData = Object.values(groupedData);
  } else if (filter === 'Lang') {
    const groupedData = stats.statsForLang.reduce((acc: { [key: string]: any }, stat) => {
      const optionName = getOptionName(stat.optionId);
      if (!acc[optionName]) acc[optionName] = { option: optionName };
      acc[optionName][stat.lang] = stat.answered;
      return acc;
    }, {});

    transformedData = Object.values(groupedData);
  } else {
    transformedData = stats.statsForOption.map(stat => ({
      option: getOptionName(stat.optionId),
      answered: stat.answered,
    }));
  }
  return transformedData;
};

const renderChart = () => {
  const data = transformData();
  if (data.length === 0) return null;

  const keys = Object.keys(data[0]).filter(key => key !== 'option');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" >
          
          <Label value="Option" position="insideBottom" />
          </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map(key => (
          <Bar key={key} dataKey={key} fill={key === 'answered' ? "#8884d8" : getRandomColor()} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

return (
  <div>
    <NavBar pageName='Survey Statistics'/>
    
    <Box sx={{ width:'70%', mb: 2, ml:'5%', mt:2}}>
    <Button onClick={() => navigate(-1)}>Back</Button>
    <Typography variant="h4">Survey - {survey?.name}</Typography>
    <FormControl sx={{mt:3}} fullWidth>
    <InputLabel>Question</InputLabel>
      <Select label="Question" name="Question" value={selectedQuestion} onChange={handleQuestionChange} displayEmpty>
        <MenuItem value="" disabled>Select a question</MenuItem>
        {survey?.questions.map((question) => (
          <MenuItem key={question.id} value={question.id}>
            {getQuestionTranslation(question.questionLine.questionTranslations)}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{mt:3}} fullWidth>
      <InputLabel>Language</InputLabel>
      <Select label="Language" value={selectedLanguage} onChange={handleLanguageChange} displayEmpty>
        {languages.map((language) => (
          <MenuItem key={language} value={language}>
            {(countryList as CountryCodeList)[language]}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{mt:3}} fullWidth>
      <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Gender">Gender</ToggleButton>
        <ToggleButton value="Geo">Geo</ToggleButton>
        <ToggleButton value="Lang">Lang</ToggleButton>
      </ToggleButtonGroup>
      </FormControl>
      <FormControl sx={{mt:3}} fullWidth>
        {renderChart()}
      </FormControl>
    </Box>
  </div>
);
};
