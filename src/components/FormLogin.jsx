import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Btn } from "../css/Button";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const Login = async (data) => {
    try {
      setLoading(true);
      const res = await instance.post("/login", data);
      localStorage.setItem("token", res.data.refreshToken);
      navigate("/dashboard/inicio");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl text-black md:text-2xl 2xl:text-2xl font-medium pb-2">
        Iniciar sesion
      </h1>
      <p>Bienvenido a QuizzApp.</p>
      <ToastContainer />
      <form className="mt-6" onSubmit={handleSubmit(Login)}>
        <div>
          <TextField
            fullWidth
            label="Correo"
            type="text"
            {...register("correo", {
              required: true,
            })}
            error={errors.correo ? true : false}
          />
          <p>
            {errors.correo?.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </p>
        </div>

        <div className="mt-4">
          <FormControl fullWidth>
            <InputLabel error={errors.clave ? true : false}>Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...register("clave", {
                required: true,
              })}
              error={errors.clave ? true : false}
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
          <p>
            {errors.clave?.type === 'required' && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-end pt-2">
          <p className="text-base font-medium text-gray-700 hover:text-bright-blue focus:text-bright-blue cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
        <Btn type="submit" fullWidth sx={{ mt: 2 }}>
          {loading ? <Loader /> : "Iniciar sesión"}
        </Btn>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      <Btn type="button" fullWidth>
        <div className="flex items-center justify-center ">
          <AiFillGoogleCircle className="text-lg md:text-base" />
          <span className="ml-4 text-14 2xl:text-lg md:text-base">
            Inicia sesion con Google
          </span>
        </div>
      </Btn>
      <p className="mt-5 text-base">
        Necesitas una cuenta?
        <Link
          to={"/registro"}
          className="text-blue-500 mx-1 text-base hover:text-blue-700 font-semibold"
        >
          Create una cuenta
        </Link>
      </p>
      <p className="text-xs 2xl:text-sm text-gray-500 mt-2">
        &copy; 2022 ARTECH - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormLogin;
