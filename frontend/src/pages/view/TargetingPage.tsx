import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
import { getTargetings } from "../../utils/service/TargetingService";
import { handleGetTargetingsResponse } from "../../functions/handleApiResponseFunctions";
import { ICountryResponse, ITargetingResponse } from "../../interfaces/responses/ITargetingResponse";
import NavBar from '../../components/NavBarComponent';
import PlaceIcon from '@mui/icons-material/Place';
import { Button, TableFooter, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router';


export const transformParams = (params: { [key: string]: string }): ICountryResponse[] => {
    return Object.entries(params).map(([id, name]) => ({
      id,
      name
    }));
  };

export default function TargetingViewPage() {
  const [targetings, setTargetings] = useState<ITargetingResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getTargetingList();
  }, []);

  const getTargetingList = async () => {
    let response = await getTargetings();
    setTargetings(handleGetTargetingsResponse(response));
    
  };

  const getCountries = (targeting: any) => {
    const countries: ICountryResponse[] = transformParams(targeting.countries);
    return countries
  };

  return (
      <div>
        <NavBar pageName='Targetings' />
        <Box sx={{ width: "95%", ml: "50px", mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Targetings</Typography>
          </Box>

          <TableContainer component={Paper}>
          <Button sx={{ mt: "15px", mb: "15px", ml: "15px" }} variant="contained" color="primary" onClick={() => navigate('/targeting/create')}>
              NEW
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Countries</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetings.map((targeting) => (
                  <TableRow key={targeting.id}>
                    <TableCell>{targeting.name}</TableCell>
                    <TableCell>
                      {getCountries(targeting).slice(0, 15).map((country) => (
                        <Chip key={country.id} label={country.name} sx={{ margin: '2px' }} icon={<PlaceIcon/>}/>
                      ))}
                      {getCountries(targeting).length > 15 && (
                        <Chip label={`+${getCountries(targeting).length - 15} more`} sx={{ margin: '2px' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                    colSpan={2}
                    count={targetings.length}
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
}