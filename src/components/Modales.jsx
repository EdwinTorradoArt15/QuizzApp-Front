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

const Modales = ({ children, titulo }) => {
  return (
    <Box sx={style}>
      <h3 className="text-xl font-semibold">{titulo}</h3>
      {children}
    </Box>
  );
};

export default Modales;
