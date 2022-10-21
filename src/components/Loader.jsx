import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex' }} >
    <CircularProgress  color="success" size={30}/>
  </Box>
  )
}

export default Loader