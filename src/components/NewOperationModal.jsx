import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Field, Form, Formik } from "formik";
import { Card, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import * as yup from "yup";

export default function NewOperationModal(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 16,
                    width: "80%",
                }}
            >
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    Nueva operacion
                </Typography>
                <FormikStepper
                    initialValues={{
                        clientName: "",
                        clientSurname: "",
                        dni: "",
                        phone: "",
                        email: "",
                        bankAccount: "",
                        billingAddress: "",
                        zipCode: "",
                        municipality: "",
                        province: "",
                        demo: "",
                    }}
                    onSubmit={() => {}}
                >
                    <FormikStep>Primer pantalla</FormikStep>
                    <FormikStep
                        validationSchema={yup.object({
                            clientName: yup
                                .string()
                                .required("El nombre es requerido"),
                            clientSurname: yup
                                .string()
                                .required("El apellido es requerido"),
                            dni: yup.string().required("El DNI es requerido"),
                            phone: yup
                                .string()
                                .required("El telefono es requerido"),
                            email: yup
                                .string("Ingrese su correo electronico")
                                .email("Ingrese un correo electronico valido")
                                .required("El correo electronico es requerido"),
                            bankAccount: yup
                                .string("Ingrese su cuenta bancaria")
                                .required("La cuenta bancaria es requerida"),
                            billingAddress: yup
                                .string("Ingrese su direccion de facturacion")
                                .required(
                                    "La direccion de facturacion es requerida"
                                ),
                            zipCode: yup
                                .string("Ingrese su codigo postal")
                                .required("El codigo postal es requerido"),
                            municipality: yup
                                .string("Ingrese su municipio")
                                .required("El municipio es requerido"),
                        })}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="clientName"
                                        name="clientName"
                                        label="Nombres del Cliente"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="clientSurname"
                                        name="clientSurname"
                                        label="Apellidos del Cliente"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="dni"
                                        name="dni"
                                        label="DNI"
                                        component={TextField}
                                        type="tel"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="phone"
                                        name="phone"
                                        label="Telefono"
                                        component={TextField}
                                        type="tel"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        component={TextField}
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        id="bankAccount"
                                        name="bankAccount"
                                        label="Cuenta Bancaria"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Field
                                        fullWidth
                                        id="billingAddress"
                                        name="billingAddress"
                                        label="Direccion de facturacion"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Field
                                        fullWidth
                                        id="zipCode"
                                        name="zipCode"
                                        label="Codigo Postal"
                                        component={TextField}
                                        type="tel"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="municipality"
                                        name="municipality"
                                        label="Municipio"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id="province"
                                        name="province"
                                        label="Provincia"
                                        component={TextField}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </FormikStep>
                    <FormikStep>Tercer pantalla</FormikStep>
                    <FormikStep>
                        <Field
                            id="demo"
                            name="demo"
                            label="DEMO"
                            component={TextField}
                        />
                    </FormikStep>
                </FormikStepper>
            </Card>
        </Modal>
    );
}

export function FormikStep({ children }) {
    return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [activeStep, setActiveStep] = useState(0);

    const currentChild = childrenArray[activeStep];

    function isLastStep() {
        return activeStep === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    setActiveStep((activeStep) => activeStep + 1);
                }
            }}
        >
            <Form autoComplete="off">
                {currentChild}
                {activeStep > 0 ? (
                    <Button onClick={() => setActiveStep(activeStep - 1)}>
                        Paso anterior
                    </Button>
                ) : null}

                <Button type="submit">
                    {isLastStep() ? "Guardar" : "Siguiente"}
                </Button>
            </Form>
        </Formik>
    );
}
