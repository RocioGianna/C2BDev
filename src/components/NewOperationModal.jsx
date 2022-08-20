import React, { useState } from "react";
import ClientDataStep from "./newOperation/ClientDataStep";
import {
    StepLabel,
    Step,
    Stepper,
    Box,
    Button,
    Typography,
    Modal,
    Card,
    Grid,
    CircularProgress,
} from "@mui/material";
import { TextField } from "formik-material-ui";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
                    p: 8,
                    width: "80%",
                }}
            >
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
                    onSubmit={async () => {
                        await sleep(3000);
                        console.log("submit");
                    }}
                >
                    <div label="Primer pantalla">Primer paso</div>

                    <ClientDataStep
                        label="Atributos del cliente"
                        validationSchema={yup.object({
                            clientName: yup
                                .string()
                                .required("El nombre es requerido"),
                            clientSurname: yup
                                .string()
                                .required("El apellido es requerido"),
                            dni: yup.string().required("El DNI es requerido"),
                            phone: yup
                                .number("El telefono debe ser un numero")
                                .required("El telefono es requerido")
                                .positive()
                                .integer()
                                .typeError("El telefono debe ser un numero"),
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
                            province: yup
                                .string("Ingrese su provincia")
                                .required("La provincia es requerida"),
                        })}
                    />
                    <div label="Tercer">Tercer pantalla</div>
                    <div
                        label="Demo"
                        validationSchema={yup.object({
                            demo: yup.string().required("El demo es requerido"),
                        })}
                    >
                        <Field
                            name="demo"
                            fullWidth
                            label="DEMO"
                            component={TextField}
                        />
                    </div>
                </FormikStepper>
            </Card>
        </Modal>
    );
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
                helpers.setTouched({});
            }}
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off">
                    <Grid container rowSpacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                id="modal-modal-title"
                                variant="h5"
                                align="center"
                                component="h2"
                            >
                                Nueva operacion
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Stepper alternativeLabel activeStep={activeStep}>
                                {childrenArray.map((child) => (
                                    <Step key={child.props.label}>
                                        <StepLabel>
                                            {child.props.label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                        <Grid item xs={12}>
                            {currentChild}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    {activeStep > 0 ? (
                                        <Button
                                            onClick={() =>
                                                setActiveStep(activeStep - 1)
                                            }
                                            variant="contained"
                                            fullWidth
                                            disabled={isSubmitting}
                                        >
                                            Paso anterior
                                        </Button>
                                    ) : null}
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Button
                                        startIcon={
                                            isSubmitting ? (
                                                <CircularProgress size="1rem" />
                                            ) : null
                                        }
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Confirmando"
                                            : isLastStep()
                                            ? "Confirmar"
                                            : "Siguiente"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}
