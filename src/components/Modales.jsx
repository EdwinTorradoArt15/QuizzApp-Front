import {forwardRef} from 'react'
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Modales = forwardRef((props, ref) => (
  <Box sx={style} ref={ref} tabIndex={-1}>
    {props.children}
  </Box>
))



export default Modales;
