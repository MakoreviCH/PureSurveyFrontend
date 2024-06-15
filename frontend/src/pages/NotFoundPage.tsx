import { Box, Typography } from '@mui/material'; // Assuming you're using Material-UI for styling

const NotFound = () => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">Not Found</Typography>
      </Box>
    </Box>
  );
};

export default NotFound;