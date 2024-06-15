import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicDetailsStep, TargetingStep, QuestionStep } from '../../components/SurveySteps';
import NavBar from '../../components/NavBarComponent';
import { IQuestion, ISurveyRequest } from '../../interfaces/requests/ISurveyRequest';
import { handleCreateResponse } from '../../functions/handleApiResponseFunctions';
import { addSurvey } from '../../utils/service/SurveyService';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';




const steps = ['Basic details', 'Targeting', 'Question'];

export default function CreateSurveyPage() {
const nav = useNavigate();
const [survey, setSurvey] = useState<ISurveyRequest>({name:"", targetingId:0, dateBy:"", questions:[]})
const [activeStep, setActiveStep] = useState(0);

const handleParamChange = (name:string,value: any) => {
  setSurvey((prevState)=> ({ ...prevState, [name]:value} ));
}

const handleNext = () => {

    if(activeStep === steps.length - 1){
      addSurvey(survey).then((response)=>{
        if (handleCreateResponse(response) !== null){
          console.log(response);
          nav("/survey")
        }
      });
    }
    else
      setActiveStep(prevActiveStep => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

const getStepContent= (step: number) => {
  switch (step) {
    case 0: 
      return <BasicDetailsStep 
      survey={survey}
      setParam={handleParamChange}
       />;
    case 1:
      return <TargetingStep
      survey={survey}
      setParam={handleParamChange}
      />;
    case 2:
      return <QuestionStep questions={survey.questions} 
      setQuestions={(questions: IQuestion[]) => handleParamChange('questions', questions)} />;
    default:
      return 'Unknown step';
  }
}

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <NavBar pageName="Survey - Create"/>
      
    <Box sx={{ width: '90%', ml:'5%', mt:'20px'}}>
      
      <Stepper activeStep={activeStep}>
      {steps.map(label => (
          <Step key={label}>
            <StepLabel >
              {label}
            </StepLabel>
          </Step>
        ))}

      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Saving...
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{  }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button> 
            </Box>
        </React.Fragment>
      )}
    </Box>
    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
    />
    </div>
  );
}