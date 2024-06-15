import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, ThemeProvider } from '@mui/material';
import {handleGetSurveysResponse, handleGetTargetingResponse, handleGetTargetingsResponse, handleGetUnitsResponse} from "../../functions/handleApiResponseFunctions";
import {getSurveys} from "../../utils/service/SurveyService";
import {SurveyUnitLocalizedStrings} from "../../functions/localizedStrings";
import {GeneralLocalizedStrings} from "../../functions/localizedStrings";
import { Chip, Table, TableHead, TableCell, TableRow, Button, TableBody, styled, TableContainer, TablePagination, TableFooter } from '@mui/material'
import {useNavigate } from 'react-router';

import NavBar from '../../components/NavBarComponent';
import { ISurveyResponse } from '../../interfaces/responses/ISurveyResponse';
import { ICountryResponse, ITargetingResponse } from '../../interfaces/responses/ITargetingResponse';
import PlaceIcon from '@mui/icons-material/Place';
import { format } from 'date-fns';

export const transformParams = (params: { [key: string]: string }): ICountryResponse[] => {
  return Object.entries(params).map(([id, name]) => ({
    id,
    name
  }));
};

 export default function SurveyPage() {

  const [surveys, setSurveys] = useState<ISurveyResponse[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  useEffect(() => {
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

const renderStatusChip = (dateBy: string) => {
  const currentDate = new Date();
  const surveyDate = new Date(dateBy);
  if (surveyDate < currentDate) {
    return <Chip label="Suspended" color="info" />;
  }
  return <Chip label="Active" color="success" />;
};

const renderTargetingInfo = (targeting: any) => {
  const countries: ICountryResponse[] = transformParams(targeting.countryInTargetings);
  const countryNames = countries.map(country => country.name);
  const displayedCountries = countryNames.length > 2 ? countryNames.slice(0, 2).join(', ') + ', ...' : countryNames.join(', ');
  console.log(countries);
  return (
    <Box sx={{alignItems:"center", display:"flex"}}>      
    <PlaceIcon color="action"/> 
      {targeting.name}: 
      <Box>{displayedCountries}</Box>
    </Box>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm');
};

return (
  <div>
    <NavBar pageName='Surveys'/>
    <Box sx={{width:"90%", ml:"50px", mt:2}}>
       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Surveys</Typography>
        </Box>

      <TableContainer component={Paper}>
      <Button sx={{mt:"15px", mb:"15px", ml:"15px"}} variant="contained" color="primary" onClick={() => navigate('/survey/create')}>
          NEW
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 900 }}>Name</TableCell>
              <TableCell style={{ width: 200 }} >Date By</TableCell>
              <TableCell style={{ width: 300 }}>Targeting</TableCell>
              <TableCell style={{ width: 60 }}>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
            ?surveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : surveys).map(survey => (
              <TableRow key={survey.id}>
                <TableCell>{survey.name}</TableCell>
                <TableCell>{formatDate(survey.dateBy)}</TableCell>
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
          <TableFooter>
          <TableRow>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={surveys.length}
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
    </div>
  );
};