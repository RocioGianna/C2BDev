import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextInput from "../components/form/TextInput";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Logo from "../assets/logo/LogoHWhite.png";
import { login } from "../services/AuthService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email2b: yup
    .string("Ingrese su correo electronico")
    .email("Ingrese un correo electronico valido")
    .required("El correo electronico es requerido"),
  password: yup
    .string("Ingrese su contraseña")
    .required("La contraseña es requerida"),
});

function Login() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email2b: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(false);
      const loggedIn = await login(values.email2b, values.password);
      if (!loggedIn) {
        setError("Email o contraseña incorrecto");
      }
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const [error, setError] = useState(false);

  return (
    <Paper elevation={4} sx={{ overflow: "hidden", maxWidth: 432 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          height: 200,
          bgcolor: (theme) => theme.palette.primary.dark,
          paddingTop: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          <img
            style={{ maxWidth: 320, width: "100%" }}
            src={Logo}
            alt="2B Conexión"
          />
        </Typography>
      </Box>
      <Stack p={4} alignItems="center" spacing={1}>
        <Typography variant="h5" component="h2" textAlign="center">
          Acceso colaboradores
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextInput
            id="email2b"
            name="email2b"
            label="Email"
            value={formik.values.email}
            onChange={(e) => {
              setError(false);
              formik.handleChange(e);
            }}
            error={formik.touched.email2b && Boolean(formik.errors.email2b)}
            helperText={formik.touched.email2b && formik.errors.email2b}
          />
          <TextInput
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={(e) => {
              setError(false);
              formik.handleChange(e);
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {error && (
            <Typography
              variant="body2"
              sx={{ color: (theme) => theme.palette.error.main }}
            >
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ my: 2, py: 1, fontSize: "1.2em" }}
          >
            Ingresar
          </Button>
        </form>
        <Link variant="body2">Recuperar contraseña</Link>
        <Link variant="body2">Solicitar alta de usuario</Link>
      </Stack>
    </Paper>
  );
}

export default Login;
