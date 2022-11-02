import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const Btn = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "10px",
  border: "2px solid",
  borderRadius: 6,
  lineHeight: 1.5,
  backgroundColor: "#3A53EE",
  color: "#fff",
  borderColor: "#3A53EE",
  transition: "all .3s ease-in-out",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#3A53EE",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#fff",
    color: "#3A53EE",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(58, 83, 238, .5)",
  },
});

export const BtnCancel = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "10px",
  border: "2px solid",
  borderRadius: 6,
  lineHeight: 1.5,
  backgroundColor: "#ba181b",
  color: "#fff",
  borderColor: "#ba181b",
  transition: "all .3s ease-in-out",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#ba181b",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#fff",
    color: "#ba181b",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(186, 24, 27, .5)",
  },
})
