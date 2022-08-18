import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Field, Form, Formik } from "formik";
import { Card, TextField } from "@mui/material";
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
                            email: yup
                                .string("Ingrese su correo electronico")
                                .email("Ingrese un correo electronico valido")
                                .required("El correo electronico es requerido"),
                        })}
                    >
                        <Grid container spacing={2}>
                                <Field
                                    id="clientName"
                                    name="clientName"
                                    label="Nombres del Cliente"
                                    margin="normal"
                                    component={TextField}
                                />
                                <Field
                                    id="clientSurname"
                                    name="clientSurname"
                                    label="Apellidos del Cliente"
                                    margin="normal"
                                    component={TextField}
                                />
                            <Field
                                id="dni"
                                name="dni"
                                label="DNI"
                                component={TextField}
                                type="tel"
                            />
                            <Field
                                id="phone"
                                name="phone"
                                label="Telefono"
                                component={TextField}
                                type="tel"
                            />
                            <Field
                                id="email"
                                name="email"
                                label="Email"
                                component={TextField}
                                type="email"
                            />
                            <Field
                                id="bankAccount"
                                name="bankAccount"
                                label="Cuenta Bancaria"
                                component={TextField}
                            />
                            <Field
                                id="billingAddress"
                                name="billingAddress"
                                label="Cuenta Bancaria"
                                component={TextField}
                            />
                            <Field
                                id="zipCode"
                                name="zipCode"
                                label="Codigo Postal"
                                component={TextField}
                                type="tel"
                            />
                            <Field
                                id="municipality"
                                name="municipality"
                                label="Municipio"
                                component={TextField}
                            />
                            <Field
                                id="province"
                                name="province"
                                label="Provincia"
                                component={TextField}
                            />
                        </Gr>
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
