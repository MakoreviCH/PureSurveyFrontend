import { Box, Chip, Container, FormControl, InputLabel, Pagination, PaginationItem, Select  } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { TextField, Button, Grid, IconButton, MenuItem } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { useState, useEffect, ReactNode } from "react";
import { handleGetTargetingsResponse } from "../functions/handleApiResponseFunctions";
import { ICountryResponse, ITargetingResponse } from "../interfaces/responses/ITargetingResponse";
import { getTargetings } from "../utils/service/TargetingService";
import { ISurveyRequest, IQuestion, ITranslationLine, IQuestionOptions } from "../interfaces/requests/ISurveyRequest"
import { JSX } from "react/jsx-runtime";
import PlaceIcon from '@mui/icons-material/Place';
import QuestionForm from "./QuestionForm";
import { ParamObject } from "../interfaces/responses/IUnitAppearanceResponse";

const transformParams = (params: ParamObject): ICountryResponse[] => {
    return Object.entries(params).map(([id, name]) => ({
        id,
        name
    }));
  };

export function TargetingStep({
    survey,
    setParam
  }: FormProps) {
    const [targetings, setTargetings] = useState<ITargetingResponse[]>([]);
    const [selectedCountries, setCountries] = useState<ICountryResponse[]>([]);

    useEffect(() => {
      getTargetingsList();
  }, []);
  
  useEffect(() => {
    ;
}, [selectedCountries]);
  const handleTargetingChange = (event: any) => {
    setParam("targetingId", event.target.value);
    let findedTarget = targetings.find((o)=>o.id ===event.target.value);
    
    if (findedTarget) {
        setCountries(transformParams(findedTarget.countries)); 
      } else {
        setCountries([]); 
      }
  };
  const getTargetingsList = async () => {
      let response = await getTargetings();
      setTargetings(handleGetTargetingsResponse(response));
  }
    return(
        <Box sx={{ width:'40%', mb: 2 }}>
        
        <FormControl sx={{mt:3}} fullWidth>
        <InputLabel>Targeting</InputLabel>
            <Select
                name="id"
                id="my-input"
                value={survey.targetingId}
                onChange={handleTargetingChange}
              label="Targeting"
            >
            {targetings.map((target) => {
                return (
                    <MenuItem
                        key={target.name}
                        value={target.id}
                    >{target.name}</MenuItem>
          );
          })}
          </Select>
          <Box sx={{ mt: 2 }}>
          {selectedCountries.map((country) => {
            return (
              <Chip sx={{ mr: 1 }} key={country.id} icon={<PlaceIcon />} label={country.name} /> 
            );
          })}
        </Box>
        </FormControl>
        </Box>
      )
  }

  interface FormProps {
    survey: ISurveyRequest
    setParam: (name: string, value:any)=>void,
  }
  
  export function BasicDetailsStep({
    survey,
    setParam
  }: FormProps) {
  
    const [date, setDate] = useState<Dayjs | null>(null);
    useEffect(() => {
      
  }, []);
  
  const handleDateChange = (value: any) => {
    setDate(value);
    setParam("dateBy", value?.toJSON());
  };

    return(
        <Box sx={{ width:'40%', mb: 2 }}>
        <FormControl sx={{mt:3}} fullWidth>
            <TextField sx={{ mb: 2 }}
            id="nameInput"
            label="Survey Name"
            value={survey.name}
            onChange={(event) => setParam("name",event.target.value)}
            ></TextField>
            </FormControl>
            <FormControl sx={{mt:3}} fullWidth>
  
             <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date by" value={date} onChange={handleDateChange} />
          </LocalizationProvider>
        </FormControl>
        </Box>
      )
  }

  export function QuestionStep(props:any) {
 const { questions, setQuestions } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  const handleAddQuestion = () => {
    const newQuestion: IQuestion = {
      id: questions.length,
      type: "",
      orderNumber: questions.length + 1,
      questionLine: { id: questions.length, translations: [] },
      questionOptions: [],
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_: any, idx: number) => idx !== index);
    setQuestions(updatedQuestions);
    setCurrentQuestionIndex(Math.max(0, updatedQuestions.length - 1));
  };

  const handleQuestionSwitch = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentQuestionIndex(value-1);
  };
  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...questions];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex >= 0 && swapIndex < newQuestions.length) {
      [newQuestions[index], newQuestions[swapIndex]] = [newQuestions[swapIndex], newQuestions[index]];
      setQuestions(newQuestions);
      setCurrentQuestionIndex(swapIndex);
    }
  };

  return (
    <Container 
    
    sx={{ minHeight: '10vh' }}>
      {questions.length > 0 && (
        <QuestionForm
          questions={questions}
          setQuestions={setQuestions}
          questionIndex={currentQuestionIndex}
          handleDeleteQuestion={handleDeleteQuestion}
          handleMoveQuestion={handleMoveQuestion}
        />
      )}
        <Pagination page={currentQuestionIndex+1} count={questions.length} onChange={handleQuestionSwitch}/>
        <Button  onClick={handleAddQuestion} startIcon={<AddCircle />}>    
        Add Question</Button>
    </Container>
  )};
  