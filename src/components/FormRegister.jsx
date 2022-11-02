import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {Btn} from '../css/Button'
import { useForm } from "react-hook-form";
import { instance } from "../api/api";
import Loader from "./Loader";
import "react-toastify/dist/ReactToastify.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);
      await instance.post("/users", data);
      toast.success("Usuario registrado con exito");
      // timer para que se redireccione a login despues de 3 segundos
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-xl 2xl:text-2xl font-medium">
        Registra tu cuenta
      </h1>
      <form className="mt-6" onSubmit={handleSubmit(registerUser)}>
        <ToastContainer />
        <div>
          <TextField
            fullWidth
            label="Usuario"
            type="text"
            {...register("usuario", {
              required: true,
              maxLength: 20,
            })}
          />
          <p className="sr-only">
            {errors.usuario?.type === "required" &&
              toast.error("Usuario requerido")}
            {errors.usuario?.type === "maxLength" &&
              toast.error("Debe tener menos de 20 caracteres")}
          </p>
        </div>

        <div className="mt-4">
          <TextField
            fullWidth
            label="Nombre"
            type="text"
            {...register("nombre", {
              required: true,
            })}
          />
        </div>

        <div className="mt-4">
          <TextField
            fullWidth
            label="Correo"
            type="text"
            {...register("correo", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
          />
          <p className="sr-only">
            {errors.correo?.type === "required" &&
              toast.error("Correo requerido")}
            {errors.correo?.type === "pattern" &&
              toast.error("Formato de correo invalido")}
          </p>
        </div>

        <div className="mt-4">
          <FormControl fullWidth>
          <InputLabel>Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              {...register("clave")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>

        <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel>Confirmar</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              {...register("confClave")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <Btn
          fullWidth
          sx={{mt:2}}
          type="submit"
          value="Registrar"
        >
          {loading ? <Loader /> : "Registrarse"}
        </Btn>
      </form>

      <p className="text-xs text-gray-500 mt-1">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormRegister;
