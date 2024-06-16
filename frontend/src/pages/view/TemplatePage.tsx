import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Button, TablePagination, TableFooter
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import { ITemplateResponse } from '../../interfaces/responses/ITemplateResponse';
import NavBar from '../../components/NavBarComponent';
import { handleGetTemplatesResponse } from '../../functions/handleApiResponseFunctions';
import { getSystemTemplates } from '../../utils/service/TemplateService';

const transformParams = (params: { [key: string]: any }): string[] => {
  return Object.keys(params);
};

export default function TemplatePage() {
  const [templates, setTemplates] = useState<ITemplateResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getTemplateList();
  }, []);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTemplateList = async () => {
    let response = await getSystemTemplates();
    setTemplates(handleGetTemplatesResponse(response));
  };

  const renderParams = (params: { [key: string]: any }) => {
    const paramArray = transformParams(params);
    return paramArray.join(', ');
  };

  const handleCodeClick = async (templateId: number) => {
    const template = templates.find(template => template.id === templateId);
    if (template) {
      await navigator.clipboard.writeText(template.templateCode);
      alert('Template code copied to clipboard!');
    }
  };

  return (
    <div>
      <NavBar pageName='Templates' />
      <Box sx={{ width: "90%", ml: "50px", mt: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Templates</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Button sx={{ mt: "15px", mb: "15px", ml: "15px" }} variant="contained" color="primary" onClick={() => navigate('/template/create')}>
            NEW
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Params</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? templates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : templates).map(template => (
                  <TableRow key={template.id}>
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{renderParams(template.defaultParams)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{marginRight:"5px"}} 
                        onClick={() => handleCodeClick(template.id)} 
                        startIcon={<CodeIcon />}
                      >
                        GET CODE
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate(`/template/edit/${template.id}`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={templates.length}
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