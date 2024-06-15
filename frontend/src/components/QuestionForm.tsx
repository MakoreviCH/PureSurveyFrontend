import React, { useState } from 'react';
import { TextField, Button, IconButton, Select, MenuItem, ToggleButton, ToggleButtonGroup, Grid, FormControl, InputLabel } from '@mui/material';
import { Add, ArrowDownward, ArrowUpward, Remove } from '@mui/icons-material';
import { IQuestion, ITranslationLine, IQuestionOptions } from "../interfaces/requests/ISurveyRequest"
import AddLanguageDialog from './AddLanguageDialog';

interface QuestionFormProps {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  questionIndex: number;
  handleDeleteQuestion: (index: number) => void;
  handleMoveQuestion: (index: number, direction: 'up' | 'down') => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questions, setQuestions, questionIndex, handleDeleteQuestion, handleMoveQuestion }) => {
  const question = questions[questionIndex];
  const [language, setLanguage] = useState<string>('en');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['en']);
  const [isAddLanguageDialogOpen, setIsAddLanguageDialogOpen] = useState(false);

  const handleChangeQuestionText = (text: string) => {
    const updatedQuestions = [...questions];
    const translation = updatedQuestions[questionIndex].questionLine.translations.find((t: { languageCode: string; }) => t.languageCode === language);
    if (translation) {
      translation.translationText = text;
    } else {
      updatedQuestions[questionIndex].questionLine.translations.push({ languageCode: language, translationText: text });
    }
    setQuestions(updatedQuestions);
  };

  const handleAddOption = () => {
    const newOption: IQuestionOptions = {
      id: question.questionOptions.length,
      orderNumber: question.questionOptions.length + 1,
      translations: availableLanguages.map(lang => ({ languageCode: lang, translationText: '' })),
    };
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionOptions.push(newOption);
    setQuestions(updatedQuestions);
  };

  const handleDeleteOption = (optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionOptions = updatedQuestions[questionIndex].questionOptions.filter((_: any, idx: number) => idx !== optionIndex);
    setQuestions(updatedQuestions);
  };

  const handleOpenDialog = () => {
    setIsAddLanguageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddLanguageDialogOpen(false);
  };


  const handleAddLanguage = (code:string) => {
    const newLanguage = code;
    if (newLanguage && !availableLanguages.includes(newLanguage)) {
      setAvailableLanguages([...availableLanguages, newLanguage]);
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].questionLine.translations.push({ languageCode: newLanguage, translationText: '' });
      updatedQuestions[questionIndex].questionOptions.forEach((option: { translations: ITranslationLine[]; }) => {
        option.translations.push({ languageCode: newLanguage, translationText: '' });
      });
      setQuestions(updatedQuestions);
    }
  };

  return (
    <div>
      <TextField sx={{mt:1}}
        label="Question Text"
        value={question.questionLine.translations.find(t => t.languageCode === language)?.translationText || ''}
        onChange={(e) => handleChangeQuestionText(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth sx={{mt:1}}>
        <InputLabel>Type</InputLabel>
      <Select 
        value={question.type}
        label="Type"
        onChange={(e) => {
          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex].type = e.target.value as string;
          setQuestions(updatedQuestions);
        }}
        fullWidth
      >
        <MenuItem value={0}>Radiobutton</MenuItem>
        <MenuItem value={1}>Checkbox</MenuItem>
      </Select>
      </FormControl>
      <div>
        {question.questionOptions.map((option, idx) => (
          <div key={option.id}>
            <Grid container 
            sx={{ml:'1%', width:'99%', mt:0.5}}
            spacing={2} 
            alignItems="center"
            justifyContent="flex-start">
                <Grid item >
                    <IconButton  onClick={() => handleDeleteOption(idx)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <TextField 
                    label={`Option ${idx + 1}`}
                    value={option.translations.find(t => t.languageCode === language)?.translationText || ''}
                    onChange={(e) => {
                        const updatedQuestions = [...questions];
                        const translation = updatedQuestions[questionIndex].questionOptions[idx].translations.find((t: { languageCode: string; }) => t.languageCode === language);
                        if (translation) {
                        translation.translationText = e.target.value;
                        } else {
                        updatedQuestions[questionIndex].questionOptions[idx].translations.push({ languageCode: language, translationText: e.target.value });
                        }
                        setQuestions(updatedQuestions);
                    }}
                    fullWidth
                    />
                </Grid>
            </Grid>
          </div>
        ))}
        <Button onClick={handleAddOption} startIcon={<Add />}>
          Add Option
        </Button>
      </div>
      <div>
        <Grid container sx={{mt:2}} spacing={1}>      
        <ToggleButtonGroup 
      orientation="vertical"
      exclusive
      >   
          {availableLanguages.map(lang => (
              <ToggleButton 
                value={lang}
                selected={language === lang}
                onChange={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </ToggleButton>
          ))}
          </ToggleButtonGroup>
          <Grid item>
            <Button onClick={handleOpenDialog} startIcon={<Add />}>
              Add Language
            </Button>
          
            </Grid>
        </Grid>
      </div>
      <Button onClick={() => handleMoveQuestion(questionIndex, 'up')} startIcon={<ArrowUpward />} disabled={questionIndex === 0}>
          Move Up
        </Button>
        <Button onClick={() => handleMoveQuestion(questionIndex, 'down')} startIcon={<ArrowDownward />} disabled={questionIndex === questions.length - 1}>
          Move Down
        </Button>
      <Button onClick={() => handleDeleteQuestion(questionIndex)} startIcon={<Remove />}>
        Delete Question
      </Button>
      <AddLanguageDialog
        open={isAddLanguageDialogOpen}
        onClose={handleCloseDialog}
        onAddLanguage={handleAddLanguage}
        availableLanguages={availableLanguages} 
      />
    </div>
  );
};

export default QuestionForm;