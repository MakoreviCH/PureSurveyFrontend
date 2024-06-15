import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, Chip, FormControl, Link, Paper, TableContainer, ThemeProvider, useTheme } from '@mui/material';
import {handleGetSurveysResponse, handleGetUnitsResponse} from "../../functions/handleApiResponseFunctions";
import {ISurveyUnitResponse} from "../../interfaces/responses/ISurveyUnitResponse";
import {getSurveys} from "../../utils/service/SurveyService";
import {SurveyUnitLocalizedStrings} from "../../functions/localizedStrings";
import {GeneralLocalizedStrings} from "../../functions/localizedStrings";
import { Table, TableHead, TableCell, TableRow, Button, TableBody, TablePagination,TableFooter } from '@mui/material'
import { useNavigate } from 'react-router';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import NavBar from '../../components/NavBarComponent';
import { transformParams } from './SurveyPage';
import PlaceIcon from '@mui/icons-material/Place';
import { ICountryResponse } from '../../interfaces/responses/ITargetingResponse';
import { ISurveyResponse } from '../../interfaces/responses/ISurveyResponse';
import { getSurveyUnits } from '../../utils/service/SurveyUnitService';
import CodeIcon from '@mui/icons-material/Code';
import CheckIcon from '@mui/icons-material/Check';
import { getUnitCode } from '../../utils/service/GetUnitCode';
import CustomAlert from '../../components/AlertComponent';


 export default function SurveyUnitPage() {

  const [units, setSurveyUnits] = useState<ISurveyUnitResponse[]>([]);
  const [page, setPage] = React.useState(0);
  const [surveys, setSurveys] = useState<ISurveyResponse[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [alert, setAlert] = useState({type:'', text:''})
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUnits();
    getSurveyList();
}, []);

const handleChangePage = (event:any, newPage:any) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event:any) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
const getSurveyList = async () => {
  let response = await getSurveys();
  setSurveys(handleGetSurveysResponse(response));
}
const getUnits = async () => {
    let response = await getSurveyUnits();
    setSurveyUnits(handleGetUnitsResponse(response));
}

const handleGetAlert=(isCopied:boolean, textString:string)=>{

  setAlert({
    text:textString,
    type:isCopied?"success":"error"
  })
}

useEffect(() => {
  if(alert.type)
    setShowAlert(true);
}, [alert]);

return (
  <div>
    <NavBar pageName='Survey Units'/>
    <Box sx={{width:"95%", ml:"50px", mt:2}}>
       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Survey Units</Typography>
        </Box>

      <TableContainer component={Paper}>
      <Button sx={{mt:"15px", mb:"15px", ml:"15px"}} variant="contained" color="primary" onClick={() => navigate('/survey-unit/create')}>
          NEW
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ width: 900 }}>{SurveyUnitLocalizedStrings.unitNameLabel}</TableCell>
              <TableCell style={{ width: 300 }}>Appearance</TableCell>
              <TableCell align="right" style={{ width: 300 }}>Survey retake count</TableCell>
              <TableCell align="right" style={{ width: 300}}>Max Surveys</TableCell>
              <TableCell align="right" style={{ width: 300}}>Actions</TableCell>
            </TableRow>
          </TableHead>
      <TableBody>

          {(rowsPerPage > 0
          ? units.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : units
      ).map((unit) => (
            <SurveyRow surveys={surveys} key={unit.name} setShowAlert={handleGetAlert} row={unit} />
          ))}
      </TableBody>
      <TableFooter>
          <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
            colSpan={6}
            count={units.length}
            rowsPerPage={rowsPerPage}
            page={page}
            slotProps={{
              select: {
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
                },
              }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableRow>
      </TableFooter>
  </Table>
  </TableContainer>
  </Box>
  <Box sx={{ position: 'fixed', bottom: 0, width: '40%', left: 0, margin:"10px" }}>
        <CustomAlert
          status={showAlert}
          type={alert.type}
          text={alert.text}
          setStatus={setShowAlert}
        />
      </Box>
  </div>
)


}


function SurveyRow(props: { row: ISurveyUnitResponse, surveys:ISurveyResponse[], setShowAlert: (isCopied:boolean, text:string) => void }) {
  const { row, surveys,  setShowAlert } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme(); 
  const surveyIds = Object.keys(row.surveyIdNames);
  const unitSurveys = surveys.filter(survey => surveyIds.includes(survey.id.toString()));


  const handleCodeClick = async (unitId:number) => {
    await getUnitCode(unitId).then((response)=>{
      navigator.clipboard.writeText(response);
      setShowAlert(true,"Survey Unit was copied to clipboard!");
    }).catch((error)=>{
      setShowAlert(false,`Error! Details:${error}`);
    });
    
  };


  const renderStatusChip = (dateBy: string) => {
    const currentDate = new Date();
    const surveyDate = new Date(dateBy);
    if (surveyDate < currentDate) {
      return <Chip label="Suspended" color="info" />;
    }
    return <Chip label="Active" color="success" />;
  };
  
  const renderTargetingInfo = (targeting: any) => {
    return (
      <Box sx={{alignItems:"center", display:"flex"}}>      
      <PlaceIcon color="action"/> 
        {targeting.name}: 
      </Box>
    );
  };
  
  return (
    <React.Fragment>

     <TableRow>
      <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ width: 900 }}>
          <Button
              component={Link}
              variant="text" 
              onClick={(o)=>{navigate(`/survey-unit/edit/${row.id}`)}}
              disableRipple
              sx={{
                textTransform: 'none',
                fontSize: '1rem', 
                padding: '0.5rem 1rem', 
                color: theme.palette.text.primary,
                outlineColor: theme.palette.text.secondary,
              }}
            >
          {row.name}
          </Button>
        </TableCell>
        <TableCell style={{ width: 300 }}>{Object.values(row.appearanceIdName)?.[0] as React.ReactNode ?? "N/A"}</TableCell>
        <TableCell align="right" style={{ width: 300 }}>{row.oneSurveyTakePerDevice}</TableCell>
        <TableCell align="right" style={{ width: 300 }}>{row.maximumSurveysPerDevice}</TableCell>
        <TableCell align="right" style={{ width: 300 }}>
            <Button variant="contained" color="primary" sx={{marginRight:"5px"}} onClick={(o)=>{handleCodeClick(row.id)}} startIcon={<CodeIcon/>}> GET CODE</Button>
            <Button variant="contained" color="error" > DELETE</Button>
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Surveys
              </Typography>
              <Table size="small" aria-label="surveys">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 900 }}>Name</TableCell>
                    <TableCell style={{ width: 300 }}>Targeting</TableCell>
                    <TableCell style={{ width: 60 }}>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {unitSurveys.map((survey:ISurveyResponse) => (
                    <TableRow key={survey.id}>
                      <TableCell>{survey.name}</TableCell>
                      <TableCell>{renderTargetingInfo(survey.targeting)}</TableCell>
                      <TableCell>{renderStatusChip(survey.dateBy)}</TableCell>
                      <TableCell  align="right">
                        <Button variant="contained" color="primary" onClick={() => navigate(`/survey/stats/${survey.id}`)} style={{ backgroundColor: 'purple' }}>
                          Stats
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                 </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}