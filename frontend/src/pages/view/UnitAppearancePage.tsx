import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Button, TablePagination, ThemeProvider, TableFooter
} from '@mui/material';
import {
  AlignHorizontalLeft as AlignHorizontalLeftIcon,
  AlignHorizontalRight as AlignHorizontalRightIcon,
  Layers as LayersIcon,
  FormatIndentIncrease as FormatIndentIncreaseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IUnitAppearanceResponse, ParamObject, Param } from '../../interfaces/responses/IUnitAppearanceResponse';
import { getAppearances } from "../../utils/service/AppearanceService";
import { createTheme } from '@mui/material/styles';
import NavBar from '../../components/NavBarComponent';
import { handleGetAppearancesResponse } from '../../functions/handleApiResponseFunctions';

export const transformParams = (params: ParamObject): Param[] => {
  return Object.entries(params).map(([name, value]) => ({
    name,
    value,
  }));
};

export default function UnitAppearancePage() {
  const [unitAppearances, setUnitAppearances] = useState<IUnitAppearanceResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getUnitAppearanceList();
  }, []);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUnitAppearanceList = async () => {
    let response = await getAppearances();
    setUnitAppearances(handleGetAppearancesResponse(response));
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "Left":
        return <AlignHorizontalLeftIcon />;
      case "Right":
        return <AlignHorizontalRightIcon />;
      case "Overlay":
        return <LayersIcon />;
      case "InText":
        return <FormatIndentIncreaseIcon />;
      default:
        return null;
    }
  };

  const renderParams = (params: ParamObject) => {
    const paramArray = transformParams(params);
    return paramArray.map(param => param.name).join(', ');
  };

  return (
      <div>
        <NavBar pageName='Unit Appearances' />
        <Box sx={{ width: "90%", ml: "50px", mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Unit Appearances</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Button sx={{ mt: "15px", mb: "15px", ml: "15px" }} variant="contained" color="primary" onClick={() => navigate('/appearance/create')}>
              NEW
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Template</TableCell>
                  <TableCell>Params</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? unitAppearances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : unitAppearances).map(unitAppearance => (
                    <TableRow key={unitAppearance.id}>
                      <TableCell>{unitAppearance.name}</TableCell>
                      <TableCell>{renderTypeIcon(unitAppearance.type)}</TableCell>
                      <TableCell>{unitAppearance.templateName}</TableCell>
                      <TableCell>{renderParams(unitAppearance.params)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                    colSpan={4}
                    count={unitAppearances.length}
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
